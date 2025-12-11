const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    if (username.length < 3 || !/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).json({ 
        message: 'Username must be at least 3 characters long and contain only letters and numbers' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await User.create({ username, password: hashedPassword });
    
    // Create initial progress
    const firstTopicId = 'topic-1-intro-to-python'; // First topic from curriculum
    const progress = await Progress.create({
      userId: user.id,
      unlockedTopics: [firstTopicId]
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'codequest_secret',
      { expiresIn: '30d' }
    );
    
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username
      },
      progress: {
        unlockedTopics: progress.unlockedTopics,
        completedTopics: progress.completedTopics,
        stars: progress.stars,
        badges: progress.badges,
        scores: progress.scores
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Get user progress
    const progress = await Progress.findOne({ where: { userId: user.id } });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'codequest_secret',
      { expiresIn: '30d' }
    );
    
    res.json({
      user: {
        id: user.id,
        username: user.username
      },
      progress: {
        unlockedTopics: progress.unlockedTopics,
        completedTopics: progress.completedTopics,
        stars: progress.stars,
        badges: progress.badges,
        scores: progress.scores
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    const progress = await Progress.findOne({ where: { userId: user.id } });
    
    res.json({
      user,
      progress: {
        unlockedTopics: progress.unlockedTopics,
        completedTopics: progress.completedTopics,
        stars: progress.stars,
        badges: progress.badges,
        scores: progress.scores
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };