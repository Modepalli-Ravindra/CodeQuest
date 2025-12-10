# CodeQuest Backend API

This is the backend API for CodeQuest, built with Node.js, Express, and MySQL.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a MySQL database named `codequest_db` (or update `.env` with your database credentials)

3. Start the development server:
   ```
   npm run dev
   ```

4. The API will be running on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Progress

- `GET /api/progress` - Get user progress (requires authentication)
- `PUT /api/progress` - Update user progress (requires authentication)
- `POST /api/progress/complete-topic` - Mark a topic as completed (requires authentication)

## Environment Variables

Create a `.env` file with the following variables:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=codequest_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```