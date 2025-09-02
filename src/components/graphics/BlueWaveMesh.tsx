const BlueWaveMesh = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/20">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Mesh background */}
        <rect width="100%" height="100%" fill="url(#meshGradient)" />
        
        {/* Flowing wave paths */}
        <path
          d="M0,150 Q100,100 200,150 T400,150 L400,300 L0,300 Z"
          fill="url(#waveGradient1)"
          className="animate-pulse"
        />
        
        <path
          d="M0,180 Q150,120 300,180 T400,180 L400,300 L0,300 Z"
          fill="url(#waveGradient2)"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Floating particles */}
        <circle cx="80" cy="80" r="3" fill="hsl(var(--primary))" opacity="0.6" className="animate-bounce" />
        <circle cx="320" cy="120" r="2" fill="hsl(var(--primary))" opacity="0.4" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
        <circle cx="150" cy="60" r="2.5" fill="hsl(var(--primary))" opacity="0.8" className="animate-bounce" style={{ animationDelay: '1.5s' }} />
        <circle cx="250" cy="90" r="2" fill="hsl(var(--primary))" opacity="0.5" className="animate-bounce" style={{ animationDelay: '2s' }} />

        {/* Grid lines */}
        <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3">
          <line x1="0" y1="75" x2="400" y2="75" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="225" x2="400" y2="225" />
          <line x1="100" y1="0" x2="100" y2="300" />
          <line x1="200" y1="0" x2="200" y2="300" />
          <line x1="300" y1="0" x2="300" y2="300" />
        </g>
      </svg>
      
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
};

export default BlueWaveMesh;