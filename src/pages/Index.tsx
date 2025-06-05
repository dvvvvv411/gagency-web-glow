
import { ArrowRight, RefreshCcw, TrendingUp, BarChart, Trophy, Headphones, Zap, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import TechElements from '@/components/graphics/TechElements';
import CounterAnimation from '@/components/ui/CounterAnimation';
import TechStackShowcase from '@/components/sections/TechStackShowcase';

const Index = () => {
  const services = [
    {
      icon: RefreshCcw,
      title: 'Digitale Transformation',
      description: 'Modernisierung Ihrer Geschäftsprozesse',
      animation: 'hover:rotate-180 transition-transform duration-500'
    },
    {
      icon: TrendingUp,
      title: 'Prozessoptimierung',
      description: 'Effizienzsteigerung durch Automatisierung',
      animation: 'hover:scale-110 animate-pulse'
    },
    {
      icon: BarChart,
      title: 'Datenanalyse',
      description: 'Datenbasierte Entscheidungsfindung',
      animation: 'hover:animate-bounce'
    }
  ];

  const features = [
    {
      icon: Trophy,
      number: 200,
      suffix: '+',
      title: 'Erfolgreiche Projekte',
      description: 'Abgeschlossene Transformationen'
    },
    {
      icon: Headphones,
      number: 24,
      suffix: '/7',
      title: 'Support',
      description: 'Rund um die Uhr verfügbar'
    },
    {
      icon: Zap,
      number: 95,
      suffix: '%',
      title: 'Agile Methoden',
      description: 'Schnelle Projektumsetzung'
    },
    {
      icon: MessageSquare,
      number: 100,
      suffix: '%',
      title: 'Transparente Kommunikation',
      description: 'Offene Projektbegleitung'
    }
  ];

  return (
    <FluidBackground variant="primary" className="min-h-screen">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-100 rounded-full opacity-20 blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-blue-100 rounded-full opacity-15 blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-200 rounded-full opacity-10 blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <AnimatedSection className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left Content - 60% */}
              <div className="lg:col-span-3">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Digitale Transformation,
                  <span className="text-primary-500 block">
                    die Ergebnisse liefert
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                  Wir verwandeln Ihre Vision in messbare Geschäftserfolge durch 
                  maßgeschneiderte digitale Lösungen und bewährte Strategien.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                  >
                    Kostenlose Beratung
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link
                    to="/services"
                    className="border-2 border-primary-300 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
                  >
                    Portfolio ansehen
                  </Link>
                </div>
              </div>
              
              {/* Right Tech Animation - 40% */}
              <div className="lg:col-span-2">
                <div className="relative h-96">
                  <TechElements />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Preview */}
        <AnimatedSection animation="fade-up" delay={200} className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Unsere Kernkompetenzen
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                    <service.icon 
                      className={`text-primary-600 ${service.animation}`} 
                      size={32} 
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <AnimatedSection animation="fade-up" delay={400} className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Warum Unternehmen auf uns vertrauen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                    <feature.icon className="text-primary-600" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-3">
                    <CounterAnimation 
                      endValue={feature.number} 
                      suffix={feature.suffix}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Tech Stack Showcase */}
        <AnimatedSection animation="fade-up" delay={600} className="py-12">
          <TechStackShowcase />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animation="fade-up" delay={800} className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center relative overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-blue-500 to-primary-600 p-[2px] rounded-2xl">
                <div className="bg-white rounded-2xl h-full w-full"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Starten Sie Ihr nächstes Projekt
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Lassen Sie uns gemeinsam Ihre digitale Zukunft gestalten. 
                  Kostenlose Erstberatung und unverbindliches Angebot.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-primary-500 text-white px-10 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 inline-flex items-center gap-3 group shadow-lg hover:shadow-xl"
                  >
                    Kostenlose Beratung
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link
                    to="/services"
                    className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Portfolio ansehen
                  </Link>
                </div>
                
                <div className="mt-6 text-gray-500 text-sm">
                  Unverbindlich und kostenfrei
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </FluidBackground>
  );
};

export default Index;
