
const TechElements = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating Tech Elements */}
      <div className="relative w-80 h-80">
        {/* Center Node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-blue-400 rounded-lg rotate-45 opacity-80"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-10 h-10 bg-primary-300 rounded-full opacity-70"></div>
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-blue-500 transform rotate-45 opacity-75"></div>
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-primary-200 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
          <line 
            x1="160" y1="160" x2="160" y2="40" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary-300 opacity-40"
            strokeDasharray="5,5"
          />
          <line 
            x1="160" y1="160" x2="280" y2="160" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary-300 opacity-40"
            strokeDasharray="5,5"
          />
          <line 
            x1="160" y1="160" x2="160" y2="280" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary-300 opacity-40"
            strokeDasharray="5,5"
          />
          <line 
            x1="160" y1="160" x2="40" y2="160" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-primary-300 opacity-40"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Data Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default TechElements;
