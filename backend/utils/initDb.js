const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create connection without specifying database
const sequelize = new Sequelize(
  null, // No database initially
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const db = require('../config/database');
const User = require('../models/User');
const Progress = require('../models/Progress');

const initDb = async () => {
  try {
    // Create database if it doesn't exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log('Database created or already exists');
    
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