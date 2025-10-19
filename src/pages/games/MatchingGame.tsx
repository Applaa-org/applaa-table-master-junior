import { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';
import { generateQuestion } from '@/data/multiplicationData';

interface CardItem {
  id: number;
  content: string;
  type: 'question' | 'answer';
  matched: boolean;
}

const MatchingGame = () => {
  const router = useRouter();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    initializeGame();
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const initializeGame = () => {
    const newCards: CardItem[] = [];
    const questions: any[] = [];
    
    // Generate 6 multiplication questions
    for (let i = 0; i < 6; i++) {
      const question = generateQuestion(Math.floor(Math.random() * 10) + 1);
      questions.push(question);
      
      // Add question card
      newCards.push({
        id: i * 2,
        content: `${question.factor1} × ${question.factor2}`,
        type: 'question',
        matched: false
      });
      
      // Add answer card
      newCards.push({
        id: i * 2 + 1,
        content: question.answer.toString(),
        type: 'answer',
        matched: false
      });
    }
    
    // Shuffle cards
    newCards.sort(() => Math.random() - 0.5);
    setCards(newCards);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length >= 2) return;
    if (selectedCards.includes(cardId)) return;
    
    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);
    
    if (newSelected.length === 2) {
      setTimeout(() => checkMatch(newSelected), 500);
    }
  };

  const checkMatch = (selectedIds: number[]) => {
    const [firstId, secondId] = selectedIds;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);
    
    if (firstCard && secondCard) {
      // Find the question card
      const questionCard = firstCard.type === 'question' ? firstCard : secondCard;
      const answerCard = firstCard.type === 'answer' ? firstCard : secondCard;
      
      // Extract numbers from question card
      const questionText = questionCard.content;
      const [factor1, factor2] = questionText.split(' × ').map(Number);
      const expectedAnswer = factor1 * factor2;
      const actualAnswer = Number(answerCard.content);
      
      if (expectedAnswer === actualAnswer) {
        // Correct match!
        setScore(score + 10);
        setMatches(matches + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        
        // Mark cards as matched
        setCards(prev => prev.map(card => 
          selectedIds.includes(card.id) ? { ...card, matched: true } : card
        ));
        
        // Check if game is complete
        if (matches + 1 === 6) {
          setGameComplete(true);
        }
      }
    }
    
    setSelectedCards([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
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
              <span className="text-2xl font-bold text-purple-800">Score: {score}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-blue-800">Time: {formatTime(timer)}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-green-800">Matches: {matches}/6</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Matching Game 🎯
          </h1>
          <p className="text-xl text-white/90">Match the questions with their answers!</p>
        </div>

        {gameComplete ? (
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-purple-800 mb-4">Amazing Job!</h2>
            <p className="text-2xl text-gray-700 mb-6">
              You completed the game in {formatTime(timer)} with a score of {score}!
            </p>
            <Button 
              onClick={() => initializeGame()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200"
            >
              Play Again! 🚀
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  p-6 rounded-2xl cursor-pointer transform transition-all duration-300 text-center
                  ${card.matched 
                    ? 'bg-gradient-to-br from-green-300 to-green-400 scale-95 opacity-75' 
                    : selectedCards.includes(card.id)
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-300 scale-105 animate-pulse'
                    : 'bg-gradient-to-br from-blue-300 to-purple-300 hover:scale-105 hover:shadow-xl'
                  }
                `}
                onClick={() => !card.matched && handleCardClick(card.id)}
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {card.content}
                </div>
                <div className="text-sm text-white/80">
                  {card.type === 'question' ? 'Question' : 'Answer'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingGame;