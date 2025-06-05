
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CounterAnimationProps {
  endValue: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const CounterAnimation = ({ 
  endValue, 
  duration = 2000, 
  suffix = '', 
  className = '' 
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * endValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, endValue, duration]);

  return (
    <span 
      ref={elementRef as any}
      className={className}
    >
      {count}{suffix}
    </span>
  );
};

export default CounterAnimation;
