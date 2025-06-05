
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';

interface ConfettiPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfettiPopup = ({ isOpen, onClose }: ConfettiPopupProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Hide confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Create confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
  }));

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          {confettiParticles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute w-2 h-2 ${particle.color} rounded-sm opacity-80 animate-pulse`}
              style={{
                left: `${particle.x}%`,
                top: '-10px',
                animationName: 'confettiFall',
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'forwards',
                transform: 'rotate(45deg)'
              }}
            />
          ))}
        </div>
      )}

      {/* Success Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Bewerbung erfolgreich eingereicht! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              Vielen Dank für Ihre Bewerbung! Wir haben Ihre Unterlagen erhalten.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                📧 Wir melden uns innerhalb von 5 Werktagen bei Ihnen
              </p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500">
              <p>✅ Lebenslauf erfolgreich hochgeladen</p>
              <p>✅ Anschreiben erfolgreich hochgeladen</p>
              <p>✅ Bewerbung in unserem System gespeichert</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button onClick={onClose} className="px-8">
              Verstanden
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Global styles for confetti animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes confettiFall {
            0% {
              transform: translateY(-10px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `
      }} />
    </>
  );
};

export default ConfettiPopup;
