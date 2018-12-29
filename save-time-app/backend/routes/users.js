const express = require("express");
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');
const uploadAvatar = require('../middlewares/upload-file');

router.post('/register', UserController.createAccount);

router.post('/login', UserController.logIn);

router.get('', checkAuth, UserController.getLoggedUserData);

router.patch('/avatar', checkAuth, uploadAvatar, UserController.uploadAvatar);

module.exports = router;
