
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Clock, Users, Award, Heart, BookOpen, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein'),
  university: z.string().min(2, 'Universität/Hochschule ist erforderlich'),
  studyField: z.string().min(2, 'Studienrichtung ist erforderlich'),
  semester: z.string().min(1, 'Semester ist erforderlich'),
  experience: z.string().min(50, 'Bitte beschreiben Sie Ihre Erfahrungen (mindestens 50 Zeichen)'),
  motivation: z.string().min(100, 'Bitte erläutern Sie Ihre Motivation (mindestens 100 Zeichen)'),
  availability: z.string().min(10, 'Verfügbarkeit ist erforderlich'),
  portfolio: z.string().url('Bitte geben Sie eine gültige URL ein').optional().or(z.literal('')),
  dataProtection: z.boolean().refine(val => val, 'Sie müssen der Datenschutzerklärung zustimmen'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const Careers = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      university: '',
      studyField: '',
      semester: '',
      experience: '',
      motivation: '',
      availability: '',
      portfolio: '',
      dataProtection: false,
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    toast({
      title: "Bewerbung erfolgreich eingereicht!",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
  };

  const benefits = [
    {
      icon: Users,
      title: 'Mentorship & Guidance',
      description: 'Persönliche Betreuung durch erfahrene Marketing-Profis und regelmäßige Feedback-Gespräche.'
    },
    {
      icon: Award,
      title: 'Praktische Erfahrung',
      description: 'Arbeiten Sie an echten Kundenprojekten und sammeln Sie wertvolle Praxis-Erfahrungen.'
    },
    {
      icon: BookOpen,
      title: 'Weiterbildung',
      description: 'Zugang zu Online-Kursen, Workshops und Branchenveranstaltungen für Ihre persönliche Entwicklung.'
    },
    {
      icon: Heart,
      title: 'Flexible Arbeitszeiten',
      description: 'Studienfreundliche Arbeitszeiten mit der Möglichkeit für Remote-Arbeit und flexibler Zeitplanung.'
    },
    {
      icon: Clock,
      title: 'Work-Life-Balance',
      description: 'Verständnis für Ihre Studienanforderungen mit anpassbaren Arbeitszeiten während Prüfungsphasen.'
    },
    {
      icon: CheckCircle,
      title: 'Faire Vergütung',
      description: 'Attraktive Vergütung auf Stundenbasis plus Leistungsboni für herausragende Ergebnisse.'
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Vielen Dank für Ihre Bewerbung!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Wir haben Ihre Bewerbung erhalten und werden uns in den nächsten Tagen bei Ihnen melden.
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
            variant="outline"
          >
            Neue Bewerbung einreichen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium mb-6">
              <Users size={16} className="mr-2" />
              Wir stellen ein
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Digital Marketing <span className="text-primary-600">Werkstudent</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Starten Sie Ihre Karriere im digitalen Marketing und sammeln Sie wertvolle Praxiserfahrungen 
              in einem dynamischen Agentur-Umfeld.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-primary-600" />
                Berlin / Remote
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-primary-600" />
                15-20 Stunden/Woche
              </div>
              <div className="flex items-center">
                <Award size={16} className="mr-2 text-primary-600" />
                12-15€ / Stunde
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Was Sie erwartet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ihre Aufgaben:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Unterstützung bei der Erstellung und Optimierung von Social Media Kampagnen
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Content-Erstellung für verschiedene digitale Kanäle
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Marktanalysen und Wettbewerbsbeobachtung
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        SEO/SEA Kampagnen-Management
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Reporting und Performance-Analyse
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Das bringen Sie mit:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Studium in Marketing, Kommunikation, BWL oder ähnlichem
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Erste Erfahrungen im digitalen Marketing (Praktika, Projekte)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Sehr gute Deutsch- und Englischkenntnisse
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Kreativität und analytisches Denkvermögen
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Teamfähigkeit und Eigeninitiative
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Jetzt bewerben</CardTitle>
                  <CardDescription>
                    Füllen Sie das Formular aus und starten Sie Ihre Karriere bei GAgency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vorname *</FormLabel>
                              <FormControl>
                                <Input placeholder="Max" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nachname *</FormLabel>
                              <FormControl>
                                <Input placeholder="Mustermann" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-Mail *</FormLabel>
                            <FormControl>
                              <Input placeholder="max.mustermann@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefonnummer *</FormLabel>
                            <FormControl>
                              <Input placeholder="+49 123 456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="university"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Universität/Hochschule *</FormLabel>
                              <FormControl>
                                <Input placeholder="Humboldt-Universität" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="semester"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Aktuelles Semester *</FormLabel>
                              <FormControl>
                                <Input placeholder="5. Semester" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="studyField"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Studienrichtung *</FormLabel>
                            <FormControl>
                              <Input placeholder="BWL, Marketing, Kommunikation..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bisherige Erfahrungen im Marketing *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Beschreiben Sie Ihre bisherigen Erfahrungen im Marketing (Praktika, Projekte, Kurse...)." 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motivation *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Warum möchten Sie bei GAgency als Werkstudent arbeiten? Was interessiert Sie am digitalen Marketing?" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verfügbarkeit *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Wann können Sie anfangen? Wie viele Stunden pro Woche können Sie arbeiten?" 
                                className="min-h-[80px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio/LinkedIn (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormDescription>
                              Link zu Ihrem Portfolio, LinkedIn-Profil oder anderen relevanten Arbeiten
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dataProtection"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Ich stimme der Datenschutzerklärung zu *
                              </FormLabel>
                              <FormDescription>
                                Ihre Daten werden nur für den Bewerbungsprozess verwendet und nicht an Dritte weitergegeben.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" size="lg">
                        <Send size={18} className="mr-2" />
                        Bewerbung abschicken
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum bei uns arbeiten?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entdecken Sie die Vorteile einer Werkstudententätigkeit bei GAgency und 
              starten Sie Ihre Karriere im digitalen Marketing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
