import { Card } from '@/components/ui/card';

interface ProgressChartProps {
  progress: { [key: number]: number }; // table -> mastery percentage
}

const ProgressChart = ({ progress }: ProgressChartProps) => {
  const tables = Object.keys(progress).map(Number).sort((a, b) => a - b);

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-200 to-orange-200">
      <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">Your Progress 🎯</h3>
      <div className="space-y-4">
        {tables.map((table) => (
          <div key={table} className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {table}
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-full h-6 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ width: `${progress[table]}%` }}
                >
                  {progress[table] > 20 && (
                    <span className="text-white text-xs font-bold">{progress[table]}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressChart;