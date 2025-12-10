import { UserProgress } from '../types';
import { CURRICULUM } from './curriculum';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: (progress: UserProgress, currentTopicId?: string, currentScore?: number, maxScore?: number) => boolean;
}

export const BADGES: BadgeDefinition[] = [
  {
    id: 'badge-first-step',
    name: 'First Steps',
    description: 'Complete your first mission.',
    icon: '🚀',
    color: 'bg-blue-500',
    criteria: (p) => p.completedTopics.length >= 1
  },
  {
    id: 'badge-star-novice',
    name: 'Rising Star',
    description: 'Earn 50 stars.',
    icon: '⭐',
    color: 'bg-yellow-400',
    criteria: (p) => p.stars >= 50
  },
  {
    id: 'badge-star-master',
    name: 'Star Master',
    description: 'Earn 200 stars.',
    icon: '🌟',
    color: 'bg-yellow-600',
    criteria: (p) => p.stars >= 200
  },
  {
    id: 'badge-perfectionist',
    name: 'Perfectionist',
    description: 'Get a perfect score on a quiz.',
    icon: '🎯',
    color: 'bg-red-500',
    criteria: (p, tid, score, maxScore) => !!(score && maxScore && score === maxScore)
  },
  {
    id: 'badge-scholar',
    name: 'Scholar',
    description: 'Complete 10 missions.',
    icon: '🎓',
    color: 'bg-purple-500',
    criteria: (p) => p.completedTopics.length >= 10
  },
  {
    id: 'badge-variable-master',
    name: 'Variable Master',
    description: 'Complete 5 Variable missions.',
    icon: '📦',
    color: 'bg-indigo-500',
    criteria: (p) => {
        const varTopics = CURRICULUM.filter(t => t.type === 'VARIABLES').slice(0, 5).map(t => t.id);
        return varTopics.length > 0 && varTopics.every(id => p.completedTopics.includes(id));
    }
  },
  {
    id: 'badge-logic-wizard',
    name: 'Logic Wizard',
    description: 'Complete 3 Logic missions.',
    icon: '🧠',
    color: 'bg-cyan-500',
    criteria: (p) => {
        const logicTopics = CURRICULUM.filter(t => t.type === 'LOGIC').slice(0, 3).map(t => t.id);
        return logicTopics.length > 0 && logicTopics.every(id => p.completedTopics.includes(id));
    }
  }
];