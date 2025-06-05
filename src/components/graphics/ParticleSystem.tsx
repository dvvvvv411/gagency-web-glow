
interface ParticleSystemProps {
  density?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
}

const ParticleSystem = ({ 
  density = 8, 
  color = 'primary', 
  size = 'sm',
  speed = 'slow' 
}: ParticleSystemProps) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const particles = Array.from({ length: density }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute ${sizeClasses[size]} bg-${color}-300 rounded-full opacity-20`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float 8s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
