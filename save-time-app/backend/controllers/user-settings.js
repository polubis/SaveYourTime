const UserSettings = require("../models/user-settings");

exports.getUserSettings = (req, res, next) => {

  UserSettings.findOne( { userId: req.userId } ).then(settings => {

    res.status(200).json({
      settings
    });

  }).catch(err => {
    res.status(400).json({
      error: 'There is a problem with fetching settings'
    })
  })

};

exports.addUserSettings = (req, res, next) => {

  const userSettings = new UserSettings({
    salary: req.body.salary, userId: req.userId
  });

  userSettings.save().then(savedSettings => {

    res.status(201).json({
      salary: savedSettings.salary
    });

  }).catch(error => {

    res.status(400).json({
      error: 'There is a problem with saving your settings'
    });

  });



};
