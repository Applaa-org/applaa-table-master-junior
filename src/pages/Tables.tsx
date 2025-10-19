import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Tables = () => {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  const TableCard = ({ table }: { table: number }) => (
    <Card 
      className="p-6 bg-gradient-to-br from-blue-300 to-purple-300 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-xl"
      onClick={() => setSelectedTable(table)}
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-white mb-2">{table}</div>
        <div className="text-white/80">Times Table</div>
      </div>
    </Card>
  );

  const TableDisplay = ({ table }: { table: number }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-purple-800">
        {table} Times Table 🎯
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <div 
            key={num} 
            className="bg-gradient-to-br from-yellow-300 to-orange-300 rounded-2xl p-4 text-center transform hover:scale-110 transition-all duration-300 shadow-lg animate-pulse"
            style={{ animationDelay: `${num * 0.1}s` }}
          >
            <div className="text-2xl font-bold text-purple-800">
              {table} × {num}
            </div>
            <div className="text-3xl font-bold text-orange-600 mt-2">
              = {table * num}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button 
          onClick={() => setSelectedTable(null)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:scale-105 transform transition-all duration-200"
        >
          Back to Tables 📚
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Multiplication Tables 📚
          </h1>
          <p className="text-xl text-white/90">Choose a table to explore!</p>
        </div>

        {selectedTable ? (
          <TableDisplay table={selectedTable} />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {tables.map((table) => (
                <TableCard key={table} table={table} />
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => router.navigate({ to: '/' })}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full hover:scale-105 transform transition-all duration-200"
              >
                Back to Home 🏠
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tables;