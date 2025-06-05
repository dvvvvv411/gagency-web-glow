
import { Users, Award, Heart, BookOpen, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Flexible Arbeitszeiten',
      description: 'Wir bieten flexible Arbeitszeiten und die Möglichkeit, remote zu arbeiten.'
    },
    {
      icon: Users,
      title: 'Starkes Team',
      description: 'Werde Teil unseres talentierten und unterstützenden Teams.'
    },
    {
      icon: Award,
      title: 'Weiterbildung',
      description: 'Regelmäßige Schulungen und Weiterbildungsmöglichkeiten.'
    },
    {
      icon: Heart,
      title: 'Work-Life-Balance',
      description: '30 Tage Urlaub und Fokus auf eine gesunde Work-Life-Balance.'
    },
    {
      icon: BookOpen,
      title: 'Mentoring',
      description: 'Persönliche Betreuung und Karriereentwicklung durch erfahrene Mentoren.'
    },
    {
      icon: MapPin,
      title: 'Zentrale Lage',
      description: 'Unser Büro befindet sich zentral in Berlin mit guter Anbindung.'
    },
  ];

  const openPositions = [
    {
      title: 'Frontend Entwickler (m/w/d)',
      type: 'Vollzeit',
      location: 'Berlin / Remote',
      description: 'Wir suchen einen erfahrenen Frontend Entwickler zur Verstärkung unseres Teams. Deine Aufgabe wird die Entwicklung moderner, responsiver Webinterfaces sein.'
    },
    {
      title: 'UI/UX Designer (m/w/d)',
      type: 'Vollzeit / Teilzeit',
      location: 'Berlin',
      description: 'Als UI/UX Designer gestaltest du benutzerfreundliche und ästhetische Designs für unsere Kundenprojekte.'
    },
    {
      title: 'Backend Entwickler (m/w/d)',
      type: 'Vollzeit',
      location: 'Remote',
      description: 'Wir suchen einen Backend Entwickler zur Entwicklung skalierbarer und performanter Serveranwendungen.'
    },
    {
      title: 'Projektmanager (m/w/d)',
      type: 'Vollzeit',
      location: 'Berlin',
      description: 'Als Projektmanager koordinierst du unsere Kundenprojekte von der Konzeption bis zur Umsetzung.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Karriere bei <span className="text-primary-500">GAgency</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Werde Teil unseres Teams und hilf uns dabei, außergewöhnliche digitale Erlebnisse zu schaffen.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="GAgency Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-primary-100 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-1/3 h-1/3 bg-primary-500 rounded-full -z-10 opacity-20"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Arbeiten bei GAgency
              </h2>
              <p className="text-gray-600 mb-6">
                Bei GAgency bieten wir mehr als nur einen Job. Wir bieten eine 
                Umgebung, in der du wachsen, lernen und deine Fähigkeiten in 
                spannenden Projekten einbringen kannst.
              </p>
              <p className="text-gray-600 mb-6">
                Unser Team besteht aus leidenschaftlichen Designern, Entwicklern 
                und digitalen Strategen, die täglich daran arbeiten, außergewöhnliche 
                digitale Erlebnisse zu schaffen. Wir legen Wert auf Kreativität, 
                Innovation und kontinuierliches Lernen.
              </p>
              <p className="text-gray-600">
                Wenn du nach einer Karriere suchst, die herausfordernd, erfüllend und 
                niemals langweilig ist, dann bist du bei uns genau richtig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits bei GAgency
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir bieten unseren Mitarbeitern zahlreiche Vorteile, die das Arbeiten bei uns besonders machen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="text-primary-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Offene Stellen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schau dir unsere aktuellen Stellenangebote an und werde Teil unseres Teams.
            </p>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-lg p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span>{position.type}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                    <p className="text-gray-600 mb-6 md:mb-0">
                      {position.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group"
                    >
                      Mehr erfahren
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bewerbungsprozess
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              So läuft der Bewerbungsprozess bei GAgency ab.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-primary-100"></div>
              
              <div className="space-y-12">
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10">
                    1
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Bewerbung einreichen</h3>
                    <p className="text-gray-600">
                      Sende uns deine Bewerbung mit Lebenslauf und Motivationsschreiben. 
                      Erzähle uns, warum du bei GAgency arbeiten möchtest und was dich auszeichnet.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10">
                    2
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Erstes Kennenlernen</h3>
                    <p className="text-gray-600">
                      Wenn deine Bewerbung uns überzeugt, laden wir dich zu einem ersten Gespräch ein, 
                      bei dem wir uns gegenseitig kennenlernen und offene Fragen klären.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10">
                    3
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fachgespräch</h3>
                    <p className="text-gray-600">
                      Im nächsten Schritt führen wir ein Fachgespräch, bei dem wir deine Kenntnisse 
                      und Fähigkeiten in deinem Fachgebiet genauer unter die Lupe nehmen.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10">
                    4
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Kennenlernen des Teams</h3>
                    <p className="text-gray-600">
                      Du lernst dein potenzielles Team kennen und erhältst Einblick in unsere 
                      Arbeitsweise und Projekte.
                    </p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center text-2xl font-bold text-primary-500 z-10">
                    5
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Angebot</h3>
                    <p className="text-gray-600">
                      Wenn wir überzeugt sind, dass du gut zu uns passt, machen wir dir ein Angebot 
                      und freuen uns darauf, dich in unserem Team willkommen zu heißen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Keine passende Stelle dabei?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Wir freuen uns auch über Initiativbewerbungen!
            </p>
            <Link
              to="/contact"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 inline-flex items-center"
            >
              Jetzt bewerben
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
