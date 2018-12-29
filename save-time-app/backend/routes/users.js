const express = require("express");
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');

router.post('/register', UserController.createAccount);

router.post('/login', UserController.logIn);

router.get('', checkAuth, UserController.getLoggedUserData);

module.exports = router;
