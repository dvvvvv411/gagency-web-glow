
import { Users, Target, Zap, Award, TrendingUp, Building } from 'lucide-react';

const NetworkVisualization = () => {
  const centralNodes = [
    { id: 1, x: 50, y: 50, icon: Building, color: 'from-primary-500 to-primary-600', size: 'w-16 h-16', label: 'Ihr Unternehmen' },
  ];

  const serviceNodes = [
    { id: 2, x: 20, y: 25, icon: Target, color: 'from-blue-500 to-blue-600', size: 'w-12 h-12', label: 'Strategie' },
    { id: 3, x: 80, y: 25, icon: Zap, color: 'from-green-500 to-green-600', size: 'w-12 h-12', label: 'Automatisierung' },
    { id: 4, x: 20, y: 75, icon: TrendingUp, color: 'from-purple-500 to-purple-600', size: 'w-12 h-12', label: 'Analytics' },
    { id: 5, x: 80, y: 75, icon: Award, color: 'from-orange-500 to-orange-600', size: 'w-12 h-12', label: 'Optimierung' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {serviceNodes.map((node, index) => (
          <line
            key={index}
            x1="50%"
            y1="50%"
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse"
            style={{ animationDelay: `${index * 0.5}s` }}
          />
        ))}
      </svg>

      {/* Service Nodes */}
      {serviceNodes.map((node, index) => (
        <div
          key={node.id}
          className={`absolute ${node.size} bg-gradient-to-br ${node.color} rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <node.icon className="text-white" size={20} />
          
          {/* Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-xs font-medium text-gray-700">
            {node.label}
          </div>
        </div>
      ))}

      {/* Central Node */}
      {centralNodes.map((node) => (
        <div
          key={node.id}
          className={`absolute ${node.size} bg-gradient-to-br ${node.color} rounded-full shadow-xl flex items-center justify-center group`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <node.icon className="text-white" size={24} />
          
          {/* Central Label */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-primary-100 px-3 py-1 rounded-full text-xs font-semibold text-primary-700">
              {node.label}
            </div>
          </div>
          
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary-300 opacity-60 animate-ping"></div>
        </div>
      ))}

      {/* Success Metrics */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-2xl font-bold text-primary-600">200%</div>
        <div className="text-xs text-gray-600">Effizienzsteigerung</div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-2xl font-bold text-green-600">75%</div>
        <div className="text-xs text-gray-600">Zeitersparnis</div>
      </div>
    </div>
  );
};

export default NetworkVisualization;
