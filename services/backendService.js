// This service connects the frontend to the new backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for authenticated requests
const authenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('cq_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  // Handle token expiration
  if (response.status === 401) {
    localStorage.removeItem('cq_token');
    localStorage.removeItem('cq_current_user');
    window.location.href = '#/auth';
    throw new Error('Session expired. Please log in again.');
  }
  
  return response.json();
};

// Auth functions
export const registerUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  return response.json();
};

export const getUserProfile = async () => {
  return authenticatedRequest(`${API_BASE_URL}/auth/profile`);
};

// Progress functions
export const getUserProgress = async () => {
  return authenticatedRequest(`${API_BASE_URL}/progress`);
};

export const updateUserProgress = async (progressData) => {
  return authenticatedRequest(`${API_BASE_URL}/progress`, {
    method: 'PUT',
    body: JSON.stringify(progressData),
  });
};

export const completeTopic = async (topicId, score) => {
  return authenticatedRequest(`${API_BASE_URL}/progress/complete-topic`, {
    method: 'POST',
    body: JSON.stringify({ topicId, score }),
  });
};