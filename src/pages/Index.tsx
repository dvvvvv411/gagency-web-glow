
import { ArrowRight, Code, Palette, Zap, Users, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      icon: Code,
      title: 'Webentwicklung',
      description: 'Moderne, responsive Websites und Webanwendungen mit neuesten Technologien.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Benutzerfreundliche und ästhetische Designs für optimale Nutzererfahrung.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Blitzschnelle Ladezeiten und optimierte Performance für beste Ergebnisse.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mueller',
      company: 'TechStart GmbH',
      text: 'GAgency hat unsere Vision perfekt umgesetzt. Professionell, schnell und zuverlässig.',
      rating: 5
    },
    {
      name: 'Marcus Weber',
      company: 'Digital Solutions',
      text: 'Hervorragende Arbeit! Unser neuer Webauftritt übertrifft alle Erwartungen.',
      rating: 5
    }
  ];

  const features = [
    'Responsive Design für alle Geräte',
    'SEO-optimierte Entwicklung',
    '24/7 Support und Wartung',
    'Moderne Technologien'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Moderne Web
            <span className="text-primary-500">lösungen</span>
            <br />
            für Ihr Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Wir entwickeln maßgeschneiderte Websites und digitale Lösungen, 
            die Ihr Unternehmen zum Erfolg führen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
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
              Unsere Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was wir für Sie tun
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Von der Konzeption bis zur Umsetzung - wir begleiten Sie bei jedem Schritt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <service.icon className="text-primary-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Warum GAgency wählen?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Wir kombinieren kreative Designs mit modernster Technologie, 
                um Ihnen den besten digitalen Auftritt zu ermöglichen.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-primary-500" size={24} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group"
                >
                  Mehr über uns
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg shadow-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-3/4 aspect-[4/3] bg-gray-50 rounded-lg shadow-lg"></div>
              <div className="absolute -top-6 -left-6 w-1/2 aspect-square bg-primary-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was unsere Kunden sagen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zufriedene Kunden sind unsere beste Referenz.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Bereit für Ihren neuen Webauftritt?
              </h2>
              <p className="text-primary-100 text-xl mb-8">
                Lassen Sie uns gemeinsam Ihr nächstes Projekt verwirklichen.
              </p>
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 inline-flex items-center gap-2 group"
              >
                Kontakt aufnehmen
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
