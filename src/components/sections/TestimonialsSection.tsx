
import { Star, Quote, Users, TrendingUp, Award, Sparkles, Zap, Shield } from 'lucide-react';
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
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "150+",
      label: "Zufriedene Kunden",
      bgGradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/20",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: Zap,
      number: "98%",
      label: "Erfolgsrate",
      bgGradient: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-500/20",
      glowColor: "shadow-emerald-500/25"
    },
    {
      icon: Sparkles,
      number: "4.9",
      label: "Ø Bewertung",
      bgGradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/20",
      glowColor: "shadow-purple-500/25"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' : 'text-gray-300'} transition-all duration-300`} 
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

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative group text-center bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-8 border border-white/30 shadow-2xl ${stat.glowColor} hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-2 right-2 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white drop-shadow-lg" size={28} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white/90 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group bg-white/95 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Top Accent Bar */}
              <div className={`h-1 bg-gradient-to-r ${testimonial.gradient}`}></div>
              
              <div className="relative p-8">
                {/* Enhanced Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <Quote className={`text-${testimonial.accentColor}-500 opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110`} size={36} />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${testimonial.accentColor}-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
                  </div>
                  <div className={`text-xs text-${testimonial.accentColor}-600 font-semibold bg-${testimonial.accentColor}-50 px-4 py-2 rounded-full border border-${testimonial.accentColor}-200 group-hover:shadow-md transition-shadow duration-300`}>
                    {testimonial.project}
                  </div>
                </div>

                {/* Enhanced Stars */}
                <div className="flex gap-1 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote with better typography */}
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-sm font-medium group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.quote}"
                </blockquote>

                {/* Enhanced Author Section */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <span className="text-white font-bold text-sm drop-shadow">
                      {testimonial.avatar}
                    </span>
                    <div className="absolute -bottom-1 -right-1">
                      <Shield className="w-4 h-4 text-green-500 bg-white rounded-full p-0.5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm mb-1 group-hover:text-gray-800 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {testimonial.position}
                    </div>
                    <div className={`text-xs text-${testimonial.accentColor}-600 font-semibold`}>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center mt-16">
          <p className="text-blue-100 mb-6 text-lg">
            Werden Sie Teil unserer Erfolgsgeschichten
          </p>
          <button className="relative group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              Kostenloses Beratungsgespräch vereinbaren
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            </span>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialsSection;
