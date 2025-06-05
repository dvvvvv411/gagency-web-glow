
import { Star, Quote, Users, TrendingUp, Award, Sparkles, Zap, Shield } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marcus Weber",
      position: "Geschäftsführer",
      company: "DigitalFlow GmbH",
      quote: "Die Entwicklung unserer E-Commerce-Plattform war ein voller Erfolg. Innerhalb von 6 Monaten konnten wir unseren Online-Umsatz um 400% steigern.",
      avatar: "MW",
      rating: 5,
      project: "E-Commerce Platform",
      gradient: "from-emerald-500 to-teal-600",
      accentColor: "emerald"
    },
    {
      name: "Dr. Julia Schneider",
      position: "IT-Leiterin",
      company: "MedTech Solutions",
      quote: "Professionelle Beratung und erstklassige Umsetzung. Das automatisierte System hat unsere Arbeitsabläufe revolutioniert und spart uns täglich 8 Stunden.",
      avatar: "JS",
      rating: 5,
      project: "Workflow Automation",
      gradient: "from-purple-500 to-indigo-600",
      accentColor: "purple"
    },
    {
      name: "Alexander Müller",
      position: "Marketing Director",
      company: "StartupXpress",
      quote: "Von der ersten Beratung bis zum Go-Live - alles perfekt koordiniert. Die neue Website generiert 250% mehr Leads als zuvor.",
      avatar: "AM",
      rating: 5,
      project: "Corporate Website",
      gradient: "from-orange-500 to-red-600",
      accentColor: "orange"
    },
    {
      name: "Sarah Hoffmann",
      position: "CTO",
      company: "InnovateTech",
      quote: "Beeindruckende technische Expertise und zuverlässige Projektabwicklung. Unser neues System läuft seit 18 Monaten ohne Probleme.",
      avatar: "SH",
      rating: 5,
      project: "Enterprise Software",
      gradient: "from-blue-500 to-cyan-600",
      accentColor: "blue"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "150+",
      label: "Zufriedene Kunden"
    },
    {
      icon: Zap,
      number: "98%",
      label: "Erfolgsrate"
    },
    {
      icon: Sparkles,
      number: "4.9",
      label: "Ø Bewertung"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={14} 
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <AnimatedSection animation="fade-up" delay={600} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Echte Erfolgsgeschichten von Unternehmen, die mit unserer Expertise ihre digitale Transformation gemeistert haben.
          </p>
        </div>

        {/* Compact Stats Row */}
        <div className="flex justify-center gap-8 md:gap-12 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:bg-white/30 transition-colors duration-300">
                <stat.icon className="text-white" size={20} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
                    {/* Top Accent */}
                    <div className={`h-1 bg-gradient-to-r ${testimonial.gradient}`}></div>
                    
                    <div className="p-6">
                      {/* Compact Header */}
                      <div className="flex justify-between items-start mb-4">
                        <Quote className={`text-${testimonial.accentColor}-400 opacity-40`} size={28} />
                        <div className={`text-xs text-${testimonial.accentColor}-600 font-medium bg-${testimonial.accentColor}-50 px-3 py-1 rounded-full`}>
                          {testimonial.project}
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed line-clamp-4">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-xl flex items-center justify-center shadow-md relative`}>
                          <span className="text-white font-semibold text-xs">
                            {testimonial.avatar}
                          </span>
                          <Shield className="w-3 h-3 text-green-500 bg-white rounded-full p-0.5 absolute -bottom-1 -right-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {testimonial.position}
                          </div>
                          <div className={`text-xs text-${testimonial.accentColor}-600 font-medium`}>
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation */}
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/50 shadow-lg" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-white/50 shadow-lg" />
          </Carousel>
        </div>

        {/* Compact CTA */}
        <div className="text-center mt-12">
          <p className="text-blue-100 mb-4">
            Werden Sie Teil unserer Erfolgsgeschichten
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
            <span className="flex items-center gap-2">
              Kostenloses Beratungsgespräch vereinbaren
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialsSection;
