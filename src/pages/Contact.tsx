import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import { ModernContactForm } from '@/components/forms/ModernContactForm';

const Contact = () => {
  const handleFormSuccess = () => {
    console.log('Form submitted successfully!');
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
              <ModernContactForm onSuccess={handleFormSuccess} />
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
                      <a href="mailto:info@ingenio-europe.de" className="text-primary-600 hover:text-primary-700 hover:underline transition-all duration-200">
                        info@ingenio-europe.de
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
                      <a href="tel:+493023258380" className="text-primary-600 hover:text-primary-700 hover:underline transition-all duration-200">
                        +49 30 23258380
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
                        Max-Dohrn-Str. 8-10<br />
                        10589 Berlin<br />
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
