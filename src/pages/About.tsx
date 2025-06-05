import { Calendar, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const timeline = [
    {
      year: '2013',
      title: 'Gründung',
      description: 'Start als kleines Designstudio mit Fokus auf digitale Lösungen'
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Erweiterung um Development-Team und erste Enterprise-Kunden'
    },
    {
      year: '2021',
      title: 'Innovation',
      description: 'Spezialisierung auf KI-gestützte digitale Transformation'
    },
    {
      year: '2024',
      title: 'Heute',
      description: 'Führende Digitalagentur mit 30+ Experten und 100+ Projekten'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Unser <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Team</span>,
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Ihre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Vision</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Wir verwandeln digitale Träume in messbare Erfolge und begleiten Sie auf dem Weg 
              zur digitalen Transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Unsere Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Bei GAgency glauben wir daran, dass digitale Transformation mehr ist als nur Technologie. 
                Es geht darum, Geschäftsprozesse zu revolutionieren und nachhaltiges Wachstum zu schaffen.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Wir entwickeln maßgeschneiderte digitale Lösungen, die nicht nur heute funktionieren, 
                sondern auch für die Herausforderungen von morgen gerüstet sind.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unser Ziel ist es, aus jedem Projekt eine Erfolgsgeschichte zu machen und unsere 
                Kunden zu den Gewinnern der digitalen Zukunft zu machen.
              </p>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="aspect-square bg-gradient-to-br from-primary-100 via-blue-50 to-purple-100 rounded-3xl p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Users className="text-primary-500 mb-3" size={32} />
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-gray-600">Kunden</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Zap className="text-blue-500 mb-3" size={32} />
                    <div className="text-2xl font-bold text-gray-900">100+</div>
                    <div className="text-gray-600">Projekte</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Calendar className="text-purple-500 mb-3" size={32} />
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-gray-600">Jahre</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Target className="text-green-500 mb-3" size={32} />
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-gray-600">Erfolgsrate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-primary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unsere <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Geschichte</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Von der Vision zur Realität - ein Jahrzehnt der digitalen Innovation
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold">{item.year.slice(-2)}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative lg:w-12 flex justify-center">
                    <div className="w-6 h-6 bg-white border-4 border-primary-500 rounded-full shadow-lg"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-primary-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    {/* Spacer for alternating layout */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unsere <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Werte</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diese Prinzipien leiten unser tägliches Handeln und unsere Beziehungen zu Kunden und Partnern
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-fade-in hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h4>
              <p className="text-gray-600 leading-relaxed">
                Wir bleiben stets am Puls der Zeit und nutzen die neuesten Technologien, 
                um bahnbrechende Lösungen zu entwickeln.
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-fade-in hover:scale-105" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Qualität</h4>
              <p className="text-gray-600 leading-relaxed">
                Exzellenz in jedem Detail - wir liefern hochwertige Ergebnisse, 
                die Erwartungen übertreffen und Standards setzen.
              </p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-fade-in hover:scale-105" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Partnerschaft</h4>
              <p className="text-gray-600 leading-relaxed">
                Wir verstehen uns als Partner unserer Kunden und arbeiten eng zusammen, 
                um gemeinsam außergewöhnliche Erfolge zu erzielen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Bereit für Ihre digitale Transformation?
          </h3>
          <p className="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto animate-fade-in">
            Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen und Ihr Unternehmen 
            für die digitale Zukunft rüsten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Projekt besprechen
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105"
            >
              Services entdecken
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
