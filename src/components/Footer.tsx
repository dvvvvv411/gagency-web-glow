import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Column 1: Logo and Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/ingenio-logo.png" 
                alt="INGENIO Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4">
              Moderne Weblösungen für Unternehmen jeder Größe. Wir entwickeln digitale Projekte, die Eindruck machen.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Webentwicklung</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">E-Commerce</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Mobile Apps</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">SEO Optimierung</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Startseite</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Über Uns</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Dienstleistungen</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Karriere</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">Kontakt</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary-500 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-600">Rubensstr. 13<br />81245 München, Deutschland</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary-500" size={18} />
                <a href="tel:+498941435250" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">+49 89 41435250</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary-500" size={18} />
                <a href="mailto:info@amcd-agentur.de" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">info@amcd-agentur.de</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} AMCD Consult GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/impressum" className="text-gray-600 hover:text-primary-600 text-sm">Impressum</Link>
              <Link to="/datenschutz" className="text-gray-600 hover:text-primary-600 text-sm">Datenschutz</Link>
              <Link to="/agb" className="text-gray-600 hover:text-primary-600 text-sm">AGB</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
