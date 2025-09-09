import React from 'react';

interface ChartData {
  month: string;
  amount: number;
}

interface ChartProps {
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-64 px-2">
        {data.map((item, index) => {
          const height = (item.amount / maxAmount) * 200;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative group w-full max-w-12 mx-1">
                <div
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                  style={{ height: `${height}px` }}
                ></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {(item.amount / 1000000).toLocaleString('fa-IR')} میلیون تومان
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-600 text-center px-1">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
          <span className="text-gray-600">فروش ماهانه (میلیون تومان)</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;