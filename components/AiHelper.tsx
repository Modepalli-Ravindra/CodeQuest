import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { askAiTutor } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

export const AiHelper: React.FC<{ topicContext: string }> = ({ topicContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);
    const answer = await askAiTutor(query, topicContext);
    setResponse(answer);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 w-80 mb-4 border-2 border-indigo-100 dark:border-slate-600 absolute bottom-16 right-0"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Sparkles size={16} /> AI Tutor
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            </div>
            
            <div className="min-h-[100px] max-h-[200px] overflow-y-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-3 mb-3 text-sm text-gray-700 dark:text-gray-300">
              {!response && !isLoading && "Hi! I'm your coding buddy. Stuck? Ask me anything about this topic!"}
              {isLoading && <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400"><div className="animate-spin h-4 w-4 border-2 border-indigo-500 dark:border-indigo-400 rounded-full border-t-transparent"></div> Thinking...</div>}
              {response && response}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask a question..."
                className="flex-1 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              />
              <button 
                onClick={handleAsk}
                disabled={isLoading}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:scale-105 transition-all border-4 border-white dark:border-slate-800"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
};