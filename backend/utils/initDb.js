const { Sequelize } = require('sequelize');

// Use the same database configuration as the main app
const db = require('../config/database');
const User = require('../models/User');
const Progress = require('../models/Progress');

const initDb = async () => {
  try {
    // Test database connection
    await db.authenticate();
    console.log('Database connected successfully');
    
    // Sync models
    await db.sync({ alter: true });
    console.log('Database synced successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDb();