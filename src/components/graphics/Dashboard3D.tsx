
import { TrendingUp, BarChart3, Users, Target } from 'lucide-react';

const Dashboard3D = () => {
  return (
    <div className="relative w-full h-full">
      {/* Main Dashboard Container */}
      <div className="relative w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        {/* Header with Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-600" size={16} />
              <span className="text-xs font-medium text-blue-700">Wachstum</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">+24%</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-green-600" size={16} />
              <span className="text-xs font-medium text-green-700">Effizienz</span>
            </div>
            <div className="text-2xl font-bold text-green-800">+45%</div>
          </div>
        </div>
        
        {/* Simple Chart Visualization */}
        <div className="h-32 bg-gradient-to-t from-gray-50 to-white rounded-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-around p-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
              <div
                key={index}
                className="w-4 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t transition-all duration-1000 ease-out"
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${index * 150}ms`
                }}
              />
            ))}
          </div>
          
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-px bg-gray-200 opacity-50" />
            ))}
          </div>
        </div>
        
        {/* Bottom Status Indicators */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Prozesse</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Automation</span>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary-500 rounded-full shadow-lg flex items-center justify-center animate-bounce">
        <Target className="text-white" size={20} />
      </div>
      
      <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-green-500 rounded-full shadow-lg flex items-center justify-center">
        <Users className="text-white" size={16} />
      </div>
    </div>
  );
};

export default Dashboard3D;
