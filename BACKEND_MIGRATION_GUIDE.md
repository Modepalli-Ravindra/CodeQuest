# Backend Migration Guide

This guide explains how to migrate the CodeQuest application from using localStorage to the new backend API.

## Prerequisites

1. Make sure the backend server is running (`npm run dev` in the backend directory)
2. MySQL database is set up and configured in the `.env` file

## Steps to Migrate

### 1. Update the StoreContext

Replace the localStorage-based implementation in `context/StoreContext.tsx` with API calls to the backend.

### 2. Replace Local Storage Functions

Replace functions like:
- `localStorage.getItem('cq_current_user')` with `loginUser()`
- `localStorage.setItem('cq_progress_${username}', progress)` with `updateUserProgress()`

### 3. Update Authentication Flow

Instead of storing user data in localStorage, use JWT tokens from the backend:
- On login, store the JWT token in localStorage
- On subsequent requests, include the token in the Authorization header
- On logout, remove the token from localStorage

### 4. Update Progress Tracking

Replace the localStorage-based progress tracking with API calls:
- On app load, fetch progress from `/api/progress`
- When completing a topic, call `/api/progress/complete-topic`
- When updating progress, call `/api/progress` with PUT method

## Example Implementation

Here's how the login function might look:

```javascript
const login = async (username, password) => {
  try {
    const response = await loginUser(username, password);
    if (response.token) {
      // Store token in localStorage
      localStorage.setItem('cq_token', response.token);
      
      // Update state with user data and progress
      setAuth({ user: response.user.username, isAuthenticated: true });
      setProgress(response.progress);
      
      // Store current user
      localStorage.setItem('cq_current_user', response.user.username);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/profile` | GET | Get user profile |
| `/api/progress` | GET | Get user progress |
| `/api/progress` | PUT | Update user progress |
| `/api/progress/complete-topic` | POST | Mark a topic as completed |

## Environment Variables

Make sure to set the following environment variables in your backend `.env` file:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=codequest_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Database Schema

The backend uses two main tables:

1. `users` - Stores user information (username, password hash)
2. `progress` - Stores user progress (unlocked topics, completed topics, stars, badges, scores)

## Running the Backend

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Initialize the database: `npm run init-db`
4. Start the development server: `npm run dev`

The backend will be available at `http://localhost:5000`.