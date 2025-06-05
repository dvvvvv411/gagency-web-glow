
import { ArrowRight, Target, BarChart3, Zap, Users, Star, CheckCircle, TrendingUp, Award, Clock, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <section className="min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-primary-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-10 animate-pulse"></div>
        </div>
        
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
            
            {/* Right Illustration */}
            <div className="relative animate-fade-in-up">
              <div className="aspect-square bg-gradient-to-tr from-primary-600 via-primary-500 to-primary-400 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Dashboard Mockup */}
                <div className="absolute inset-4 bg-white rounded-lg p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-8 bg-primary-100 rounded animate-pulse"></div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-primary-100 to-primary-200 rounded mb-4 flex items-end justify-around p-2">
                    <div className="w-4 bg-primary-500 rounded-t" style={{height: '60%'}}></div>
                    <div className="w-4 bg-primary-400 rounded-t" style={{height: '80%'}}></div>
                    <div className="w-4 bg-primary-600 rounded-t" style={{height: '40%'}}></div>
                    <div className="w-4 bg-primary-500 rounded-t" style={{height: '90%'}}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-primary-100 rounded"></div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <TrendingUp className="text-primary-500" size={32} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary-100 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <BarChart3 className="text-primary-600" size={24} />
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

      {/* Warum GAgency Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Illustration */}
            <div className="relative animate-fade-in order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl shadow-xl relative overflow-hidden">
                {/* Team Work Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-8">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Users className="text-primary-600" size={24} />
                    </div>
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <TrendingUp className="text-primary-600" size={24} />
                    </div>
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Target className="text-primary-600" size={24} />
                    </div>
                  </div>
                </div>
                {/* Success Chart Mockup */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-end justify-between h-16">
                    <div className="w-6 bg-primary-200 rounded-t" style={{height: '30%'}}></div>
                    <div className="w-6 bg-primary-400 rounded-t" style={{height: '60%'}}></div>
                    <div className="w-6 bg-primary-600 rounded-t" style={{height: '100%'}}></div>
                    <div className="w-6 bg-primary-500 rounded-t" style={{height: '80%'}}></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full shadow-lg"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-full opacity-60"></div>
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
