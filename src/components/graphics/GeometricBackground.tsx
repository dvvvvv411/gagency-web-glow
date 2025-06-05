
interface GeometricBackgroundProps {
  variant?: 'hero' | 'section';
  pattern?: 'circles' | 'triangles' | 'hexagons';
}

const GeometricBackground = ({ 
  variant = 'hero', 
  pattern = 'circles' 
}: GeometricBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG Pattern Definitions */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          {/* Circles Pattern */}
          {pattern === 'circles' && (
            <pattern id="circlePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary-200 opacity-30">
                <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-primary-400 opacity-50">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          )}
          
          {/* Triangles Pattern */}
          {pattern === 'triangles' && (
            <pattern id="trianglePattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <polygon points="12,2 22,20 2,20" fill="currentColor" className="text-primary-200 opacity-20">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0 12 12;360 12 12" 
                  dur="20s" 
                  repeatCount="indefinite"
                />
              </polygon>
            </pattern>
          )}
          
          {/* Hexagons Pattern */}
          {pattern === 'hexagons' && (
            <pattern id="hexagonPattern" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <polygon points="15,2 26,9 26,17 15,24 4,17 4,9" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-300 opacity-40">
                <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
              </polygon>
            </pattern>
          )}
          
          {/* Gradient Definitions */}
          <radialGradient id="heroGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        
        {/* Apply Pattern */}
        <rect 
          width="100%" 
          height="100%" 
          fill={pattern === 'circles' ? 'url(#circlePattern)' : 
                pattern === 'triangles' ? 'url(#trianglePattern)' : 
                'url(#hexagonPattern)'}
        />
        
        {/* Overlay Gradient for Hero */}
        {variant === 'hero' && (
          <rect width="100%" height="100%" fill="url(#heroGradient)" />
        )}
      </svg>
      
      {/* Large Floating Shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-200 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-primary-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-5 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 opacity-20 animate-spin" style={{animationDuration: '20s'}}></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 transform rotate-12 opacity-25 animate-bounce"></div>
    </div>
  );
};

export default GeometricBackground;
