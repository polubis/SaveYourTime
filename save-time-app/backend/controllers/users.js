const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageService = require('../services/image');
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

exports.uploadAvatar = (req, res, next) => {

  User.findOne( {_id: req.userId} ).then(fUser => {
    const savePath = req.protocol + '://' + req.get('host') + '/images/avatars/';
    const user = {
      _id: req.userId, picturePath: savePath + req.file.filename
    };

    imageService.deleteImage(fUser.picturePath, function(err) {
      User.updateOne( {_id: req.userId}, user ).then(uUser => {
        res.status(200).json({
          picturePath: user.picturePath
        });
      }).catch(error => {
        res.status(400).json({
          error: 'There is a problem with saving user data'
        })
      })

    }, '/backend/images/avatars/');


  }).catch(error => {
    console.log(error);
    res.status(400).json({
      error: 'Cannot upload user avatar'
    })
  })

};

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
    const user = { _id: fUser._id, username: fUser.username, email: fUser.email, picturePath: fUser.picturePath };
    res.status(200).json({
      user
    });

  }).catch(error => {
    res.status(401).json({
      error
    });
  })

};

