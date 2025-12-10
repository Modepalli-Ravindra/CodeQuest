const Progress = require('../models/Progress');

// Get user progress
const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ where: { userId: req.user.id } });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user progress
const updateUserProgress = async (req, res) => {
  try {
    const { unlockedTopics, completedTopics, stars, badges, scores } = req.body;
    
    const progress = await Progress.findOne({ where: { userId: req.user.id } });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    // Update progress fields
    if (unlockedTopics) progress.unlockedTopics = unlockedTopics;
    if (completedTopics) progress.completedTopics = completedTopics;
    if (stars !== undefined) progress.stars = stars;
    if (badges) progress.badges = badges;
    if (scores) progress.scores = scores;
    
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Complete a topic
const completeTopic = async (req, res) => {
  try {
    const { topicId, score } = req.body;
    
    if (!topicId || score === undefined) {
      return res.status(400).json({ message: 'Topic ID and score are required' });
    }
    
    const progress = await Progress.findOne({ where: { userId: req.user.id } });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    // Update completed topics
    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
    }
    
    // Update scores
    if (!progress.scores) progress.scores = {};
    progress.scores[topicId] = Math.max(score, progress.scores[topicId] || 0);
    
    // Add stars
    progress.stars += score;
    
    // Save progress
    await progress.save();
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserProgress, updateUserProgress, completeTopic };