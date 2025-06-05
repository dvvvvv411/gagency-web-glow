
import { Star } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      position: "Marketing Director",
      company: "TechFlow",
      quote: "Die digitale Transformation unserer Prozesse war ein voller Erfolg. ROI von 300% im ersten Jahr!",
      avatar: "SM"
    },
    {
      name: "Michael R.",
      position: "CEO",
      company: "StartupXYZ",
      quote: "Professionelle E-Commerce-Lösung, die unseren Umsatz um 250% gesteigert hat. Absolute Empfehlung!",
      avatar: "MR"
    },
    {
      name: "Lisa K.",
      position: "Operations Manager",
      company: "InnovaCorp",
      quote: "Dank der Automatisierung sparen wir 40 Stunden pro Woche. Das Team ist hochprofessionell.",
      avatar: "LK"
    }
  ];

  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <Star key={index} size={16} className="text-yellow-400 fill-current" />
    ));
  };

  return (
    <AnimatedSection animation="fade-up" delay={1000} className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Echte Erfolgsgeschichten von Unternehmen, die mit uns ihre 
            digitale Transformation erfolgreich gemeistert haben.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {renderStars()}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.position} bei {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SocialProof;
