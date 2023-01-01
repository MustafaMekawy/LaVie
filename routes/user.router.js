const express = require('express');
const userController = require('../app/controller/user.controller');
const authController = require('../app/middlewares/auth.middlewares');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get(
  '/showallusers',
  authController.auth,
  authController.restrictoTo('admin'),
  userController.showAllUsers
);

router.get(
  '/assignadmin/:id',
  authController.auth,
  authController.restrictoTo('admin'),
  userController.assignAdmin
);

module.exports = router;
