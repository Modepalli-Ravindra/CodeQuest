import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Play, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { auth, login, progress } = useStore();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing JWT token on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('cq_token');
      const currentUser = localStorage.getItem('cq_current_user');
      
      if (token && currentUser && !auth.isAuthenticated) {
        // If we have a token but aren't marked as authenticated, trigger login
        login(currentUser);
      } else if (!token && !auth.isAuthenticated) {
        // If no token and not authenticated, redirect to auth page
        navigate('/auth');
      }
    };
    
    checkAuthStatus();
  }, [auth.isAuthenticated, login, navigate]);

  // If user is authenticated, show the main dashboard directly
  if (auth.isAuthenticated) {
    return (
      <div className="relative -m-4 md:-m-8 p-4 md:p-8 min-h-screen">
        {/* Global Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center opacity-5 dark:opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('https://img.freepik.com/free-vector/abstract-technology-background-with-geometric-shapes_23-2148396541.jpg')" }}
        />
        {/* Gradient Overlay for Readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-50/90 via-slate-100/80 to-slate-200/90 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/95 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          <header className="flex items-end justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Mission Control</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mt-1">Select your next challenge, Commander {auth.user}.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <Star className="text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-slate-700 dark:text-slate-200">{progress.stars} Stars Earned</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM.map((topic, index) => {
              const isUnlocked = progress.unlockedTopics.includes(topic.id);
              const isCompleted = progress.completedTopics.includes(topic.id);
              
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative rounded-[2rem] p-1 transition-all duration-300 hover:-translate-y-2 ${
                    isUnlocked 
                      ? 'hover:shadow-2xl hover:shadow-indigo-500/20' 
                      : 'opacity-75'
                  }`}
                >
                  {/* Card Border/Bg Container */}
                  <div className={`absolute inset-0 rounded-[2rem] transition-colors duration-300 ${isUnlocked ? 'bg-white dark:bg-slate-800' : 'bg-slate-200 dark:bg-slate-900'}`} />
                  
                  {/* Decorative Gradient Blob */}
                  {isUnlocked && (
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color.replace('bg-', 'from-')} to-transparent opacity-10 rounded-bl-[4rem] rounded-tr-[2rem] transition-transform group-hover:scale-110`} />
                  )}

                  {/* Main Card Content */}
                  <div className={`relative h-full flex flex-col p-6 rounded-[1.8rem] ${isUnlocked ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-900/50'}`}>
                    
                    {/* Top Row: Icon & Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform transition-transform group-hover:rotate-6 ${topic.color} ${!isUnlocked && 'grayscale opacity-50'}`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        {isCompleted ? (
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200 dark:border-green-800">
                            <CheckCircle size={12} /> COMPLETE
                          </div>
                        ) : !isUnlocked ? (
                          <Lock className="text-slate-400" size={20} />
                        ) : (
                          <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 dark:border-indigo-800">
                            READY
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="mb-6 flex-1">
                      <h3 className={`text-2xl font-black mb-2 leading-tight transition-colors ${isUnlocked ? 'text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400' : 'text-slate-500 dark:text-slate-500'}`}>
                        {topic.title.replace(/^\d+\.\s/, '')}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">
                        {topic.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      {isUnlocked ? (
                        <button 
                          onClick={() => navigate(`/learn/${topic.id}`)}
                          className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                            isCompleted 
                              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30'
                              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white shadow-lg shadow-slate-900/20'
                          }`}
                        >
                          {isCompleted ? <Play size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          {isCompleted ? 'REPLAY MISSION' : 'START MISSION'}
                          {!isCompleted && <ArrowRight size={16} />}
                        </button>
                      ) : (
                        <div className="w-full py-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-sm text-center flex items-center justify-center gap-2 cursor-not-allowed">
                          <Lock size={16} /> LOCKED
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to auth page
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="text-white text-xl">Redirecting to authentication...</div>
    </div>
  );
};