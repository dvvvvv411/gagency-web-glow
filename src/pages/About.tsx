
import { Users, Award, Briefcase, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Max Mustermann',
      position: 'Gründer & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Lisa Schmidt',
      position: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Tim Wagner',
      position: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Sophia Becker',
      position: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  ];

  const stats = [
    { icon: Users, value: '50+', label: 'Zufriedene Kunden' },
    { icon: Award, value: '10+', label: 'Jahre Erfahrung' },
    { icon: Briefcase, value: '100+', label: 'Abgeschlossene Projekte' },
    { icon: BarChart, value: '30+', label: 'Branchenexperten' }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Über <span className="text-primary-500">GAgency</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Wir sind ein Team von kreativen Köpfen und technischen Experten, 
              die digitale Erlebnisse erschaffen, die begeistern.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="GAgency Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-primary-100 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-1/3 h-1/3 bg-primary-500 rounded-full -z-10 opacity-20"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Geschichte
              </h2>
              <p className="text-gray-600 mb-6">
                GAgency wurde 2013 mit einer klaren Vision gegründet: Digitale Lösungen zu schaffen, 
                die nicht nur ästhetisch ansprechend sind, sondern auch messbare Geschäftsergebnisse liefern.
              </p>
              <p className="text-gray-600 mb-6">
                Was als kleines Studio begann, ist heute zu einer führenden Digitalagentur mit einem 
                vielseitigen Team aus Designern, Entwicklern und Strategen gewachsen. Unser Engagement 
                für Qualität und Innovation hat uns zu einem vertrauenswürdigen Partner für Unternehmen 
                jeder Größe gemacht.
              </p>
              <p className="text-gray-600">
                Heute arbeiten wir mit Kunden aus verschiedenen Branchen zusammen und helfen ihnen, 
                in der digitalen Welt erfolgreich zu sein. Unsere Projekte reichen von einfachen 
                Websites bis hin zu komplexen Webanwendungen und E-Commerce-Plattformen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-primary-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unser Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lernen Sie die Köpfe hinter GAgency kennen. Ein Team von Experten, die Ihre Vision in die Realität umsetzen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diese Grundprinzipien leiten unsere Arbeit und unsere Interaktionen mit Kunden und Partners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Wir bleiben stets am Puls der Zeit und nutzen die neuesten Technologien und Trends, um innovative Lösungen zu schaffen.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualität</h3>
              <p className="text-gray-600">
                Wir streben nach Exzellenz in allem, was wir tun, und liefern hochwertige Ergebnisse, die die Erwartungen übertreffen.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Zusammenarbeit</h3>
              <p className="text-gray-600">
                Wir glauben an die Kraft der Zusammenarbeit und arbeiten eng mit unseren Kunden zusammen, um gemeinsam Erfolge zu erzielen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bereit, mit uns zu arbeiten?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Lassen Sie uns gemeinsam Ihr nächstes digitales Projekt verwirklichen.
            </p>
            <Link
              to="/contact"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 inline-flex items-center"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
