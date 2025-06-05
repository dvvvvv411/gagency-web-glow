
import { ArrowRight, Target, BarChart3, Zap, Users, Star, CheckCircle, TrendingUp, Award, Clock, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dashboard3D from '../components/graphics/Dashboard3D';
import NetworkVisualization from '../components/graphics/NetworkVisualization';
import ParticleSystem from '../components/graphics/ParticleSystem';
import GeometricBackground from '../components/graphics/GeometricBackground';

const Index = () => {
  const services = [
    {
      icon: Target,
      title: 'Transformation',
      description: 'Digitale Geschäftsmodelle'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Datenbasierte Entscheidungen'
    },
    {
      icon: Zap,
      title: 'Optimierung',
      description: 'Prozessverbesserung'
    },
    {
      icon: Lightbulb,
      title: 'Beratung',
      description: 'Strategische Expertise'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Langjährige Erfahrung',
      description: 'Über 100 erfolgreiche Projekte'
    },
    {
      icon: Zap,
      title: 'Innovation im Fokus',
      description: 'Modernste Technologien und Methoden'
    },
    {
      icon: Users,
      title: 'Kundenfokus',
      description: 'Individuelle Lösungen für jeden Bedarf'
    },
    {
      icon: TrendingUp,
      title: 'Messbare Ergebnisse',
      description: 'Nachweisbare Erfolge und ROI'
    }
  ];

  const successStories = [
    {
      icon: TrendingUp,
      number: '200%',
      title: 'Effizienzsteigerung',
      description: 'Durchschnittliche Verbesserung unserer Kunden'
    },
    {
      icon: Users,
      number: '50+',
      title: 'Zufriedene Kunden',
      description: 'Erfolgreiche Partnerschaften weltweit'
    },
    {
      icon: Clock,
      number: '75%',
      title: 'Zeitersparnis',
      description: 'Reduzierte Bearbeitungszeiten durch Automatisierung'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50"></div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-blue-100 rounded-full opacity-15 blur-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-200 rounded-full opacity-10 blur-lg"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Digitale
                <span className="text-primary-500"> Transformation</span>
                <br />
                für Ihr Unternehmen
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                Wir begleiten Sie auf dem Weg in die digitale Zukunft mit maßgeschneiderten 
                Lösungen, die Ihr Business nachhaltig voranbringen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center gap-2 group"
                >
                  Projekt starten
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/services"
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>
            
            {/* Enhanced 3D Dashboard Illustration */}
            <div className="relative animate-fade-in-up">
              <div className="aspect-square">
                <Dashboard3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ihre digitale Zukunft beginnt hier
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mit unserer Expertise in digitaler Transformation helfen wir Unternehmen dabei, 
                ihre Prozesse zu optimieren, neue Geschäftsmodelle zu entwickeln und nachhaltiges 
                Wachstum zu erzielen. Von der Strategie bis zur Umsetzung – wir sind Ihr Partner 
                für den digitalen Wandel.
              </p>
              <div className="text-primary-600 font-medium">
                Entdecken Sie, wie wir Ihr Unternehmen transformieren können.
              </div>
            </div>
            
            {/* Right Services Grid */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in-up">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                    <service.icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Warum GAgency Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Simple Decorative Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Network Visualization */}
            <div className="relative animate-fade-in order-2 lg:order-1">
              <div className="aspect-[4/3] relative">
                <NetworkVisualization />
              </div>
            </div>
            
            {/* Right Content */}
            <div className="animate-fade-in-up order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Warum GAgency wählen?
              </h2>
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors duration-300">
                      <item.icon className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Erfolgsgeschichten Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Erfolgsgeschichten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unsere Zahlen sprechen für sich – erleben Sie, wie wir Unternehmen 
              zu nachhaltigem Erfolg verhelfen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <story.icon className="text-primary-600" size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
                  {story.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {story.title}
                </h3>
                <p className="text-gray-600">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bereit für Ihre digitale Transformation?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen 
            in die digitale Zukunft führen können.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-flex items-center gap-3 group text-lg shadow-lg"
          >
            Kostenlose Beratung
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <div className="mt-8 text-primary-100 text-sm">
            Unverbindlich und kostenfrei
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
