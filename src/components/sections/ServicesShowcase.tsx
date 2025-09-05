
import { RefreshCw, ShoppingCart, BarChart3, Zap, Cloud, Target, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const ServicesShowcase = () => {
  const services = [
    {
      icon: RefreshCw,
      title: 'Digitale Transformation',
      description: 'Geschäftsprozesse revolutioniert',
      animation: 'hover:rotate-180 transition-transform duration-500'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Entwicklung',
      description: 'Webshops, die konvertieren',
      animation: 'hover:scale-110 transition-transform duration-300'
    },
    {
      icon: BarChart3,
      title: 'Datenanalyse & BI',
      description: 'Erkenntnisse, die wirken',
      animation: 'hover:animate-bounce'
    },
    {
      icon: Zap,
      title: 'Prozessautomatisierung',
      description: 'Produktivität optimieren',
      animation: 'hover:rotate-12 transition-transform duration-300'
    },
    {
      icon: Cloud,
      title: 'Cloud-Migration',
      description: 'Zukunftssicher skalieren',
      animation: 'hover:scale-110 transition-transform duration-300'
    },
    {
      icon: Target,
      title: 'Digital Marketing',
      description: 'Sichtbarkeit, die überzeugt',
      animation: 'hover:rotate-12 transition-transform duration-300'
    }
  ];

  return (
    <AnimatedSection animation="fade-up" delay={200} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ganzheitliche Lösungen für digitalen Erfolg
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der Konzeption bis zur finalen Implementierung – 
            wir führen Sie sicher durch Ihre digitale Transformation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <service.icon 
                  className={`text-primary-600 ${service.animation}`} 
                  size={32} 
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
                Weitere Details
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ServicesShowcase;
