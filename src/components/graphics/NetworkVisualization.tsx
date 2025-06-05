
import { Users, Target, Zap, Award, TrendingUp } from 'lucide-react';

const NetworkVisualization = () => {
  const nodes = [
    { id: 1, x: 50, y: 30, icon: Users, color: 'from-blue-400 to-blue-600', size: 'w-12 h-12' },
    { id: 2, x: 20, y: 60, icon: Target, color: 'from-green-400 to-green-600', size: 'w-10 h-10' },
    { id: 3, x: 80, y: 50, icon: Zap, color: 'from-yellow-400 to-yellow-600', size: 'w-11 h-11' },
    { id: 4, x: 35, y: 80, icon: Award, color: 'from-purple-400 to-purple-600', size: 'w-9 h-9' },
    { id: 5, x: 70, y: 20, icon: TrendingUp, color: 'from-red-400 to-red-600', size: 'w-10 h-10' },
    { id: 6, x: 15, y: 35, icon: Users, color: 'from-indigo-400 to-indigo-600', size: 'w-8 h-8' },
    { id: 7, x: 85, y: 75, icon: Target, color: 'from-pink-400 to-pink-600', size: 'w-9 h-9' },
  ];

  const connections = [
    [1, 2], [1, 3], [1, 5], [2, 4], [2, 6], [3, 7], [3, 5], [4, 6], [5, 7]
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="networkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="animate-pulse">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#networkGrid)" />
        </svg>
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {connections.map(([startId, endId], index) => {
          const startNode = nodes.find(n => n.id === startId);
          const endNode = nodes.find(n => n.id === endId);
          if (!startNode || !endNode) return null;
          
          return (
            <line
              key={index}
              x1={`${startNode.x}%`}
              y1={`${startNode.y}%`}
              x2={`${endNode.x}%`}
              y2={`${endNode.y}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{
                animation: `drawLine 2s ease-in-out ${index * 0.3}s both`,
                strokeDasharray: '100',
                strokeDashoffset: '100'
              }}
            />
          );
        })}
      </svg>

      {/* Network Nodes */}
      {nodes.map((node, index) => (
        <div
          key={node.id}
          className={`absolute ${node.size} bg-gradient-to-br ${node.color} rounded-full shadow-lg flex items-center justify-center transform-gpu hover:scale-110 transition-all duration-300 cursor-pointer animate-fadeInScale`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 0.2}s`
          }}
        >
          <node.icon className="text-white" size={16} />
          
          {/* Pulse Ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-white opacity-60 animate-ping"
            style={{ animationDelay: `${index * 0.5}s` }}
          ></div>
        </div>
      ))}

      {/* Central Success Indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-xl flex items-center justify-center animate-pulse">
          <div className="text-white text-2xl font-bold">200%</div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-300 opacity-50 animate-spin" style={{animationDuration: '8s'}}></div>
      </div>

      {/* Data Flow Particles */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-primary-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${index * 1.2}s`,
            animationDuration: '4s'
          }}
        ></div>
      ))}
    </div>
  );
};

export default NetworkVisualization;
