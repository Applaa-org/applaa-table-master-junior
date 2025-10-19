import { useState, useEffect } from 'react';

interface MascotProps {
  isHappy: boolean;
  mascot: { name: string; emoji: string; color: string };
}

const Mascot = ({ isHappy, mascot }: MascotProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isHappy) {
      const messages = [
        'Awesome job! ⭐',
        'You\'re amazing! 🌟',
        'Keep it up! 🚀',
        'Fantastic! 🎉',
        'Brilliant! 💫'
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [isHappy]);

  return (
    <div className={`${mascot.color} rounded-full p-6 text-center transform transition-all duration-500 ${isHappy ? 'scale-110 animate-bounce' : 'scale-100'}`}>
      <div className="text-6xl mb-2">{mascot.emoji}</div>
      {isHappy && message && (
        <div className="bg-white rounded-full px-4 py-2 text-sm font-bold text-gray-800 shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default Mascot;