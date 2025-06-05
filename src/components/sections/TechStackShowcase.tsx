
const TechStackShowcase = () => {
  const techLogos = [
    { name: 'React', color: 'text-blue-500' },
    { name: 'Node.js', color: 'text-green-500' },
    { name: 'Python', color: 'text-yellow-500' },
    { name: 'AWS', color: 'text-orange-500' },
    { name: 'Docker', color: 'text-blue-600' },
    { name: 'TypeScript', color: 'text-blue-700' },
    { name: 'MongoDB', color: 'text-green-600' },
    { name: 'GraphQL', color: 'text-pink-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Technologien, die wir meistern
      </h2>
      
      <div className="relative overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex animate-scroll space-x-12">
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center space-y-2 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform duration-200`}>
                <div className="w-8 h-8 bg-current rounded opacity-80"></div>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;
