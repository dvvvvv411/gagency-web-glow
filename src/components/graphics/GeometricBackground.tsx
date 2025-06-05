
interface GeometricBackgroundProps {
  variant?: 'hero' | 'section';
  pattern?: 'circles' | 'dots' | 'lines';
}

const GeometricBackground = ({ 
  variant = 'hero', 
  pattern = 'dots' 
}: GeometricBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Simple SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          {/* Dots Pattern */}
          {pattern === 'dots' && (
            <pattern id="dotsPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="currentColor" className="text-primary-200" />
            </pattern>
          )}
          
          {/* Circles Pattern */}
          {pattern === 'circles' && (
            <pattern id="circlesPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-200" />
            </pattern>
          )}
          
          {/* Lines Pattern */}
          {pattern === 'lines' && (
            <pattern id="linesPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-primary-200" />
              <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-primary-200" />
            </pattern>
          )}
        </defs>
        
        {/* Apply Pattern */}
        <rect 
          width="100%" 
          height="100%" 
          fill={pattern === 'dots' ? 'url(#dotsPattern)' : 
                pattern === 'circles' ? 'url(#circlesPattern)' : 
                'url(#linesPattern)'}
        />
      </svg>
      
      {/* Simple Floating Shapes */}
      {variant === 'hero' && (
        <>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary-100 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-15"></div>
        </>
      )}
    </div>
  );
};

export default GeometricBackground;
