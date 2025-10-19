import { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateQuestion, mascots } from '@//data/multiplicationData';
import Confetti from '@/components/Confetti';
import Mascot from '@/components/Mascot';

const Practice = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(2));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mascot] = useState(mascots[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotHappy, setMascotHappy] = useState(false);

  const handleAnswer = (answer: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
      setShowConfetti(true);
      setMascotHappy(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setMascotHappy(false), 2000);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    const nextTable = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion(generateQuestion(nextTable));
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4">
      <Confetti isActive={showConfetti} />
      
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={() => router.navigate({ to: '/' })}
            className="bg-white/90 text-gray-800 px-6 py-3 rounded-full hover:scale-105 transform transition-all duration-200"
          >
            ← Home
          </Button>
          
          <div className="flex space-x-6">
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-purple-800">Score: {score}</span>
            </div>
            <div className="bg-white/90 rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-orange-800">Streak: {streak}</span>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <Mascot isHappy={mascotHappy} mascot={mascot} />
        </div>

        {/* Question Card */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-800 mb-8">
              What is {currentQuestion.factor1} × {currentQuestion.factor2}?
            </h2>
            
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {currentQuestion.options.map((option) => (
                <AnswerButton key={option} answer={option} />
              ))}
            </div>

            {showResult && (
              <div className="mt-8">
                {isCorrect ? (
                  <div className="text-4xl font-bold text-green-600 mb-4">
                    Awesome! You got it right! 🎉
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-red-600 mb-4">
                    Not quite! The answer is {currentQuestion.answer} 😊
                  </div>
                )}
                
                <Button 
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200"
                >
                  Next Question →
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Practice;