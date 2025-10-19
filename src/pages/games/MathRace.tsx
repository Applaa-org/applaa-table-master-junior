import { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';
import { generateQuestion } from '@/data/multiplicationData';

interface Car {
  id: number;
  position: number;
  color: string;
  icon: string;
  name: string;
}

const MathRace = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(2));
  const [cars, setCars] = useState<Car[]>([
    { id: 1, position: 0, color: 'bg-red-500', icon: '🚗', name: 'Speedy' },
    { id: 2, position: 0, color: 'bg-blue-500', icon: '🏎️', name: 'Lightning' },
    { id: 3, position: 0, color: 'bg-green-500', icon: '🚙', name: 'Turbo' },
    { id: 4, position: 0, color: 'bg-yellow-500', icon: '🛻', name: 'Flash' }
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [raceComplete, setRaceComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      // Move player's car forward
      setCars(prev => prev.map(car => 
        car.id === 1 ? { ...car, position: Math.min(car.position + 20, 100) } : car
      ));
      
      // Move AI cars forward randomly
      setTimeout(() => {
        setCars(prev => prev.map((car, index) => {
          if (index === 0) return car; // Player's car
          return {
            ...car,
            position: Math.min(car.position + Math.random() * 15 + 5, 100)
          };
        }));
      }, 500);
    } else {
      // Wrong answer - move cars backward slightly
      setCars(prev => prev.map(car => 
        car.id === 1 ? { ...car, position: Math.max(car.position - 5, 0) } : car
      ));
    }
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    const nextTable = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion(generateQuestion(nextTable));
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setRaceStarted(true);
  };

  // Check for race completion
  useEffect(() => {
    const winner = cars.find(car => car.position >= 100);
    if (winner && !raceComplete) {
      setRaceComplete(true);
    }
  }, [cars, raceComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const AnswerButton = ({ answer }: { answer: number }) => {
    const isSelected = selectedAnswer === answer;
    const isCorrectAnswer = answer === currentQuestion.answer;
    
    let buttonClass = "w-full p-6 text-3xl font-bold rounded-2xl transform transition-all duration-300 ";
    
    if (!showResult) {
      buttonClass += "bg-gradient-to-br from-blue-400 to-purple-500 text-white hover:scale-105 hover:shadow-xl";
    } else if (isCorrectAnswer) {
      buttonClass += "bg-gradient-to-br from-green-400 to-green-500 text-white scale-105 animate-bounce";
    } else if (isSelected && !isCorrect) {
      buttonClass += "bg-gradient-to-br from-red-400 to-red-500 text-white animate-pulse";
    } else {
      buttonClass += "bg-gray-300 text-gray-500";
    }

    return (
      <button
        className={buttonClass}
        onClick={() => handleAnswer(answer)}
        disabled={showResult}
      >
        {answer}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">
      <Confetti isActive={showConfetti} />
      
      <div className="container mx-auto max-w-6xl">
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
              <span className="text-2xl font-bold text-green-800">Score: {score}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-blue-800">Time: {formatTime(timer)}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Math Race 🏁
          </h1>
          <p className="text-xl text-white/90">Answer quickly to win the race!</p>
        </div>

        {/* Race Track */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
          <div className="relative h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl p-4 mb-6">
            {/* Finish Line */}
            <div className="absolute right-4 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400 to-red-500 rounded-full"></div>
            <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-around">
              <div className="w-6 h-1 bg-white/80"></div>
              <div className="w-6 h-1 bg-white/80"></div>
              <div className="w-6 h-1 bg-white/80"></div>
            </div>
            
            {/* Cars */}
            {cars.map((car, index) => (
              <div
                key={car.id}
                className={`
                  absolute w-12 h-8 rounded-lg flex items-center justify-center text-2xl transform transition-all duration-1000
                  ${car.color} ${index === 0 ? 'top-4' : index === 1 ? 'top-12' : index === 2 ? 'top-20' : 'top-28'}
                `}
                style={{ left: `${car.position}%` }}
              >
                {car.icon}
              </div>
            ))}
          </div>

          {/* Question Display */}
          {!raceComplete && (
            <>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
                What is {currentQuestion.factor1} × {currentQuestion.factor2}?
              </h2>
              
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                {currentQuestion.options.map((option) => (
                  <AnswerButton key={option} answer={option} />
                ))}
              </div>

              {showResult && (
                <div className="text-center mt-6">
                  {isCorrect ? (
                    <div className="text-3xl font-bold text-green-600 mb-4">
                      Great! Your car zooms ahead! 🏎️💨
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-red-600 mb-4">
                      Oops! Wrong answer! 😅
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {raceComplete && (
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-4xl font-bold text-purple-800 mb-4">
                {cars.find(car => car.position >= 100)?.icon} Race Complete!
              </h2>
              <p className="text-2xl text-gray-700 mb-2">Final Score: {score}</p>
              <p className="text-lg text-gray-600 mb-6">Time: {formatTime(timer)}</p>
              <Button 
                onClick={() => {
                  setScore(0);
                  setTimer(0);
                  setCars(prev => prev.map(car => ({ ...car, position: 0 })));
                  setRaceComplete(false);
                  nextQuestion();
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200"
              >
                Race Again! 🏎️
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MathRace;