
import { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';
import FluidBackground from '@/components/backgrounds/FluidBackground';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '', privacy: false });
    }, 1000);
  };

  return (
    <FluidBackground className="min-h-screen pt-16">
      {/* Hero Section */}
      <AnimatedSection className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Lassen Sie uns <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">sprechen</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Haben Sie ein Projekt im Kopf? Wir freuen uns darauf, Ihre Ideen in die Realität umzusetzen.
          </p>
        </div>
      </AnimatedSection>

      {/* Contact Form & Info */}
      <AnimatedSection className="py-20" animation="fade-up" delay={200}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Schreiben Sie uns
              </h2>
              
              {isSubmitted ? (
                <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0 text-center">
                    <CheckCircle className="mx-auto mb-4 text-green-600 animate-bounce" size={48} />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Vielen Dank für Ihre Nachricht!
                    </h3>
                    <p className="text-green-700">
                      Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-8 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-primary-600 transition-colors">
                          Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-300"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-primary-600 transition-colors">
                          E-Mail *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-300"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-primary-600 transition-colors">
                          Nachricht *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-primary-300"
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                          checked={formState.privacy}
                          onChange={handleInputChange}
                          required
                          className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-primary-500"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        disabled={!formState.privacy}
                      >
                        Nachricht senden
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Kontaktinformationen
              </h2>
              
              <div className="space-y-6 mb-12">
                <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">E-Mail</h3>
                      <a href="mailto:info@gagency.de" className="text-primary-600 hover:text-primary-700 hover:underline transition-all duration-200">
                        info@gagency.de
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefon</h3>
                      <a href="tel:+492111234567" className="text-primary-600 hover:text-primary-700 hover:underline transition-all duration-200">
                        +49 211 123 456 7
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        Königsallee 27<br />
                        40212 Düsseldorf<br />
                        Deutschland
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Call-to-Action */}
              <Card className="p-8 bg-gradient-to-br from-primary-600 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Kostenlose Erstberatung
                  </h3>
                  <p className="mb-6 opacity-90">
                    Lassen Sie uns Ihr Projekt besprechen. 30 Minuten kostenloses Beratungsgespräch.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-primary-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Termin vereinbaren
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </FluidBackground>
  );
};

export default Contact;
