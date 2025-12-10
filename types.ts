export type ConceptType = 
  | 'VARIABLES' 
  | 'LOOPS' 
  | 'CONDITIONS' 
  | 'FUNCTIONS' 
  | 'LISTS'          // Replaced ARRAYS
  | 'LOGIC'
  | 'MATH'
  | 'STRINGS'
  | 'DICTIONARIES'   // Replaced OBJECTS
  | 'MODULES'        // Replaced DOM
  | 'FILES';         // Replaced EVENTS

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TopicData {
  id: string;
  type: ConceptType;
  title: string;
  description: string;
  iconName: string;
  color: string;
  codeSnippet?: string;
  // Step 1: Concept
  conceptContent: {
    text: string;
    analogy: string;
    imageUrl: string;
  };
  // Step 2: Game Format
  gameStory: {
    title: string;
    scenario: string;
    instruction: string;
    visualCues: string[];
  };
  // Step 3: Quiz
  quiz: QuizQuestion[];
}

export interface UserProgress {
  unlockedTopics: string[];
  completedTopics: string[];
  stars: number;
  badges: string[];
  scores: Record<string, number>;
}

export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
}