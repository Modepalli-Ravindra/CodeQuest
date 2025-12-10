const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = require('./config/database');

// Test database connection
db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error connecting to database:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CodeQuest Backend API' });
});

// Import route files
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Sync database models
const User = require('./models/User');
const Progress = require('./models/Progress');

db.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Error syncing database:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});