
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Startseite', path: '/' },
    { name: 'Über Uns', path: '/about' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'Karriere', path: '/careers' },
    { name: 'Kontakt', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">G</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">GAgency</span>
              <span className="text-xs text-gray-500 font-medium -mt-1">Digital Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl group ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50/80'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50/80'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-blue-100/50 rounded-xl -z-10"></div>
                )}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full transition-all duration-300 ${
                    isActive(item.path) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              Projekt starten
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none transition-all duration-300 hover:bg-gray-50/80 rounded-xl"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-white/90 backdrop-blur-xl rounded-2xl mt-4 mb-4 border border-gray-200/50 shadow-xl">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold transition-all duration-300 rounded-xl ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50/80'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50/80'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full mt-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
              >
                Projekt starten
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
