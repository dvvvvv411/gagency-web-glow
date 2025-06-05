
interface ParticleSystemProps {
  density?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
}

const ParticleSystem = ({ 
  density = 15, 
  color = 'primary', 
  size = 'md',
  speed = 'medium' 
}: ParticleSystemProps) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const speedDurations = {
    slow: '8s',
    medium: '6s',
    fast: '4s'
  };

  const particles = Array.from({ length: density }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: parseFloat(speedDurations[speed]) + (Math.random() * 2 - 1)
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${sizeClasses[size]} bg-${color}-400 rounded-full opacity-30 animate-float`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-${color}-300 rounded-full blur-sm opacity-50`}></div>
        </div>
      ))}
    </div>
  );
};

export default ParticleSystem;
