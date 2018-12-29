const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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

exports.logIn = (req, res, next) => {
  const { nameOrEmail, password } = req.body;

  getUserByEmailOrUsername(nameOrEmail,
    (user) => {

      bcrypt.compare(password, user.password).then(result => {

        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_KEY,
          { expiresIn: 3600 }
        );

        const userData = { _id: user._id, email: user.email, username: user.username, token };

        res.status(200).json({user: userData});

      }).catch(error =>
        res.status(404).json({error})
      );

    },
    (error) => {
      res.status(404).json({error});
    },
  );
};

exports.createAccount = (req, res, next) => {
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
}

exports.getLoggedUserData = (req, res, next) => {
  const userId = req.userId;

  User.findOne( { _id: userId } ).then(fUser => {
    const user = { _id: fUser._id, username: fUser.username, email: fUser.email };
    res.status(200).json({
      user
    });

  }).catch(error => {
    res.status(401).json({
      error
    });
  })

};

