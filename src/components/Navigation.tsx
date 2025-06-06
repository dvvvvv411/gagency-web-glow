
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Startseite', path: '/' },
    { name: 'Über Uns', path: '/about' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'Karriere', path: '/careers' },
    { name: 'Kontakt', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-between items-center h-20">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://i.imgur.com/bJnPIVv.png" 
                alt="AMCD Logo" 
                className="h-16 w-auto object-contain group-hover:scale-105 transition-all duration-300"
              />
            </Link>
          </div>

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

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-xl">
                      <User size={16} />
                      <span className="max-w-32 truncate">{user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Abmelden
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 group"
                >
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  Projekt starten
                </Link>
              </div>
            )}
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
              
              {user ? (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl text-left"
                  >
                    <LogOut size={16} />
                    Abmelden
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full mt-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                  >
                    Projekt starten
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
