import { BarChart3, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';
import businessAnalytics from '@/assets/business-analytics.png';

const AnalyticsSection = () => {
  const benefits = [
    {
      icon: BarChart3,
      title: "Datenbasierte Entscheidungen",
      description: "Fundierte Geschäftsentscheidungen durch aussagekräftige Analytics"
    },
    {
      icon: Target,
      title: "Präzise Zielgruppenerreichung",
      description: "Optimierte Marketing-Strategien basierend auf echten Daten"
    },
    {
      icon: TrendingUp,
      title: "Kontinuierliche Optimierung",
      description: "Ständige Verbesserung durch Performance-Monitoring"
    }
  ];

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <img 
                src={businessAnalytics} 
                alt="Business Analytics und Datenauswertung"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Floating Performance Card */}
              <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Analytics</span>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -right-4 bg-primary-500 text-white rounded-xl shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">+250%</div>
                <div className="text-xs opacity-90">ROI Steigerung</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BarChart3 size={16} />
                Smart Analytics
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Daten in
                <span className="text-primary-500 block">
                  Erfolg verwandeln
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Mit intelligenten Analytics-Lösungen machen wir Ihre Geschäftsdaten 
                zu einem strategischen Vorteil. Erkennen Sie Potentiale, optimieren 
                Sie Prozesse und treffen Sie datenbasierte Entscheidungen.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <div className="font-semibold text-gray-900">Kostenlose Analytics-Analyse</div>
                  <div className="text-sm text-gray-600">Lassen Sie uns Ihr Potential bewerten</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AnalyticsSection;