
import { Component, Layers, Code2, Server, Bot, Database, CloudSnow, Globe, Container, Palette, GitBranch, PieChart } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animated-section';

const TechStackGrid = () => {
  const technologies = [
    // Frontend
    { icon: Component, name: 'React', category: 'Frontend' },
    { icon: Layers, name: 'Vue.js', category: 'Frontend' },
    { icon: Code2, name: 'TypeScript', category: 'Frontend' },
    
    // Backend
    { icon: Server, name: 'Node.js', category: 'Backend' },
    { icon: Bot, name: 'Python', category: 'Backend' },
    { icon: Database, name: 'PHP', category: 'Backend' },
    
    // Cloud
    { icon: CloudSnow, name: 'AWS', category: 'Cloud' },
    { icon: Globe, name: 'Azure', category: 'Cloud' },
    { icon: Container, name: 'Docker', category: 'Cloud' },
    
    // Tools
    { icon: Palette, name: 'Figma', category: 'Tools' },
    { icon: GitBranch, name: 'Git', category: 'Tools' },
    { icon: PieChart, name: 'Analytics', category: 'Tools' }
  ];

  return (
    <AnimatedSection animation="fade-up" delay={600} className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Technologie-Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit modernsten Technologien und bewährten Tools realisieren wir 
            nachhaltige digitale Lösungen für Ihr Unternehmen.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                <tech.icon 
                  className="text-primary-600 group-hover:rotate-12 transition-transform duration-300" 
                  size={24} 
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {tech.name}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {tech.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TechStackGrid;
