import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Clock, Users, GraduationCap, Briefcase, Heart, TrendingUp, Lightbulb, Coffee, Star, Shield, Lock, Zap, Globe, Award, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  vorname: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  nachname: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(10, 'Telefonnummer muss mindestens 10 Zeichen lang sein'),
  adresse: z.string().min(5, 'Bitte geben Sie Ihre Adresse an'),
  plz: z.string().min(4, 'PLZ muss mindestens 4 Zeichen lang sein'),
  stadt: z.string().min(2, 'Bitte geben Sie Ihre Stadt an'),
  staatsangehoerigkeit: z.string().min(2, 'Bitte geben Sie Ihre Staatsangehörigkeit an'),
  cv: z.any().refine((files) => files?.length > 0, 'Bitte laden Sie Ihren Lebenslauf hoch'),
  anschreiben: z.any().refine((files) => files?.length > 0, 'Bitte laden Sie Ihr Anschreiben hoch'),
  datenschutz: z.boolean().refine((val) => val === true, 'Sie müssen den Datenschutzbestimmungen zustimmen'),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      vorname: '',
      nachname: '',
      email: '',
      phone: '',
      adresse: '',
      plz: '',
      stadt: '',
      staatsangehoerigkeit: '',
      datenschutz: false,
    },
  });

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Bewerbung erfolgreich eingereicht!",
      description: "Wir melden uns innerhalb von 5 Werktagen bei Ihnen.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Work-Life-Balance',
      description: 'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten für eine perfekte Balance zwischen Studium und Arbeit.',
      gradient: 'from-pink-500 to-rose-500',
      featured: true
    },
    {
      icon: Rocket,
      title: 'Schnelle Karriereentwicklung',
      description: 'Individuelle Weiterbildungsmöglichkeiten und Mentoring für Ihren beruflichen Werdegang.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Junges Team',
      description: 'Arbeiten Sie in einem dynamischen, kreativen Team mit flachen Hierarchien und offener Kommunikation.',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Innovative Projekte',
      description: 'Arbeiten Sie an spannenden Digital Marketing Projekten für namhafte Kunden und sammeln Sie wertvolle Erfahrungen.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Internationale Erfahrung',
      description: 'Arbeiten Sie mit internationalen Kunden und erweitern Sie Ihren kulturellen und sprachlichen Horizont.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Faire Vergütung & Benefits',
      description: 'Attraktive Vergütung, moderne Arbeitsplätze, kostenlose Getränke und eine inspirierende Arbeitsatmosphäre.',
      gradient: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Werde Teil unseres <span className="text-primary-500">Teams</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
            Starte deine Karriere im Digital Marketing und sammle wertvolle Praxiserfahrung 
            in einem innovativen Umfeld.
          </p>
        </div>
      </section>

      {/* Stellenanzeige und Bewerbungsformular - Verbundene Karten */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Connected Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Linke Spalte - Stellenanzeige */}
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 lg:p-12">
                <div className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">
                        Digital Marketing Werkstudent (m/w/d)
                      </h2>
                      <p className="text-lg text-gray-600">
                        Unterstütze unser Marketing-Team bei spannenden Projekten
                      </p>
                    </div>
                    <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Werkstudent
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <Clock className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Arbeitszeit</p>
                        <p className="text-gray-600">15-20h/Woche</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Standort</p>
                        <p className="text-gray-600">Berlin / Remote</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Start</p>
                        <p className="text-gray-600">Ab sofort</p>
                      </div>
                    </div>
                  </div>

                  {/* Aufgaben */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Deine Aufgaben</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Erstellung und Pflege von Social Media Content für verschiedene Plattformen
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Content Creation: Texte, Grafiken und Videos für Marketing-Kampagnen
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Analyse und Reporting von Marketing-KPIs und Social Media Metriken
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Unterstützung bei der Planung und Umsetzung von Marketing-Strategien
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Marktrecherche und Competitor-Analyse
                      </li>
                    </ul>
                  </div>

                  {/* Anforderungen */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Das bringst du mit</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Immatrikulierter Student (vorzugsweise Marketing, BWL, Kommunikation oder ähnlich)
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Grundkenntnisse im Digital Marketing und Social Media
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Kreativität und Gespür für Trends
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Sehr gute Deutsch- und Englischkenntnisse
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Zuverlässigkeit und eigenständige Arbeitsweise
                      </li>
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Das bieten wir</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Flexible Arbeitszeiten</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Homeoffice-Möglichkeit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Weiterbildungsmöglichkeiten</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Modernes, junges Team</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Faire Vergütung</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-600">Übernahmechancen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rechte Spalte - Bewerbungsformular */}
              <div className="p-8 lg:p-12 bg-white">
                <div className="h-full flex flex-col">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Jetzt bewerben
                    </h2>
                    <p className="text-xl text-gray-600">
                      Sende uns deine Bewerbung und werde Teil unseres Teams
                    </p>
                  </div>

                  <div className="flex-grow">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
                        <div className="space-y-6">
                          {/* Persönliche Daten */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="vorname"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Vorname *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ihr Vorname" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="nachname"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nachname *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ihr Nachname" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-Mail-Adresse *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Ihre E-Mail-Adresse" {...field} />
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
                                    <Input placeholder="Ihre Telefonnummer" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Adresse */}
                          <FormField
                            control={form.control}
                            name="adresse"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Adresse *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ihre Adresse" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="plz"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>PLZ *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ihre PLZ" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="stadt"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Stadt *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ihre Stadt" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="staatsangehoerigkeit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Staatsangehörigkeit *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ihre Staatsangehörigkeit" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* File Uploads */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="cv"
                              render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                  <FormLabel>Lebenslauf (PDF) *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e) => onChange(e.target.files)}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="anschreiben"
                              render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                  <FormLabel>Anschreiben (PDF) *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e) => onChange(e.target.files)}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="datenschutz"
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
                                    Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu *
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full mt-6" 
                          disabled={isSubmitting}
                          size="lg"
                        >
                          {isSubmitting ? 'Bewerbung wird eingereicht...' : 'Bewerbung einreichen'}
                        </Button>

                        {/* Sichere Übertragung Animation */}
                        <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <Shield className="w-5 h-5 text-green-500" />
                              <div className="absolute inset-0 animate-ping">
                                <Shield className="w-5 h-5 text-green-300 opacity-75" />
                              </div>
                            </div>
                            <span>SSL-verschlüsselt</span>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-green-500" />
                            <span>Sichere Übertragung</span>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum bei uns arbeiten - New Modern Design */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Lightbulb className="w-4 h-4 mr-2" />
              Warum GAgency?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Mehr als nur ein Job –
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Deine Zukunft beginnt hier
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Entdecken Sie, warum unsere Werkstudenten und Alumni GAgency als Sprungbrett 
              für ihre erfolgreiche Karriere im Digital Marketing gewählt haben.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Benefit - Full Width */}
            <div className="lg:col-span-3 mb-8">
              {benefits.filter(benefit => benefit.featured).map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 lg:p-12 overflow-hidden transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <benefit.icon className="text-white" size={32} />
                        </div>
                        <div className="ml-6">
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            {benefit.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                            <span className="text-primary-600 font-medium">Unser Top-Benefit</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    
                    {/* Visual Element */}
                    <div className="relative">
                      <div className={`w-full h-64 bg-gradient-to-br ${benefit.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-24 h-24 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <benefit.icon className="text-white" size={48} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-3 h-3 bg-primary-500 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-40"></div>
                </div>
              ))}
            </div>

            {/* Regular Benefits */}
            {benefits.filter(benefit => !benefit.featured).map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 overflow-hidden transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <benefit.icon className="text-white" size={28} />
                  </div>
                  {/* Micro Animation Dots */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-lg animate-ping"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.gradient} w-0 group-hover:w-full transition-all duration-500`}></div>

                {/* Floating Decorative Elements */}
                <div className="absolute top-4 right-4 w-1 h-1 bg-gray-300 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute bottom-4 right-6 w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s' }}></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="inline-flex items-center space-x-4 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Jetzt verfügbar</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <p className="text-gray-600">
                Starten Sie Ihre Karriere noch heute
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
