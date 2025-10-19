import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressChart from '@/components/ProgressChart';

const Progress = () => {
  const router = useRouter();
  
  // Mock progress data
  const [progress] = useState({
    1: 100,
    2: 85,
    3: 70,
    4: 60,
    5: 45,
    6: 30,
    7: 20,
    8: 15,
    9: 10,
    10: 5
  });

  const [achievements] = useState([
    { id: 1, name: 'First Steps', icon: '👶', description: 'Completed your first question', earned: true },
    { id: 2, name: 'Streak Master', icon: '🔥', description: 'Got 5 questions right in a row', earned: true },
    { id: 3, name: 'Table Explorer', icon: '📚', description: 'Viewed all multiplication tables', earned: true },
    { id: 4, name: 'Speed Demon', icon: '⚡', description: 'Answered 10 questions quickly', earned: false },
    { id: 5, name: 'Perfect Score', icon: '💯', description: 'Got 100% on a practice session', earned: false },
    { id: 6, name: 'Multiplication Hero', icon: '🦸', description: 'Mastered all tables', earned: false }
  ]);

  const masteredTables = Object.entries(progress).filter(([_, percentage]) => percentage >= 80).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Your Progress 🏆
          </h1>
          <p className="text-xl text-white/90">See how much you've learned!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <ProgressChart progress={progress} />

          {/* Stats Card */}
          <Card className="p-6 bg-gradient-to-br from-yellow-200 to-orange-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">Your Stats 📊</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/70 rounded-full px-6 py-3">
                <span className="font-bold text-gray-800">Tables Mastered:</span>
                <span className="text-2xl font-bold text-green-600">{masteredTables}/10</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 rounded-full px-6 py-3">
                <span className="font-bold text-gray-800">Total Points:</span>
                <span className="text-2xl font-bold text-blue-600">1,250</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 rounded-full px-6 py-3">
                <span className="font-bold text-gray-800">Best Streak:</span>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 rounded-full px-6 py-3">
                <span className="font-bold text-gray-800">Questions Answered:</span>
                <span className="text-2xl font-bold text-purple-600">89</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">Achievements 🎖️</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-2xl text-center ${achievement.earned ? 'bg-gradient-to-br from-green-300 to-blue-300' : 'bg-gray-300 opacity-50'}`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-bold text-gray-800 mb-1">{achievement.name}</h4>
                <p className="text-xs text-gray-600">{achievement.description}</p>
                {achievement.earned && (
                  <div className="mt-2 text-xs text-green-700 font-bold">✓ Earned!</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => router.navigate({ to: '/' })}
            className="bg-white/90 text-gray-800 px-8 py-3 rounded-full hover:scale-105 transform transition-all duration-200"
          >
            Back to Home 🏠
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Progress;