
import React, { useState, useEffect } from 'react';
import { Heart, Rocket, Users, Zap, Globe, Award, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Heart,
    title: 'Work-Life-Balance',
    description: 'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten für eine perfekte Balance zwischen Studium und Arbeit.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Rocket,
    title: 'Schnelle Karriereentwicklung',
    description: 'Individuelle Weiterbildungsmöglichkeiten und Mentoring für Ihren beruflichen Werdegang.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Junges Team',
    description: 'Arbeiten Sie in einem dynamischen, kreativen Team mit flachen Hierarchien und offener Kommunikation.',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Zap,
    title: 'Innovative Projekte',
    description: 'Arbeiten Sie an spannenden Digital Marketing Projekten für namhafte Kunden und sammeln Sie wertvolle Erfahrungen.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Globe,
    title: 'Internationale Erfahrung',
    description: 'Arbeiten Sie mit internationalen Kunden und erweitern Sie Ihren kulturellen und sprachlichen Horizont.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Award,
    title: 'Faire Vergütung & Benefits',
    description: 'Attraktive Vergütung, moderne Arbeitsplätze, kostenlose Getränke und eine inspirierende Arbeitsatmosphäre.',
    gradient: 'from-amber-500 to-yellow-500'
  }
];

const BenefitsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextBenefit = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
  };

  const prevBenefit = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentBenefit = benefits[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Warum <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">GAgency?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie, was GAgency zum perfekten Sprungbrett für Ihre Karriere macht
          </p>
        </div>

        {/* Main Slider Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <div 
              className={`h-full bg-gradient-to-r ${currentBenefit.gradient} transition-all duration-4000 ease-linear`}
              style={{ 
                width: isPlaying ? '100%' : `${((currentIndex) / benefits.length) * 100}%`,
                animation: isPlaying ? 'progressBar 4s linear infinite' : 'none'
              }}
            ></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Content Side */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${currentBenefit.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <currentBenefit.icon className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {currentBenefit.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} von {benefits.length}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {currentBenefit.description}
              </p>

              {/* Controls */}
              <div className="flex items-center space-x-4 pt-4">
                <Button
                  onClick={prevBenefit}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <ChevronLeft size={20} />
                </Button>

                <Button
                  onClick={toggleAutoplay}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>

                <Button
                  onClick={nextBenefit}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <ChevronRight size={20} />
                </Button>

                <div className="flex space-x-2 ml-4">
                  {benefits.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? `bg-gradient-to-r ${currentBenefit.gradient}` 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative flex items-center justify-center">
              <div className={`w-full h-64 bg-gradient-to-br ${currentBenefit.gradient} rounded-2xl opacity-10 transition-all duration-500`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 bg-gradient-to-br ${currentBenefit.gradient} rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110`}>
                  <currentBenefit.icon className="text-white" size={64} />
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full shadow-lg animate-pulse opacity-60"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-white rounded-full shadow-lg animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-8 w-2 h-2 bg-white rounded-full shadow-lg animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
          {[
            { label: 'Werkstudenten', value: '25+' },
            { label: 'Übernahmequote', value: '90%' },
            { label: 'Kundenprojekte', value: '100+' },
            { label: 'Team-Zufriedenheit', value: '4.9/5' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes progressBar {
            from { width: 0% }
            to { width: 100% }
          }
        `}
      </style>
    </section>
  );
};

export default BenefitsSlider;
