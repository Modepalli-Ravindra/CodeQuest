const express = require('express');
const router = express.Router();
const { getUserProgress, updateUserProgress, completeTopic } = require('../controllers/progressController');
const { authenticate } = require('../middleware/auth');

// Get user progress (protected)
router.get('/', authenticate, getUserProgress);

// Update user progress (protected)
router.put('/', authenticate, updateUserProgress);

// Complete a topic (protected)
router.post('/complete-topic', authenticate, completeTopic);

module.exports = router;