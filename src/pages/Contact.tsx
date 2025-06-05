
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would normally send the form data to your backend
    // This is a mock implementation
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.',
      });

      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Kontaktieren Sie <span className="text-primary-500">uns</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Haben Sie Fragen oder möchten ein Projekt besprechen? Kontaktieren Sie uns und wir melden uns bei Ihnen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Kontaktinformationen
              </h2>
              <p className="text-gray-600 mb-8">
                Wir freuen uns darauf, von Ihnen zu hören. Sie können uns telefonisch, 
                per E-Mail oder über das Kontaktformular erreichen.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Besuchen Sie uns</h3>
                    <p className="text-gray-600">
                      Musterstraße 123<br />
                      10115 Berlin, Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">E-Mail</h3>
                    <a href="mailto:info@gagency.de" className="text-primary-600 hover:underline">
                      info@gagency.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                    <a href="tel:+4930123456789" className="text-primary-600 hover:underline">
                      +49 30 123 456 789
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Placeholder */}
              <div className="mt-12">
                <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                  {/* In a real implementation, you would embed a Google Maps iframe here */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Google Maps wird hier eingebettet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Schreiben Sie uns
              </h2>
              <div className="bg-gray-50 p-8 rounded-lg">
                {formStatus.submitted ? (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-green-800 font-semibold text-lg mb-2">Nachricht gesendet!</h3>
                    <p className="text-green-700">{formStatus.message}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-Mail*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Unternehmen
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Dienstleistung
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="web-development">Webentwicklung</option>
                        <option value="design">UI/UX Design</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="marketing">Online Marketing</option>
                        <option value="other">Sonstiges</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Nachricht*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors duration-200"
                      >
                        Nachricht senden
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hier finden Sie Antworten auf häufig gestellte Fragen.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Wie läuft ein typisches Projekt bei GAgency ab?
                </h3>
                <p className="text-gray-600">
                  Ein Projekt beginnt mit einem Beratungsgespräch, bei dem wir Ihre Anforderungen und Ziele besprechen. 
                  Anschließend erstellen wir ein Konzept und nach Ihrer Zustimmung beginnen wir mit der Umsetzung. 
                  Während des gesamten Prozesses halten wir Sie auf dem Laufenden und liefern regelmäßige Updates.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Wie lange dauert die Entwicklung einer Website?
                </h3>
                <p className="text-gray-600">
                  Die Dauer hängt von der Komplexität des Projekts ab. Eine einfache Website kann in 2-4 Wochen 
                  erstellt werden, während komplexe Projekte mehrere Monate dauern können. Wir erstellen einen 
                  detaillierten Zeitplan für jedes Projekt und halten uns an vereinbarte Deadlines.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Was kostet eine Website oder Webanwendung?
                </h3>
                <p className="text-gray-600">
                  Die Kosten variieren je nach Umfang und Komplexität des Projekts. Wir erstellen individuelle 
                  Angebote basierend auf Ihren spezifischen Anforderungen. Kontaktieren Sie uns für ein 
                  unverbindliches Beratungsgespräch und ein maßgeschneidertes Angebot.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Bieten Sie auch Wartung und Support nach dem Launch an?
                </h3>
                <p className="text-gray-600">
                  Ja, wir bieten verschiedene Wartungs- und Support-Pakete an, um sicherzustellen, dass Ihre Website 
                  oder Anwendung optimal funktioniert und aktuell bleibt. Unser Team steht Ihnen auch nach dem Launch 
                  zur Verfügung, um Fragen zu beantworten und bei Bedarf Updates vorzunehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
