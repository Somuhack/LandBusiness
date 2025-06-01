const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require('../controllers/user.controller');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Forgot password (send link)
router.post('/forgot-password', forgotPassword);

// Reset password (via token)
router.post('/reset-password/:token', resetPassword);

module.exports = router;
