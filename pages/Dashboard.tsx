import React from 'react';
import { useStore } from '../context/StoreContext';
import { CURRICULUM } from '../data/curriculum';
import { BADGES } from '../data/badges';
import { Star, Award, Trophy, Map, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { progress, auth } = useStore();

  const totalPossibleStars = CURRICULUM.reduce((acc, topic) => acc + (topic.quiz.length * 10), 0);
  const progressPercent = Math.round((progress.stars / totalPossibleStars) * 100) || 0;

  return (
    <div className="space-y-8 pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">My Base</h2>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, Commander {auth.user}!</p>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 dark:bg-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-indigo-500 dark:bg-indigo-700 rounded-lg"><Star fill="white" /></div>
             <h3 className="font-bold">Total Stars</h3>
           </div>
           <p className="text-5xl font-bold">{progress.stars}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 text-gray-800 dark:text-white shadow-xl border border-gray-100 dark:border-slate-700">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg"><Trophy /></div>
             <h3 className="font-bold">Missions Done</h3>
           </div>
           <p className="text-5xl font-bold text-gray-800 dark:text-white">{progress.completedTopics.length} <span className="text-gray-300 dark:text-gray-500 text-2xl">/ {CURRICULUM.length}</span></p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 text-gray-800 dark:text-white shadow-xl border border-gray-100 dark:border-slate-700">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg"><Award /></div>
             <h3 className="font-bold">Completion</h3>
           </div>
           <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 dark:text-purple-200 bg-purple-200 dark:bg-purple-900">
                  Progress
                </span>
                <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-300">
                  {progressPercent}%
                </span>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-purple-200 dark:bg-purple-900/50">
                <div style={{ width: `${progressPercent}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 dark:bg-purple-600 transition-all duration-1000"></div>
              </div>
            </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 p-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><Award className="text-yellow-500"/> Achievements</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = progress.badges.includes(badge.id);
            return (
              <motion.div 
                key={badge.id}
                whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                className={`relative p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-2 transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 border-yellow-200 dark:border-slate-600 shadow-sm' 
                    : 'bg-gray-100 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 opacity-60 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${isUnlocked ? badge.color + ' text-white' : 'bg-gray-200 dark:bg-slate-800'}`}>
                  {badge.icon}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className={`font-bold text-sm ${isUnlocked ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>{badge.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">{badge.description}</p>
                </div>
                {!isUnlocked && <Lock className="absolute top-2 right-2 w-3 h-3 text-gray-400" />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mission Log */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 p-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><Map className="text-gray-400"/> Mission Log</h3>
        
        <div className="space-y-4">
          {CURRICULUM.map((topic) => {
             const score = progress.scores[topic.id] || 0;
             const maxScore = topic.quiz.length * 10;
             const isDone = progress.completedTopics.includes(topic.id);
             
             return (
               <div key={topic.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-700/50">
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${topic.color}`}>
                     {topic.title[0]}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-800 dark:text-gray-200">{topic.title}</h4>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{isDone ? 'Completed' : 'Not started'}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <Star size={16} className={score > 0 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"} />
                   <span className="font-mono font-bold text-gray-600 dark:text-gray-300">{score}/{maxScore}</span>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};