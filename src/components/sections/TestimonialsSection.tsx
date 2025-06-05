
import { Star, Quote, Users, TrendingUp, Award } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marcus Weber",
      position: "Geschäftsführer",
      company: "DigitalFlow GmbH",
      quote: "Die Entwicklung unserer E-Commerce-Plattform war ein voller Erfolg. Innerhalb von 6 Monaten konnten wir unseren Online-Umsatz um 400% steigern.",
      avatar: "MW",
      rating: 5,
      project: "E-Commerce Platform"
    },
    {
      name: "Dr. Julia Schneider",
      position: "IT-Leiterin",
      company: "MedTech Solutions",
      quote: "Professionelle Beratung und erstklassige Umsetzung. Das automatisierte System hat unsere Arbeitsabläufe revolutioniert und spart uns täglich 8 Stunden.",
      avatar: "JS",
      rating: 5,
      project: "Workflow Automation"
    },
    {
      name: "Alexander Müller",
      position: "Marketing Director",
      company: "StartupXpress",
      quote: "Von der ersten Beratung bis zum Go-Live - alles perfekt koordiniert. Die neue Website generiert 250% mehr Leads als zuvor.",
      avatar: "AM",
      rating: 5,
      project: "Corporate Website"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "150+",
      label: "Zufriedene Kunden"
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Erfolgsrate"
    },
    {
      icon: Award,
      number: "4.9",
      label: "Ø Bewertung"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={14} 
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <AnimatedSection animation="fade-up" delay={600} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Echte Erfolgsgeschichten von Unternehmen, die mit unserer Expertise 
            ihre digitale Transformation erfolgreich gemeistert haben.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="text-blue-600 opacity-20 group-hover:opacity-40 transition-opacity" size={32} />
                <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                  {testimonial.project}
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed text-sm">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {testimonial.position}
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <p className="text-blue-100 mb-6">
            Werden Sie Teil unserer Erfolgsgeschichten
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Kostenloses Beratungsgespräch vereinbaren
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialsSection;
