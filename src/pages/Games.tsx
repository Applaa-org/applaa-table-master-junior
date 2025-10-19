import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Games = () => {
  const router = useRouter();

  const games = [
    {
      id: 'matching',
      name: 'Matching Game',
      emoji: '🎯',
      description: 'Match questions with answers!',
      color: 'from-purple-400 to-pink-400',
      comingSoon: false
    },
    {
      id: 'catch',
      name: 'Catch the Number',
      emoji: '🎈',
      description: 'Catch falling numbers!',
      color: 'from-blue-400 to-cyan-400',
      comingSoon: true
    },
    {
      id: 'treasure',
      name: 'Treasure Hunt',
      emoji: '💎',
      description: 'Find treasures with math!',
      color: 'from-yellow-400 to-orange-400',
      comingSoon: true
    },
    {
      id: 'race',
      name: 'Math Race',
      emoji: '🏃',
      description: 'Race against time!',
      color: 'from-green-400 to-blue-400',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Fun Math Games 🎮
          </h1>
          <p className="text-xl text-white/90">Choose a game to play and learn!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {games.map((game) => (
            <Card 
              key={game.id}
              className={`p-6 bg-gradient-to-br ${game.color} hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden`}
              onClick={() => !game.comingSoon && router.navigate({ to: `/games/${game.id}` })}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{game.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
                <p className="text-white/90 text-sm">{game.description}</p>
                
                {game.comingSoon && (
                  <div className="absolute top-2 right-2 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                    Coming Soon!
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

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

export default Games;