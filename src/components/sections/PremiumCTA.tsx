
import { Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';

const PremiumCTA = () => {
  return (
    <AnimatedSection animation="fade-up" delay={800} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-12 overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-blue-500 to-primary-600 p-[2px] rounded-2xl">
            <div className="bg-white rounded-2xl h-full w-full"></div>
          </div>

          {/* Animated Particles Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-primary-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-16 right-16 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ihr nächstes digitales Projekt wartet
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Starten Sie mit einer kostenlosen Strategieberatung und entdecken Sie, 
                wie wir Ihre digitalen Ziele erreichen können.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Kostenloses Strategiegespräch
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Unverbindliche Projektanalyse
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Individuelle Roadmap
                </span>
              </div>
            </div>

            {/* Right CTAs - 40% */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link
                to="/contact"
                className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Calendar size={20} />
                Termin vereinbaren
              </Link>
              <Link
                to="/services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                <ExternalLink size={20} />
                Portfolio durchstöbern
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PremiumCTA;
