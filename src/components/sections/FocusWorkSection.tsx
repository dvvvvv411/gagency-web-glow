import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';
import focusWork from '@/assets/focus-work.png';

const FocusWorkSection = () => {
  const benefits = [
    "Effiziente Arbeitsabläufe durch digitale Optimierung",
    "Fokussierte Teams für maximale Produktivität", 
    "Messbare Ergebnisse durch datenbasierte Entscheidungen",
    "Skalierbare Lösungen für nachhaltiges Wachstum"
  ];

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-blue-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-blue-100">
                <img 
                  src={focusWork} 
                  alt="Focused Work Environment" 
                  className="w-full h-auto rounded-xl"
                  loading="lazy"
                />
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full border border-primary-200 text-sm font-medium mb-6">
              <CheckCircle size={16} />
              Fokussierte Zusammenarbeit
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Maximale Effizienz
              <span className="text-primary-500 block">
                durch fokussierte Arbeit
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Wir schaffen die optimalen Bedingungen für produktive Zusammenarbeit. 
              Unsere durchdachten Prozesse und modernen Tools ermöglichen es Ihrem Team, 
              sich auf das Wesentliche zu konzentrieren.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
            >
              Unsere Arbeitsweise kennenlernen
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default FocusWorkSection;