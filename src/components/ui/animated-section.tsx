
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-up';
  delay?: number;
}

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className, animation = 'fade-up', delay = 0, ...props }, ref) => {
    const { elementRef, isVisible } = useScrollAnimation();

    const getAnimationClass = () => {
      const baseClass = `transition-all duration-700 ease-out`;
      const delayClass = delay > 0 ? `delay-${delay}` : '';
      
      if (!isVisible) {
        switch (animation) {
          case 'fade-up':
            return `${baseClass} ${delayClass} opacity-0 translate-y-8`;
          case 'fade-in':
            return `${baseClass} ${delayClass} opacity-0`;
          case 'slide-up':
            return `${baseClass} ${delayClass} opacity-0 translate-y-12`;
          default:
            return `${baseClass} ${delayClass} opacity-0 translate-y-8`;
        }
      } else {
        return `${baseClass} ${delayClass} opacity-100 translate-y-0`;
      }
    };

    return (
      <section
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(getAnimationClass(), className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';

export { AnimatedSection };
