import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../data/curriculum';
import { useStore } from '../context/StoreContext';
import { AiHelper } from '../components/AiHelper';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Gamepad2, BookOpen, Brain, Check, RefreshCcw, Star, Box, Zap, Repeat } from 'lucide-react';
import { ConceptType } from '../types';

// --- VISUALIZATION COMPONENTS ---

const ConceptVisualizer: React.FC<{ type: ConceptType }> = ({ type }) => {
  switch (type) {
    case 'VARIABLES':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 border-4 border-white/50 bg-white/10 rounded-xl flex items-end justify-center overflow-hidden backdrop-blur-sm">
            <span className="mb-2 text-white/50 font-bold text-xs tracking-widest uppercase">Variable</span>
            <motion.div
              animate={{ y: [-100, 0, 0, -100], opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-indigo-900 shadow-lg text-xl">
                42
              </div>
            </motion.div>
          </div>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="mt-4 text-white font-mono bg-black/30 px-3 py-1 rounded"
          >
            score = 42
          </motion.div>
        </div>
      );

    case 'LOOPS':
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-2 h-20 mb-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0], 
                  backgroundColor: ["#ffffff", "#4ade80", "#ffffff"]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "circOut" 
                }}
                className="w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center text-slate-800 font-bold"
              >
                {i}
              </motion.div>
            ))}
          </div>
          <div className="text-white font-mono text-xs opacity-80">for i in range(4):</div>
        </div>
      );

    case 'CONDITIONS':
      return (
        <div className="relative w-64 h-40 flex justify-between items-center">
          {/* Paths */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 -translate-y-1/2 rounded" />
          <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-white/20 -translate-y-1/2 origin-top -rotate-45 rounded" />
          <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-white/20 -translate-y-1/2 origin-top rotate-45 rounded" />
          
          {/* Doors */}
          <div className="absolute top-0 right-0 w-16 h-20 border-2 border-green-400/50 bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-green-400 font-mono text-xs">True</span>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-20 border-2 border-red-400/50 bg-red-500/20 rounded-lg flex items-center justify-center">
            <span className="text-red-400 font-mono text-xs">False</span>
          </div>

          <motion.div
            animate={{ 
              x: [0, 110, 180], 
              y: [0, 0, -60],
              backgroundColor: ["#fbbf24", "#fbbf24", "#4ade80"]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg relative z-10"
          />
           <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-2 left-0 text-white font-mono text-xs"
          >
            if x &gt; 5:
          </motion.div>
        </div>
      );

    case 'LISTS':
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            {['A', 'B', 'C'].map((char, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
                className="w-12 h-12 bg-pink-500 rounded border-2 border-pink-300 shadow-lg flex items-center justify-center text-white font-bold font-mono text-xl"
              >
                '{char}'
              </motion.div>
            ))}
          </div>
          <span className="text-white font-mono text-xs">my_list = ['A', 'B', 'C']</span>
        </div>
      );

    case 'FUNCTIONS':
      return (
        <div className="flex items-center gap-4">
          <motion.div 
             animate={{ x: [0, 60, 60, 60], opacity: [1, 1, 0, 0], scale: [1, 1, 0, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-10 h-10 bg-yellow-400 rounded-full shadow-lg z-10 flex items-center justify-center font-bold text-xs"
          >In</motion.div>
          
          <motion.div 
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-24 h-24 bg-indigo-600 rounded-xl flex flex-col items-center justify-center border-4 border-indigo-400 shadow-2xl z-20 relative"
          >
            <Zap className="text-yellow-400 w-8 h-8" fill="currentColor" />
            <span className="text-white text-xs font-mono mt-2">def fn():</span>
          </motion.div>

          <motion.div 
             animate={{ x: [-60, 60], opacity: [0, 0, 1, 1], scale: [0, 0, 1.2, 1.2], backgroundColor: ["#facc15", "#4ade80"] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-10 h-10 bg-green-400 rounded-full shadow-lg z-0 flex items-center justify-center font-bold text-xs"
          >Out</motion.div>
        </div>
      );
      
    case 'STRINGS':
      return (
         <div className="flex flex-col items-center">
            <div className="flex gap-0.5">
              {"PYTHON".split('').map((char, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                  className="w-10 h-12 bg-teal-600 border border-teal-400 flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg"
                >
                  {char}
                </motion.div>
              ))}
            </div>
            <span className="mt-2 text-white font-mono text-xs">s = "PYTHON"</span>
         </div>
      );

    case 'DICTIONARIES':
      return (
        <div className="flex flex-col gap-2 w-48">
          <motion.div 
            animate={{ x: [-10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="bg-yellow-500 rounded-lg p-2 flex justify-between items-center text-indigo-900 font-mono font-bold text-xs shadow-md"
          >
            <span>"name":</span>
            <span className="bg-white/50 px-1 rounded">"Hero"</span>
          </motion.div>
          <motion.div 
            animate={{ x: [10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
            className="bg-yellow-500 rounded-lg p-2 flex justify-between items-center text-indigo-900 font-mono font-bold text-xs shadow-md"
          >
            <span>"level":</span>
            <span className="bg-white/50 px-1 rounded">5</span>
          </motion.div>
          <div className="text-center text-white font-mono text-xs">{`{ key: value }`}</div>
        </div>
      );
      
    case 'MATH':
      return (
        <div className="relative w-32 h-32 flex items-center justify-center">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
           />
           {[0,1,2,3].map(i => (
             <motion.div
               key={i}
               className="absolute w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold shadow"
               style={{ top: '50%', left: '50%', marginLeft: -16, marginTop: -16 }}
               animate={{ 
                 x: Math.cos(i * 1.57) * 45, 
                 y: Math.sin(i * 1.57) * 45,
                 rotate: -360 // counter rotation to keep text upright
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             >
               {['+', '-', '*', '/'][i]}
             </motion.div>
           ))}
           <div className="text-white font-bold text-2xl font-mono">3.14</div>
        </div>
      );
      
    case 'MODULES':
      return (
         <div className="flex gap-2">
            <motion.div
              animate={{ x: [20, 0], opacity: [0, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="w-16 h-16 bg-blue-600 rounded-lg border-2 border-blue-400 flex flex-col items-center justify-center shadow-xl z-10"
            >
              <div className="w-8 h-1 bg-white mb-1 rounded"></div>
              <div className="w-8 h-1 bg-white mb-1 rounded"></div>
              <span className="text-[8px] text-white font-mono">Main</span>
            </motion.div>
            <motion.div
              animate={{ x: [-20, 0], opacity: [0, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="w-16 h-16 bg-gray-600 rounded-lg border-2 border-gray-400 flex flex-col items-center justify-center shadow-xl"
            >
               <span className="text-[8px] text-white font-mono">Math</span>
               <div className="w-4 h-4 rounded-full border border-white mt-1"></div>
            </motion.div>
            <div className="absolute top-0 right-0 text-white text-xs font-mono mt-16 ml-4">import math</div>
         </div>
      );

    default:
      return (
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-white opacity-80"
        >
          <Brain size={80} strokeWidth={1} />
        </motion.div>
      );
  }
};

export const TopicFlow: React.FC = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { completeTopic } = useStore();
  
  const topic = CURRICULUM.find(t => t.id === topicId);
  
  // Steps: 0 = Concept, 1 = Game, 2 = Quiz, 3 = Results
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!topic) navigate('/');
  }, [topic, navigate]);

  if (!topic) return null;

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const submitQuiz = async (answers: number[]) => {
    setQuizAnswers(answers);
    let correctCount = 0;
    answers.forEach((ans, idx) => {
        if (ans === topic.quiz[idx].correctIndex) correctCount++;
    });
    
    // 10 stars per correct answer
    const score = correctCount * 10;
    await completeTopic(topic.id, score);
    setCurrentStep(3); // Result screen
  };

  const Steps = [
    // STEP 1: CONCEPT
    <div key="step1" className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border-4 border-indigo-50 dark:border-slate-700">
        
        {/* Animated Header Area */}
        <div className={`h-80 relative overflow-hidden flex items-center justify-center transition-colors duration-500 bg-gradient-to-br from-indigo-900 to-slate-900`}>
          {/* Dynamic Background matching topic color */}
          <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${topic.color.replace('bg-', 'from-').replace('500', '600')} to-transparent mix-blend-overlay`}></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          {/* The Animation */}
          <div className="z-10 scale-125">
            <ConceptVisualizer type={topic.type} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 pointer-events-none">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">{topic.title}</h2>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} /> Concept
            </span>
          </div>
          
          <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 mb-8">
            <p className="text-xl leading-relaxed mb-6">{topic.conceptContent.text}</p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl border-2 border-yellow-100 dark:border-yellow-700/50 flex gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-yellow-100 mb-1">Think about it:</h4>
                <p className="text-gray-700 dark:text-gray-300">{topic.conceptContent.analogy}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-end">
          <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-none">
            Let's Play! <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>,

    // STEP 2: GAME EXPLANATION
    <div key="step2" className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border-4 border-purple-50 dark:border-slate-700">
        <div className="p-8 bg-purple-600 dark:bg-purple-800 text-white text-center">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Gamepad2 size={32} /> Game Time: {topic.gameStory.title}
            </h2>
            <p className="text-purple-100 text-lg opacity-90">{topic.gameStory.scenario}</p>
        </div>
        
        <div className="p-8">
           <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-2xl p-6 text-green-400 font-mono text-lg shadow-inner border-b-4 border-slate-900 relative">
                  <div className="flex gap-2 mb-2 opacity-50 text-xs">
                    <span className="w-3 h-3 rounded-full bg-red-500"/>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <span className="w-3 h-3 rounded-full bg-green-500"/>
                  </div>
                  {/* Mock code visualization based on instruction */}
                  <p className="mb-2 text-gray-400 text-sm"># {topic.gameStory.instruction}</p>
                  <p className="whitespace-pre-wrap">{topic.codeSnippet || "# Code loading..."}</p>
                </div>
                
                <div>
                   <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">How to Win:</h3>
                   <p className="text-gray-600 dark:text-gray-300 text-lg">{topic.gameStory.instruction}</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-purple-200 dark:border-slate-600">
                  {/* Visual Cues Mock */}
                  <div className="text-6xl mb-4">👾</div>
                  <div className="flex gap-4 flex-wrap justify-center">
                    {topic.gameStory.visualCues.map((cue, i) => (
                      <div key={i} className="w-24 h-24 bg-white dark:bg-slate-600 rounded-xl shadow-md flex items-center justify-center text-center p-2 text-xs font-bold text-purple-800 dark:text-purple-200">
                        {cue}
                      </div>
                    ))}
                  </div>
              </div>
           </div>
        </div>
        
        <div className="p-8 bg-gray-50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between">
          <button onClick={handlePrev} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold flex items-center gap-2">
             <ArrowLeft size={20} /> Review Concept
          </button>
          <button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-purple-200 dark:shadow-none">
            Take the Quiz <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>,

    // STEP 3: QUIZ
    <QuizComponent key="step3" questions={topic.quiz} onSubmit={submitQuiz} onBack={handlePrev} />,

    // STEP 4: RESULT
    <div key="step4" className="max-w-md mx-auto text-center pt-10">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border-4 border-yellow-100 dark:border-slate-600"
      >
         <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl text-white shadow-lg">
           🏆
         </div>
         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Mission Complete!</h2>
         <div className="text-gray-500 dark:text-gray-300 mb-8">
           You earned <span className="text-yellow-500 font-bold text-xl">{(quizAnswers.filter((a, i) => a === topic.quiz[i].correctIndex).length) * 10} Stars</span>
         </div>
         
         <div className="space-y-3">
           <button onClick={() => navigate('/dashboard')} className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
             Go to Dashboard
           </button>
           <button onClick={() => { setQuizAnswers([]); setCurrentStep(0); }} className="w-full bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-200 border-2 border-gray-200 dark:border-slate-600 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
             <RefreshCcw size={16} /> Play Again
           </button>
         </div>
      </motion.div>
    </div>
  ];

  return (
    <div className="pb-24">
      {/* Progress Header */}
      <div className="mb-8 flex items-center justify-between">
         <div>
            <span className="text-gray-400 dark:text-gray-500 font-bold uppercase text-xs tracking-wider">Mission</span>
            <h1 className="text-2xl font-bold text-indigo-900 dark:text-white">{topic.title}</h1>
         </div>
         <div className="flex gap-2">
            {[0, 1, 2].map(step => (
              <div key={step} className={`h-2 w-8 rounded-full transition-colors ${currentStep >= step ? topic.color.replace('bg-', 'bg-') : 'bg-gray-200 dark:bg-slate-700'}`} />
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {Steps[currentStep]}
        </motion.div>
      </AnimatePresence>

      <AiHelper topicContext={`Topic: ${topic.title}. Concept: ${topic.conceptContent.text}. Game: ${topic.gameStory.scenario} (Python)`} />
    </div>
  );
};

// Sub-component for Quiz Logic
const QuizComponent: React.FC<{ questions: any[], onSubmit: (answers: number[]) => void | Promise<void>, onBack: () => void }> = ({ questions, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  
  const handleSelect = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const isComplete = answers.every(a => a !== -1);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border-4 border-green-50 dark:border-slate-700">
        <div className="p-6 bg-green-500 dark:bg-green-600 text-white flex justify-between items-center">
           <h2 className="text-2xl font-bold flex items-center gap-2">
             <Brain size={24} /> Knowledge Check
           </h2>
           <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
             {questions.length} Questions
           </span>
        </div>

        <div className="p-8 space-y-8">
          {questions.map((q, qIdx) => (
            <div key={q.id} className="border-b border-gray-100 dark:border-slate-700 pb-8 last:border-0 last:pb-0">
               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{qIdx + 1}. {q.question}</h3>
               <div className="grid grid-cols-1 gap-3">
                 {q.options.map((opt: string, optIdx: number) => (
                   <button
                     key={optIdx}
                     onClick={() => handleSelect(qIdx, optIdx)}
                     className={`text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${
                       answers[qIdx] === optIdx 
                       ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold' 
                       : 'border-gray-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-700 text-gray-600 dark:text-gray-300'
                     }`}
                   >
                     {opt}
                     {answers[qIdx] === optIdx && <Check size={20} />}
                   </button>
                 ))}
               </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-gray-50 dark:bg-slate-900/50 border-t dark:border-slate-700 flex justify-between">
          <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white font-bold">
             Back to Game
          </button>
          <button 
            onClick={async () => await onSubmit(answers)} 
            disabled={!isComplete}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 disabled:bg-gray-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-200 dark:shadow-none"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
};