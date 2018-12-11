const express = require("express");

const User = require("../models/user");
const bcrypt = require('bcrypt');
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
      error: 'User with given data already exist. Try other email adress and username'
    });
  });
});

module.exports = router;
