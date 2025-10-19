import { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';
import { generateQuestion } from '@/data/multiplicationData';

interface Treasure {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  question: any;
  icon: string;
}

const TreasureHunt = () => {
  const router = useRouter();
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTreasure, setSelectedTreasure] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);

  const treasureIcons = ['💎', '💰', '👑', '🏆', '⭐', '🎁', '🗝️', '💍', '🏅', '🎖️'];

  useEffect(() => {
    initializeGame();
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const initializeGame = () => {
    const newTreasures: Treasure[] = [];
    
    for (let i = 0; i < 8; i++) {
      const question = generateQuestion(Math.floor(Math.random() * 10) + 1);
      newTreasures.push({
        id: i,
        x: Math.random() * 70 + 15, // 15% to 85% of screen width
        y: Math.random() * 60 + 20, // 20% to 80% of screen height
        collected: false,
        question,
        icon: treasureIcons[i % treasureIcons.length]
      });
    }
    
    setTreasures(newTreasures);
  };

  const handleTreasureClick = (treasureId: number) => {
    if (treasures.find(t => t.id === treasureId)?.collected) return;
    
    setSelectedTreasure(treasureId);
    setCurrentQuestion(treasures.find(t => t.id === treasureId)?.question);
    setShowQuestion(true);
  };

  const handleAnswer = (answer: number) => {
    const treasure = treasures.find(t => t.id === selectedTreasure);
    if (!treasure) return;

    if (answer === treasure.question.answer) {
      // Correct answer!
      setScore(prev => prev + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      // Mark treasure as collected
      setTreasures(prev => prev.map(t => 
        t.id === selectedTreasure ? { ...t, collected: true } : t
      ));
      
      // Check if all treasures are collected
      const remainingTreasures = treasures.filter(t => !t.collected && t.id !== selectedTreasure);
      if (remainingTreasures.length === 0) {
        setGameComplete(true);
      }
    }
    
    setShowQuestion(false);
    setSelectedTreasure(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4 relative overflow-hidden">
      <Confetti isActive={showConfetti} />
      
      {/* Treasure Map Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-200" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DAA520' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
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
              <span className="text-2xl font-bold text-yellow-800">Score: {score}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-orange-800">Time: {formatTime(timer)}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-red-800">
                Treasures: {treasures.filter(t => t.collected).length}/{treasures.length}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Treasure Hunt 💎
          </h1>
          <p className="text-xl text-white/90">Click on treasures and answer questions to collect them!</p>
        </div>

        {/* Game Area */}
        <div className="relative h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl border-4 border-dashed border-yellow-400 overflow-hidden">
          {treasures.map((treasure) => (
            <div
              key={treasure.id}
              className={`
                absolute w-16 h-16 rounded-full flex items-center justify-center text-3xl cursor-pointer transform transition-all duration-300
                ${treasure.collected 
                  ? 'bg-green-300 scale-0 opacity-0' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-400 hover:scale-110 animate-bounce'
                }
              `}
              style={{
                left: `${treasure.x}%`,
                top: `${treasure.y}%`,
                transform: `translate(-50%, -50%)`,
                animationDelay: `${treasure.id * 0.2}s`
              }}
              onClick={() => !treasure.collected && handleTreasureClick(treasure.id)}
            >
              {treasure.collected ? '✓' : treasure.icon}
            </div>
          ))}
          
          {treasures.filter(t => !t.collected).length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          )}
        </div>

        {/* Question Modal */}
        {showQuestion && currentQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full mx-4">
              <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
                Answer to collect the treasure! 💎
              </h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  {currentQuestion.factor1} × {currentQuestion.factor2} = ?
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="p-4 text-2xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-2xl hover:scale-105 transform transition-all duration-200"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {gameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-4xl font-bold text-yellow-600 mb-4">Treasure Hunt Complete!</h2>
              <p className="text-2xl text-gray-700 mb-2">Final Score: {score}</p>
              <p className="text-lg text-gray-600 mb-6">Time: {formatTime(timer)}</p>
              <Button 
                onClick={initializeGame}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-2xl px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200"
              >
                Hunt Again! 🗺️
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureHunt;