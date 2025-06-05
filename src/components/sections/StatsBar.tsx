
import { Rocket, Clock, TrendingUp, Heart } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import CounterAnimation from '@/components/ui/CounterAnimation';

const StatsBar = () => {
  const stats = [
    {
      icon: Rocket,
      number: 127,
      suffix: '',
      title: 'Projekte realisiert'
    },
    {
      icon: Clock,
      number: 24,
      suffix: 'h',
      title: 'Ø Support-Antwortzeit'
    },
    {
      icon: TrendingUp,
      number: 3.2,
      suffix: 'M€',
      title: 'Umsatz generiert'
    },
    {
      icon: Heart,
      number: 98,
      suffix: '%',
      title: 'Weiterempfehlungsrate'
    }
  ];

  return (
    <AnimatedSection animation="fade-up" delay={400} className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                    <stat.icon className="text-primary-600" size={16} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">
                    <CounterAnimation 
                      endValue={stat.number} 
                      suffix={stat.suffix}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default StatsBar;
