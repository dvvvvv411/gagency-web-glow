
import FluidBackground from '@/components/backgrounds/FluidBackground';
import HeroSection from '@/components/sections/HeroSection';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import StatsBar from '@/components/sections/StatsBar';

const Index = () => {
  return (
    <FluidBackground variant="primary" className="min-h-screen">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-100 rounded-full opacity-20 blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-15 blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-200 rounded-full opacity-10 blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ServicesShowcase />
        <StatsBar />
      </div>
    </FluidBackground>
  );
};

export default Index;
