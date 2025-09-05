import { ArrowRight, Badge, Rocket, Clock, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';

const HeroSection = () => {
  const trustBadges = [
    { icon: Rocket, text: "200+ Realisierte Projekte" },
    { icon: Heart, text: "99% Zufriedene Auftraggeber" },
    { icon: TrendingUp, text: "Über 10 Jahre Kompetenz" }
  ];

  return (
    <AnimatedSection className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full border border-primary-200 text-sm font-medium">
            <Badge size={16} />
            Führende Digitalagentur München
          </div>
        </div>

        <div className="grid lg:grid-cols-11 gap-16 items-center">
          {/* Left Content - 55% */}
          <div className="lg:col-span-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Digitale Spitzenleistung
              <span className="text-primary-500 block">
                für Ihr Business
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Wir machen aus Ihren digitalen Ideen nachweisbare Ergebnisse. 
              Von der Konzeption bis zur Realisierung – komplett aus einer Quelle.
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
                Gratis Erstberatung
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
              >
                Service-Portfolio
              </Link>
            </div>
          </div>
          
          {/* Right Image - 45% */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <img 
                  src="/lovable-uploads/668603aa-72bf-4686-8fb8-577de74a2805.png" 
                  alt="Professioneller Arbeitsplatz mit digitalen Tools"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Digitale Innovation
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">97%</div>
                    <div className="text-xs text-gray-600">Erfolgsquote</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;
