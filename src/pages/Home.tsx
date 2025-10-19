import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mascots } from '@//data/multiplicationData';

const Home = () => {
  const router = useRouter();
  const [selectedMascot] = useState(mascots[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Table Master Junior 🌟
          </h1>
          <p className="text-2xl text-white/90 font-medium">
            Learn, Play & Grow with Multiplication!
          </p>
        </div>

        {/* Mascot Welcome */}
        <div className="flex justify-center mb-8">
          <div className={`${selectedMascot.color} rounded-full p-8 shadow-2xl transform animate-pulse`}>
            <div className="text-8xl mb-4">{selectedMascot.emoji}</div>
            <div className="bg-white rounded-full px-6 py-3 text-center">
              <p className="text-lg font-bold text-gray-800">Hi! I'm {selectedMascot.name}!</p>
              <p className="text-sm text-gray-600">Ready to learn together? 🚀</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className="p-8 bg-gradient-to-br from-yellow-300 to-orange-300 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl"
            onClick={() => router.navigate({ to: '/tables' })}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Learn Tables</h2>
              <p className="text-purple-700">Explore multiplication tables 1-10</p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-green-300 to-blue-300 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl"
            onClick={() => router.navigate({ to: '/games' })}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-3xl font-bold text-blue-800 mb-2">Fun Games</h2>
              <p className="text-blue-700">Play and learn with exciting games!</p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-pink-300 to-purple-300 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl"
            onClick={() => router.navigate({ to: '/practice' })}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Quick Practice</h2>
              <p className="text-purple-700">Fast questions to test your skills</p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-red-300 to-orange-300 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl"
            onClick={() => router.navigate({ to: '/progress' })}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-orange-800 mb-2">My Progress</h2>
              <p className="text-orange-700">See how much you've learned!</p>
            </div>
          </Card>
        </div>

        {/* Quick Start Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl px-12 py-6 rounded-full hover:scale-110 transform transition-all duration-300 shadow-2xl"
            onClick={() => router.navigate({ to: '/practice' })}
          >
            Start Learning! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;