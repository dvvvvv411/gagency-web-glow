import { ArrowRight, Badge, Rocket, Clock, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';
import heroDashboard from '@/assets/hero-dashboard.png';

const HeroSection = () => {
  const trustBadges = [
    { icon: Rocket, text: "150+ Projekte" },
    { icon: Heart, text: "95% Kundenzufriedenheit" },
    { icon: TrendingUp, text: "5 Jahre Expertise" }
  ];

  return (
    <AnimatedSection className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full border border-primary-200 text-sm font-medium">
            <Badge size={16} />
            Digitalagentur #1 Düsseldorf
          </div>
        </div>

        <div className="grid lg:grid-cols-11 gap-16 items-center">
          {/* Left Content - 55% */}
          <div className="lg:col-span-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Digitale Exzellenz
              <span className="text-primary-500 block">
                für Ihr Unternehmen
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Wir verwandeln Ihre digitalen Visionen in messbare Geschäftserfolge. 
              Von der Strategie bis zur Umsetzung – alles aus einer Hand.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mb-10">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <badge.icon size={16} className="text-primary-600" />
                  </div>
                  <span className="font-medium text-sm">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:scale-105"
              >
                Strategie-Call buchen
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
              >
                Referenzen ansehen
              </Link>
            </div>
          </div>
          
          {/* Right Dashboard Image - 45% */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 shadow-2xl border border-primary-100">
                <img 
                  src={heroDashboard} 
                  alt="Modern Dashboard Interface" 
                  className="w-full h-auto rounded-xl shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;
