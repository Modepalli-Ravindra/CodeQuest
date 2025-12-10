const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Progress = sequelize.define('Progress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  unlockedTopics: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  completedTopics: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  stars: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  badges: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  scores: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'progress'
});

// Define associations
User.hasOne(Progress, { foreignKey: 'userId' });
Progress.belongsTo(User, { foreignKey: 'userId' });

module.exports = Progress;