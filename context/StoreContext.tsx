import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, AuthState } from '../types';
import { CURRICULUM } from '../data/curriculum';
import { BADGES } from '../data/badges';
import { getUserProgress, updateUserProgress } from '../services/backendService';

interface StoreContextType {
  auth: AuthState;
  progress: UserProgress;
  login: (username: string) => void;
  logout: () => void;
  completeTopic: (topicId: string, score: number) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Fix: Dynamically get the first topic ID from the curriculum to ensure it is always unlocked.
const firstTopicId = CURRICULUM.length > 0 ? CURRICULUM[0].id : 'topic-1';

const INITIAL_PROGRESS: UserProgress = {
  unlockedTopics: [firstTopicId],
  completedTopics: [],
  stars: 0,
  badges: [],
  scores: {}
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load User Session on Mount
  useEffect(() => {
    const currentUser = localStorage.getItem('cq_current_user');
    const token = localStorage.getItem('cq_token');
    
    if (currentUser && token) {
      // Load progress from backend if token exists
      loadProgressFromBackend();
    } else if (currentUser) {
      // Load specific user data from localStorage (fallback)
      const storageKey = `cq_progress_${currentUser}`;
      const storedProgress = localStorage.getItem(storageKey);
      
      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress);
        // Safety check: Ensure the first topic is ALWAYS unlocked
        if (firstTopicId && !parsedProgress.unlockedTopics.includes(firstTopicId)) {
          parsedProgress.unlockedTopics.push(firstTopicId);
        }
        setProgress(parsedProgress);
      } else {
        // User exists in session but no data found (maybe cleared cache), reset to initial
        setProgress(INITIAL_PROGRESS);
      }
      
      setAuth({ user: currentUser, isAuthenticated: true });
    }
    setIsLoaded(true);
  }, []);

  const loadProgressFromBackend = async () => {
    try {
      const response = await getUserProgress();
      if (response.progress) {
        // Safety check: Ensure the first topic is ALWAYS unlocked
        const progressData = response.progress;
        if (firstTopicId && !progressData.unlockedTopics.includes(firstTopicId)) {
          progressData.unlockedTopics.push(firstTopicId);
        }
        setProgress(progressData);
        setAuth({ user: response.user.username, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Failed to load progress from backend:', error);
      // Fallback to localStorage
      const currentUser = localStorage.getItem('cq_current_user');
      if (currentUser) {
        const storageKey = `cq_progress_${currentUser}`;
        const storedProgress = localStorage.getItem(storageKey);
        
        if (storedProgress) {
          const parsedProgress = JSON.parse(storedProgress);
          if (firstTopicId && !parsedProgress.unlockedTopics.includes(firstTopicId)) {
            parsedProgress.unlockedTopics.push(firstTopicId);
          }
          setProgress(parsedProgress);
        }
        
        setAuth({ user: currentUser, isAuthenticated: true });
      }
    }
  };

  // Save to "Backend" (LocalStorage or API) whenever progress changes
  useEffect(() => {
    if (isLoaded && auth.isAuthenticated && auth.user) {
      const token = localStorage.getItem('cq_token');
      
      if (token) {
        // Save to backend
        saveProgressToBackend(progress);
      } else {
        // Fallback to localStorage
        const storageKey = `cq_progress_${auth.user}`;
        localStorage.setItem(storageKey, JSON.stringify(progress));
      }
    }
  }, [progress, auth, isLoaded]);

  const saveProgressToBackend = async (progressData: UserProgress) => {
    try {
      await updateUserProgress(progressData);
    } catch (error) {
      console.error('Failed to save progress to backend:', error);
      // Fallback to localStorage
      if (auth.user) {
        const storageKey = `cq_progress_${auth.user}`;
        localStorage.setItem(storageKey, JSON.stringify(progressData));
      }
    }
  };

  const login = (username: string) => {
    // Check if we have a token from the backend
    const token = localStorage.getItem('cq_token');
    
    if (token) {
      // Progress will be loaded from backend in the useEffect
      setAuth({ user: username, isAuthenticated: true });
    } else {
      // 1. Try to load existing progress for this user from localStorage
      const storageKey = `cq_progress_${username}`;
      const storedProgress = localStorage.getItem(storageKey);
      
      let userProgress = INITIAL_PROGRESS;

      if (storedProgress) {
        userProgress = JSON.parse(storedProgress);
        // Safety check for first topic
        if (firstTopicId && !userProgress.unlockedTopics.includes(firstTopicId)) {
          userProgress.unlockedTopics.push(firstTopicId);
        }
      }

      // 2. Update state
      setProgress(userProgress);
      setAuth({ user: username, isAuthenticated: true });
    }
    
    // 3. Persist session
    localStorage.setItem('cq_current_user', username);
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    setProgress(INITIAL_PROGRESS);
    localStorage.removeItem('cq_current_user');
    localStorage.removeItem('cq_token');
  };

  const completeTopic = async (topicId: string, score: number) => {
    // Update progress locally first for immediate feedback
    setProgress(prev => {
      const isNewCompletion = !prev.completedTopics.includes(topicId);
      
      // Unlock next available topic dynamically
      const currentIndex = CURRICULUM.findIndex(t => t.id === topicId);
      let nextTopicToUnlock = '';
      
      if (currentIndex !== -1 && currentIndex < CURRICULUM.length - 1) {
        nextTopicToUnlock = CURRICULUM[currentIndex + 1].id;
      }

      const newUnlocked = [...prev.unlockedTopics];
      if (nextTopicToUnlock && !newUnlocked.includes(nextTopicToUnlock)) {
        newUnlocked.push(nextTopicToUnlock);
      }

      const newCompleted = isNewCompletion ? [...prev.completedTopics, topicId] : prev.completedTopics;
      const newScoreValue = Math.max(score, prev.scores[topicId] || 0);
      const newStars = prev.stars + score; // Add stars for attempt
      
      // Create temporary progress object to check badges
      const tempProgress: UserProgress = {
        ...prev,
        completedTopics: newCompleted,
        stars: newStars,
        scores: { ...prev.scores, [topicId]: newScoreValue },
        unlockedTopics: newUnlocked
      };

      // Check Badges
      const earnedBadges = [...prev.badges];
      const topic = CURRICULUM.find(t => t.id === topicId);
      const maxScore = topic ? topic.quiz.length * 10 : 0;

      BADGES.forEach(badge => {
        if (!earnedBadges.includes(badge.id)) {
          if (badge.criteria(tempProgress, topicId, score, maxScore)) {
            earnedBadges.push(badge.id);
          }
        }
      });

      return {
        ...tempProgress,
        badges: earnedBadges
      };
    });
    
    // Also update progress on backend
    try {
      const token = localStorage.getItem('cq_token');
      if (token) {
        await completeTopicBackend(topicId, score);
      }
    } catch (error) {
      console.error('Failed to save topic completion to backend:', error);
    }
  };
  
  const completeTopicBackend = async (topicId: string, score: number) => {
    try {
      await completeTopic(topicId, score);
    } catch (error) {
      console.error('Failed to complete topic on backend:', error);
      throw error;
    }
  };

  return (
    <StoreContext.Provider value={{ auth, progress, login, logout, completeTopic }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};