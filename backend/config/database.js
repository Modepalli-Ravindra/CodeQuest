const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;