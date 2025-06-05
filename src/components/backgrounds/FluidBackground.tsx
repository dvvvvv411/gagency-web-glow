
interface FluidBackgroundProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  className?: string;
}

const FluidBackground = ({ 
  variant = 'primary', 
  children, 
  className = '' 
}: FluidBackgroundProps) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-blue-50 via-white to-primary-50';
      case 'secondary':
        return 'bg-gradient-to-br from-primary-50 via-blue-25 to-white';
      case 'tertiary':
        return 'bg-gradient-to-br from-white via-primary-25 to-blue-50';
      default:
        return 'bg-gradient-to-br from-blue-50 via-white to-primary-50';
    }
  };

  return (
    <div className={`${getBackgroundClass()} ${className}`}>
      {children}
    </div>
  );
};

export default FluidBackground;
