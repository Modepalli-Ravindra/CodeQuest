import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser, loginUser } from '../services/backendService';

export const AuthPage: React.FC = () => {
  const { login, auth } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false); // New state for name input
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const validateForm = () => {
    // Reset errors
    setError(null);
    
    // Check username
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(username.trim())) {
      setError('Username can only contain letters and numbers.');
      return false;
    }
    
    // Check password
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    
    // Check confirm password for registration
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    
    return true;
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      login(username.trim());
      navigate('/');
    } else {
      setError('Please enter a valid name (at least 3 characters)');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login logic with backend
        const response = await loginUser(username.trim(), password);
        
        if (response.token) {
          // Store token in localStorage
          localStorage.setItem('cq_token', response.token);
          
          // Show name input screen
          setShowNameInput(true);
        } else {
          setError(response.message || 'Login failed');
        }
      } else {
        // Registration logic with backend
        const response = await registerUser(username.trim(), password);
        
        if (response.token) {
          // Store token in localStorage
          localStorage.setItem('cq_token', response.token);
          
          // Show name input screen
          setShowNameInput(true);
        } else {
          setError(response.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(isLogin ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // If we're showing the name input screen
  if (showNameInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 dark:from-slate-900 dark:to-indigo-950 p-4 transition-colors duration-300 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-md dark:bg-slate-800/50 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/20 relative z-10"
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
            👤
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome!</h1>
          <p className="text-indigo-100 mb-8 font-medium">What should we call you?</p>
          
          <form onSubmit={handleNameSubmit}>
            <div className="mb-6 text-left relative">
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full p-4 bg-slate-900/80 text-white placeholder-slate-400 rounded-2xl border-2 ${error ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-yellow-400'} outline-none transition-all text-lg font-bold text-center shadow-inner`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
              />
              {error && (
                <p className="text-red-300 text-sm mt-2 text-center font-bold animate-pulse bg-red-900/50 py-1 rounded-lg">
                  ⚠️ {error}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-indigo-900 p-4 rounded-2xl font-black text-xl hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-yellow-400/20"
            >
              CONTINUE
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 dark:from-slate-900 dark:to-indigo-950 p-4 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md dark:bg-slate-800/50 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/20 relative z-10"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
          {isLogin ? '🔐' : '📝'}
        </div>
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
          {isLogin ? 'Welcome Back!' : 'Join CodeQuest'}
        </h1>
        <p className="text-indigo-100 mb-8 font-medium">
          {isLogin ? 'Sign in to continue your journey' : 'Create an account to start learning'}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left relative">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full p-4 bg-slate-900/80 text-white placeholder-slate-400 rounded-2xl border-2 ${error && !password ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-yellow-400'} outline-none transition-all text-lg font-bold shadow-inner`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="mb-4 text-left relative">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full p-4 bg-slate-900/80 text-white placeholder-slate-400 rounded-2xl border-2 ${error && password ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-yellow-400'} outline-none transition-all text-lg font-bold shadow-inner`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          {!isLogin && (
            <div className="mb-4 text-left relative">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`w-full p-4 bg-slate-900/80 text-white placeholder-slate-400 rounded-2xl border-2 ${error ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-yellow-400'} outline-none transition-all text-lg font-bold shadow-inner`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          )}
          
          {error && (
            <p className="text-red-300 text-sm mt-2 text-center font-bold animate-pulse bg-red-900/50 py-1 rounded-lg mb-4">
              ⚠️ {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 text-indigo-900 p-4 rounded-2xl font-black text-xl hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-yellow-400/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isLogin ? (
              'SIGN IN'
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <p className="text-indigo-200">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-yellow-300 font-bold hover:text-yellow-200 transition-colors underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}