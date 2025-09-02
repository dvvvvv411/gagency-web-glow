const IsometricCubes = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/20">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cube face gradients */}
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Background pattern */}
        <rect width="100%" height="100%" fill="hsl(var(--background))" />
        
        {/* Large cube 1 */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          {/* Top face */}
          <path d="M100,120 L140,100 L180,120 L140,140 Z" fill="url(#cubeTop)" />
          {/* Left face */}
          <path d="M100,120 L140,140 L140,180 L100,160 Z" fill="url(#cubeLeft)" />
          {/* Right face */}
          <path d="M140,140 L180,120 L180,160 L140,180 Z" fill="url(#cubeRight)" />
        </g>

        {/* Medium cube 2 */}
        <g className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
          {/* Top face */}
          <path d="M220,80 L250,65 L280,80 L250,95 Z" fill="url(#cubeTop)" />
          {/* Left face */}
          <path d="M220,80 L250,95 L250,125 L220,110 Z" fill="url(#cubeLeft)" />
          {/* Right face */}
          <path d="M250,95 L280,80 L280,110 L250,125 Z" fill="url(#cubeRight)" />
        </g>

        {/* Small cube 3 */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
          {/* Top face */}
          <path d="M60,200 L80,190 L100,200 L80,210 Z" fill="url(#cubeTop)" />
          {/* Left face */}
          <path d="M60,200 L80,210 L80,230 L60,220 Z" fill="url(#cubeLeft)" />
          {/* Right face */}
          <path d="M80,210 L100,200 L100,220 L80,230 Z" fill="url(#cubeRight)" />
        </g>

        {/* Medium cube 4 */}
        <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>
          {/* Top face */}
          <path d="M300,140 L330,125 L360,140 L330,155 Z" fill="url(#cubeTop)" />
          {/* Left face */}
          <path d="M300,140 L330,155 L330,185 L300,170 Z" fill="url(#cubeLeft)" />
          {/* Right face */}
          <path d="M330,155 L360,140 L360,170 L330,185 Z" fill="url(#cubeRight)" />
        </g>

        {/* Small floating cube 5 */}
        <g className="animate-bounce" style={{ animationDelay: '2s' }}>
          {/* Top face */}
          <path d="M180,200 L200,190 L220,200 L200,210 Z" fill="url(#cubeTop)" />
          {/* Left face */}
          <path d="M180,200 L200,210 L200,230 L180,220 Z" fill="url(#cubeLeft)" />
          {/* Right face */}
          <path d="M200,210 L220,200 L220,220 L200,230 Z" fill="url(#cubeRight)" />
        </g>

        {/* Connection lines */}
        <g stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" className="animate-pulse">
          <line x1="140" y1="140" x2="250" y2="95" />
          <line x1="250" y1="125" x2="330" y2="155" />
          <line x1="80" y1="210" x2="200" y2="210" />
        </g>

        {/* Floating dots */}
        <circle cx="50" cy="50" r="2" fill="hsl(var(--primary))" opacity="0.6" className="animate-ping" />
        <circle cx="350" cy="60" r="1.5" fill="hsl(var(--primary))" opacity="0.4" className="animate-ping" style={{ animationDelay: '1s' }} />
        <circle cx="120" cy="50" r="1" fill="hsl(var(--primary))" opacity="0.8" className="animate-ping" style={{ animationDelay: '2s' }} />
      </svg>
    </div>
  );
};

export default IsometricCubes;