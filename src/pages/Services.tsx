import { Code, Palette, Zap, ShoppingBag, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';
import FluidBackground from '@/components/backgrounds/FluidBackground';

const Services = () => {
  const mainServices = [
    {
      icon: Code,
      title: 'Webentwicklung',
      description: 'Wir entwickeln maßgeschneiderte Websites und Webanwendungen, die Ihre Geschäftsanforderungen erfüllen und Ihre Online-Präsenz stärken.',
      features: [
        'Responsive Webdesign',
        'Progressive Web Apps',
        'CMS-Integration',
        'Frontend & Backend Entwicklung'
      ],
      bgClass: 'bg-gradient-to-br from-blue-50 to-primary-100'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Wir gestalten intuitive und ansprechende Benutzeroberflächen, die Ihre Nutzer begeistern und zu einer positiven Nutzererfahrung beitragen.',
      features: [
        'Wireframing & Prototyping',
        'Benutzerfreundliche Interfaces',
        'Corporate Design',
        'UX-Forschung und -Tests'
      ],
      bgClass: 'bg-gradient-to-br from-purple-50 to-blue-100'
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce',
      description: 'Wir erstellen Online-Shops, die Verkäufe fördern und ein nahtloses Einkaufserlebnis für Ihre Kunden bieten.',
      features: [
        'Shop-Systeme (Shopify, WooCommerce)',
        'Produktmanagement',
        'Zahlungsintegration',
        'Kundenkonten & Checkout-Prozesse'
      ],
      bgClass: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    {
      icon: Globe,
      title: 'Online Marketing',
      description: 'Wir helfen Ihnen, Ihre Zielgruppe zu erreichen und Ihre digitale Präsenz zu stärken mit gezielten Marketingstrategien.',
      features: [
        'SEO-Optimierung',
        'Content Marketing',
        'Social Media Strategien',
        'Performance Marketing'
      ],
      bgClass: 'bg-gradient-to-br from-orange-50 to-yellow-100'
    }
  ];

  return (
    <FluidBackground className="min-h-screen pt-16">
      {/* Hero Section */}
      <AnimatedSection className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unsere <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Dienstleistungen</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von der Konzeption bis zur Umsetzung - wir bieten maßgeschneiderte digitale Lösungen für Ihr Unternehmen.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Services */}
      <AnimatedSection className="py-16" animation="fade-up" delay={200}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`${service.bgClass} p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group`}
              >
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 group-hover:scale-125 transition-transform duration-200" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group-hover:translate-x-2 transition-all duration-300"
                >
                  Mehr erfahren
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <FluidBackground variant="secondary" className="py-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" animation="fade-up" delay={400}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unser Arbeitsprozess
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ein klarer Prozess für erfolgreiche Ergebnisse. So arbeiten wir mit unseren Kunden zusammen.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 to-blue-200"></div>
            
            {/* Process steps */}
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center group">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right md:text-left md:order-1 transform transition-all duration-500 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Konzeption & Strategie</h3>
                  <p className="text-gray-600">
                    Wir beginnen mit einer gründlichen Analyse Ihrer Anforderungen und Ziele. 
                    Darauf basierend entwickeln wir eine maßgeschneiderte Strategie für Ihr Projekt.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start md:pl-12 md:order-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center group">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 text-left md:order-2 transform transition-all duration-500 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Design & Prototyping</h3>
                  <p className="text-gray-600">
                    Nach der Konzeptionsphase erstellen wir Wireframes und interaktive Prototypen, 
                    um die Struktur und das Design Ihrer digitalen Lösung zu visualisieren.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 md:order-1">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center group">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right md:text-left md:order-1 transform transition-all duration-500 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Entwicklung & Umsetzung</h3>
                  <p className="text-gray-600">
                    Unsere erfahrenen Entwickler setzen die Designs um und bringen Ihre digitale 
                    Lösung mit modernsten Technologien zum Leben.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start md:pl-12 md:order-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center group">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 text-left md:order-2 transform transition-all duration-500 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Test & Optimierung</h3>
                  <p className="text-gray-600">
                    Wir führen umfassende Tests durch, um sicherzustellen, dass Ihre Lösung 
                    fehlerfrei funktioniert und optimale Performance bietet.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 md:order-1">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      4
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative flex flex-col md:flex-row items-center group">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right md:text-left md:order-1 transform transition-all duration-500 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Launch & Support</h3>
                  <p className="text-gray-600">
                    Nach dem erfolgreichen Launch Ihrer digitalen Lösung bieten wir 
                    kontinuierlichen Support und Wartung an.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start md:pl-12 md:order-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </FluidBackground>

      {/* CTA Section */}
      <AnimatedSection className="py-20" animation="fade-up" delay={600}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl p-8 md:p-12 shadow-2xl transform transition-all duration-500 hover:scale-105">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Bereit, Ihr nächstes Projekt zu starten?
              </h2>
              <p className="text-primary-100 text-xl mb-8">
                Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
              </p>
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Jetzt anfragen
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </FluidBackground>
  );
};

export default Services;
