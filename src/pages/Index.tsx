import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.navigate({ to: '/' });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      <div className="text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h1 className="text-4xl font-bold text-white mb-4">Loading Table Master Junior...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;