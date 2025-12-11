const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile (protected)
router.get('/profile', authenticate, getUserProfile);

module.exports = router;