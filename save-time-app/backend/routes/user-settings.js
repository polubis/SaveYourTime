const express = require("express");
const router = express.Router();
const UsersSettingsController = require('../controllers/user-settings');
const checkAuth = require('../middlewares/check-auth');

router.get('', checkAuth, UsersSettingsController.getUserSettings);

router.post('', checkAuth, UsersSettingsController.addUserSettings);

module.exports = router;
