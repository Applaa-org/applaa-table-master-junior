export interface MultiplicationQuestion {
  id: number;
  factor1: number;
  factor2: number;
  answer: number;
  options: number[];
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const generateQuestion = (table: number): MultiplicationQuestion => {
  const factor2 = Math.floor(Math.random() * 10) + 1;
  const answer = table * factor2;
  
  // Generate wrong options
  const options = [answer];
  while (options.length < 4) {
    const wrong = Math.floor(Math.random() * 100) + 1;
    if (!options.includes(wrong) && wrong !== answer) {
      options.push(wrong);
    }
  }
  
  // Shuffle options
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: Date.now(),
    factor1: table,
    factor2,
    answer,
    options
  };
};

export const rewards: Reward[] = [
  { id: 'star', name: 'Gold Star', icon: '⭐', description: 'Perfect answer!' },
  { id: 'hero', name: 'Table Hero', icon: '🦸', description: 'You\'re a multiplication hero!' },
  { id: 'wizard', name: 'Math Wizard', icon: '🧙', description: 'Amazing math skills!' },
  { id: 'champion', name: 'Champion', icon: '🏆', description: 'Outstanding performance!' },
  { id: 'genius', name: 'Math Genius', icon: '🧠', description: 'Brilliant thinking!' }
];

export const mascots = [
  { name: 'Buddy the Bear', emoji: '🐻', color: 'bg-amber-400' },
  { name: 'Katie the Cat', emoji: '🐱', color: 'bg-pink-400' },
  { name: 'Danny the Dog', emoji: '🐶', color: 'bg-blue-400' },
  { name: 'Ellie the Elephant', emoji: '🐘', color: 'bg-purple-400' }
];