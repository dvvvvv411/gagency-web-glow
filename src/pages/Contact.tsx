
import { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Lassen Sie uns <span className="text-primary">sprechen</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Haben Sie ein Projekt im Kopf? Wir freuen uns darauf, Ihre Ideen in die Realität umzusetzen.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Schreiben Sie uns
              </h2>
              
              {isSubmitted ? (
                <Card className="p-8 bg-green-50 border-green-200">
                  <CardContent className="p-0 text-center">
                    <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Vielen Dank für Ihre Nachricht!
                    </h3>
                    <p className="text-green-700">
                      Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-8">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-Mail *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Nachricht *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full"
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
                          className="mt-1"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
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
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">E-Mail</h3>
                      <a href="mailto:info@gagency.de" className="text-primary hover:underline">
                        info@gagency.de
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefon</h3>
                      <a href="tel:+492111234567" className="text-primary hover:underline">
                        +49 211 123 456 7
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={24} />
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
              <Card className="p-8 bg-primary text-white">
                <CardContent className="p-0 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Kostenlose Erstberatung
                  </h3>
                  <p className="mb-6 opacity-90">
                    Lassen Sie uns Ihr Projekt besprechen. 30 Minuten kostenloses Beratungsgespräch.
                  </p>
                  <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    Termin vereinbaren
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besuchen Sie uns
            </h2>
            <p className="text-xl text-gray-600">
              Mitten im Herzen von Düsseldorf
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 text-lg font-medium">
                  Google Maps wird hier eingebettet
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Königsallee 27, 40212 Düsseldorf
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
