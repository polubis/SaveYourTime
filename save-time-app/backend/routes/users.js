const express = require("express");

const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;

  const user = new User({ username, email, password });
  user.save().then(createdUser => {
    res.status(201).json({
      _id: createdUser._id
    });
  }).catch(error => {
    res.status(400).json({
      error: 'User wih given data already exist. Try other email adress and username'
    });
  });
});

function getUserByEmailOrUsername(nameOrEmail, cbSucc, cbErr) {
  User.findOne( { username: nameOrEmail} ).then(userByUsername => {
    if (!userByUsername) {
      User.findOne( { email: nameOrEmail } ).then(userByEmail => {

        if (!userByEmail) {
          cbErr('Wrong username/email or password');
        }
        else {
          cbSucc(userByEmail);
        }

      });

    }
    else {
      cbSucc(userByUsername);
    }

  }).catch(err => {
    cbErr('Wrong username/email or password');
  });
}

router.post('/login', (req, res, next) => {
  const { nameOrEmail, password } = req.body;

  getUserByEmailOrUsername(nameOrEmail,
    (user) => {

      bcrypt.compare(password, user.password).then(result => {

        const token = jwt.sign(
          { email: user.email, userId: user._id },
          "secret_this_should_be_longer",
          { expiresIn: 3600 }
        );

        const userData = { _id: user._id, token };

        res.status(200).json({user: userData});

      }).catch(error =>
        res.status(404).json({error})
      );

    },
    (error) => {
      res.status(404).json({error});
    },
  );
});

module.exports = router;
