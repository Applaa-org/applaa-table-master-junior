import { useRouter } from '@tanstack/react-router';
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.state.location.pathname,
    );
  }, [router.state.location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
        <p className="text-xl text-gray-600 mb-6">Let's get you back to learning!</p>
        <button 
          onClick={() => router.navigate({ to: '/' })}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transform transition-all duration-200 shadow-lg"
        >
          Go Home 🏠
        </button>
      </div>
    </div>
  );
};

export default NotFound;