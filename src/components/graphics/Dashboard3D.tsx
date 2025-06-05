
import { TrendingUp, BarChart3, Users, Target, Activity, Settings } from 'lucide-react';

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
        
        {/* Enhanced Bottom Section with More Content */}
        <div className="space-y-4">
          {/* Status Indicators */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
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
          
          {/* Progress Bars */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>System Performance</span>
              <span>94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Data Processing</span>
              <span>87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          
          {/* Mini Activity Feed */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-gray-500" size={12} />
              <span className="text-xs font-medium text-gray-700">Letzte Aktivität</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-600">• Automatisierung gestartet</div>
              <div className="text-xs text-gray-600">• Report generiert</div>
              <div className="text-xs text-gray-600">• 12 neue Leads</div>
            </div>
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
      
      <div className="absolute top-1/2 -left-2 w-8 h-8 bg-blue-500 rounded-full shadow-md flex items-center justify-center">
        <Settings className="text-white" size={12} />
      </div>
    </div>
  );
};

export default Dashboard3D;
