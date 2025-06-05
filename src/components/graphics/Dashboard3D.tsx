
import { TrendingUp, BarChart3, Users, Target } from 'lucide-react';

const Dashboard3D = () => {
  return (
    <div className="relative w-full h-full perspective-1000">
      {/* Main 3D Container */}
      <div className="relative w-full h-full transform-gpu preserve-3d rotate-x-12 rotate-y-6">
        {/* Primary Dashboard Panel */}
        <div className="absolute inset-4 bg-white rounded-xl shadow-2xl transform-gpu translate-z-8 backdrop-blur-sm">
          <div className="p-6 h-full">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg p-3 transform hover:scale-105 transition-transform">
                <div className="text-xs text-primary-600 font-medium">Revenue</div>
                <div className="text-lg font-bold text-primary-700">€2.4M</div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 transform hover:scale-105 transition-transform">
                <div className="text-xs text-green-600 font-medium">Growth</div>
                <div className="text-lg font-bold text-green-700">+24%</div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-3 transform hover:scale-105 transition-transform">
                <div className="text-xs text-purple-600 font-medium">Users</div>
                <div className="text-lg font-bold text-purple-700">12.5K</div>
              </div>
            </div>
            
            {/* 3D Chart Visualization */}
            <div className="h-32 bg-gradient-to-tr from-gray-50 to-primary-50 rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around p-4">
                {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
                  <div
                    key={index}
                    className="relative group"
                    style={{ 
                      animationDelay: `${index * 200}ms`,
                      animation: 'slideUp 1s ease-out forwards'
                    }}
                  >
                    <div
                      className="w-6 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t transform-gpu perspective-500 hover:scale-110 transition-transform shadow-lg"
                      style={{ 
                        height: `${height}%`,
                        transform: 'rotateX(45deg) rotateY(-10deg)'
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-primary-300 rounded-t transform -translate-y-1"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Animated Grid Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Bottom Metrics */}
            <div className="grid grid-cols-4 gap-2">
              <div className="h-3 bg-gradient-to-r from-primary-200 to-primary-300 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="h-3 bg-gradient-to-r from-green-200 to-green-300 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="h-3 bg-gradient-to-r from-purple-200 to-purple-300 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Secondary Panel (Depth) */}
        <div className="absolute inset-6 bg-gray-100 rounded-lg transform-gpu translate-z-4 opacity-60"></div>
        
        {/* Tertiary Panel (More Depth) */}
        <div className="absolute inset-8 bg-gray-200 rounded-lg transform-gpu translate-z-2 opacity-40"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce z-10">
        <TrendingUp className="text-primary-500" size={24} />
      </div>
      
      <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-primary-100 rounded-full shadow-md flex items-center justify-center animate-pulse z-10">
        <BarChart3 className="text-primary-600" size={20} />
      </div>
      
      <div className="absolute top-1/4 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-float z-10"></div>
      
      <div className="absolute bottom-1/3 -right-6 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg animate-float z-10" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default Dashboard3D;
