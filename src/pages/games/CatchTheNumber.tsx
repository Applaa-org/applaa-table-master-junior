import { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';
import { generateQuestion } from '@/data/multiplicationData';

interface FallingNumber {
  id: number;
  number: number;
  x: number;
  y: number;
  speed: number;
  isCorrect: boolean;
}

const CatchTheNumber = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(2));
  const [fallingNumbers, setFallingNumbers] = useState<FallingNumber[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [level, setLevel] = useState(1);

  // Generate falling numbers
  const generateFallingNumber = useCallback(() => {
    const isCorrect = Math.random() < 0.3; // 30% chance of correct answer
    const number = isCorrect 
      ? currentQuestion.answer 
      : Math.floor(Math.random() * 100) + 1;
    
    return {
      id: Date.now() + Math.random(),
      number,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: -10,
      speed: Math.random() * 2 + 1 + (level * 0.5),
      isCorrect
    };
  }, [currentQuestion.answer, level]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      // Move existing numbers down
      setFallingNumbers(prev => 
        prev.map(num => ({ ...num, y: num.y + num.speed }))
          .filter(num => num.y < 100) // Remove numbers that fell off screen
      );

      // Add new numbers occasionally
      if (Math.random() < 0.02 + (level * 0.01)) {
        setFallingNumbers(prev => [...prev, generateFallingNumber()]);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameOver, level, generateFallingNumber]);

  // Check for missed correct answers
  useEffect(() => {
    const missedCorrect = fallingNumbers.filter(num => 
      num.isCorrect && num.y > 95
    );
    
    if (missedCorrect.length > 0) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }
  }, [fallingNumbers]);

  const handleNumberClick = (clickedNumber: FallingNumber) => {
    if (clickedNumber.isCorrect) {
      // Correct answer caught!
      setScore(prev => prev + 10 * level);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      // Generate new question
      const nextTable = Math.floor(Math.random() * 10) + 1;
      setCurrentQuestion(generateQuestion(nextTable));
      
      // Increase level every 5 correct answers
      if (score > 0 && score % 50 === 0) {
        setLevel(prev => prev + 1);
      }
    } else {
      // Wrong answer - lose a life
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }
    
    // Remove the clicked number
    setFallingNumbers(prev => prev.filter(num => num.id !== clickedNumber.id));
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setFallingNumbers([]);
    const nextTable = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion(generateQuestion(nextTable));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 p-4 relative overflow-hidden">
      <Confetti isActive={showConfetti} />
      
      {/* Game Area */}
      <div className="absolute inset-0 pointer-events-none">
        {fallingNumbers.map((num) => (
          <div
            key={num.id}
            className={`
              absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer pointer-events-auto
              transform transition-all duration-100 animate-pulse
              ${num.isCorrect 
                ? 'bg-gradient-to-br from-green-400 to-green-500 text-white hover:scale-110' 
                : 'bg-gradient-to-br from-red-400 to-red-500 text-white hover:scale-110'
              }
            `}
            style={{
              left: `${num.x}%`,
              top: `${num.y}%`,
              transform: `translate(-50%, -50%)`
            }}
            onClick={() => handleNumberClick(num)}
          >
            {num.number}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={() => router.navigate({ to: '/games' })}
            className="bg-white/90 text-gray-800 px-6 py-3 rounded-full hover:scale-105 transform transition-all duration-200"
          >
            ← Back to Games
          </Button>
          
          <div className="flex space-x-6">
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-blue-800">Score: {score}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-red-800">Lives: {lives}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-purple-800">Level: {level}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Catch the Number 🎈
          </h1>
          <p className="text-xl text-white/90">Catch the correct answers, avoid the wrong ones!</p>
        </div>

        {/* Question Display */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl mb-8 mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">
            What is {currentQuestion.factor1} × {currentQuestion.factor2}?
          </h2>
          <p className="text-center text-gray-600">Click on the correct answer as it falls!</p>
        </Card>

        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl text-center">
              <div className="text-6xl mb-4">😵</div>
              <h2 className="text-4xl font-bold text-red-600 mb-4">Game Over!</h2>
              <p className="text-2xl text-gray-700 mb-2">Final Score: {score}</p>
              <p className="text-lg text-gray-600 mb-6">Level Reached: {level}</p>
              <Button 
                onClick={restartGame}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200"
              >
                Play Again! 🚀
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchTheNumber;