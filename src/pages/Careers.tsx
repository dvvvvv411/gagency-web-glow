
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Clock, Users, GraduationCap, Briefcase, Star, Shield, Lock, TestTube, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import BenefitsSlider from '@/components/BenefitsSlider';
import ConfettiPopup from '@/components/ConfettiPopup';

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
  anschreiben: z.any().optional(),
  datenschutz: z.boolean().refine((val) => val === true, 'Sie müssen den Datenschutzbestimmungen zustimmen'),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

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

  const uploadFile = async (file: File, type: 'cv' | 'anschreiben', applicantName: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicantName}_${type}_${Date.now()}.${fileExt}`;
    
    console.log(`Starting upload for ${type}:`, fileName);
    
    const { data, error } = await supabase.storage
      .from('application-documents')
      .upload(fileName, file);

    if (error) {
      console.error(`Error uploading ${type}:`, error);
      throw error;
    }

    console.log(`Successfully uploaded ${type}:`, data.path);
    return data.path;
  };

  const sendConfirmationEmailAsync = async (applicationId: string, vorname: string, nachname: string, email: string) => {
    try {
      console.log('Starting async email send for application:', applicationId);
      
      const { data, error } = await supabase.functions.invoke('send-application-confirmation', {
        body: {
          applicantEmail: email,
          applicantName: `${vorname} ${nachname}`,
          type: 'confirmation',
        },
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
      } else {
        console.log('Confirmation email sent successfully for application:', applicationId);
      }
    } catch (error) {
      console.error('Error in async email send:', error);
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    setUploadProgress('Bewerbung wird verarbeitet...');
    
    try {
      const applicantName = `${data.vorname}_${data.nachname}`.replace(/\s+/g, '_');
      
      // Step 1: Upload files first
      setUploadProgress('Dateien werden hochgeladen...');
      console.log('Starting file uploads...');
      
      const cvFile = data.cv[0];
      const anschreibenFile = data.anschreiben?.[0];
      
      const uploadPromises = [
        uploadFile(cvFile, 'cv', applicantName)
      ];
      
      if (anschreibenFile) {
        uploadPromises.push(uploadFile(anschreibenFile, 'anschreiben', applicantName));
      }

      const uploadResults = await Promise.all(uploadPromises);
      const cvPath = uploadResults[0];
      const anschreibenPath = uploadResults[1] || null;

      console.log('File uploads completed:', { cvPath, anschreibenPath });

      // Step 2: Save application to database with file paths
      setUploadProgress('Bewerbung wird gespeichert...');
      console.log('Saving application to database...');
      
      const { data: applicationData, error: dbError } = await supabase
        .from('job_applications')
        .insert({
          vorname: data.vorname,
          nachname: data.nachname,
          email: data.email,
          phone: data.phone,
          adresse: data.adresse,
          plz: data.plz,
          stadt: data.stadt,
          staatsangehoerigkeit: data.staatsangehoerigkeit,
          cv_file_path: cvPath,
          anschreiben_file_path: anschreibenPath,
          status: 'neu'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      const applicationId = applicationData.id;
      console.log('Application saved with ID:', applicationId);

      // Step 3: Show immediate success feedback
      setUploadProgress('');
      setShowSuccessPopup(true);
      form.reset();

      // Step 4: Send email asynchronously in the background (non-blocking)
      console.log('Starting background email send...');
      sendConfirmationEmailAsync(applicationId, data.vorname, data.nachname, data.email);

      toast({
        title: "Bewerbung erfolgreich eingereicht!",
        description: "Ihre Bewerbung wurde erfolgreich eingereicht. Sie erhalten in Kürze eine Bestätigungs-E-Mail.",
        variant: "default",
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      setUploadProgress('');
      
      toast({
        title: "Fehler beim Einreichen der Bewerbung",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
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
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-primary-50">
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
                        Assistenz im digitalen Projektmanagement (m/w/d)
                      </h2>
                      <p className="text-lg text-gray-600">
                        Bringe Ordnung in unsere Abläufe und unterstütze bei digitalen Projekten
                      </p>
                    </div>
                    <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Minijob
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <Clock className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Arbeitszeit</p>
                        <p className="text-gray-600">10h/Woche</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Standort</p>
                        <p className="text-gray-600">München / Remote</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Start</p>
                        <p className="text-gray-600">Ab sofort</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Euro className="text-primary-500" size={20} />
                      <div>
                        <p className="font-medium">Gehalt</p>
                        <p className="text-gray-600">556€ pro Monat</p>
                      </div>
                    </div>
                  </div>

                  {/* Aufgaben */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Deine Aufgaben</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Du arbeitest mit an der Koordination kleiner Webprojekte und bringst Ordnung in unsere Abläufe
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Du recherchierst digitale Tools, neue Online-Trends und Weblösungen
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Du unterstützt bei der Erstellung von Projektplänen, Briefings und Präsentationen
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Du stimmst dich mit unserem Team und gelegentlich auch mit Kund:innen ab
                      </li>
                      <li className="flex items-start">
                        <Star className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Du übernimmst organisatorische Aufgaben und sorgst dafür, dass nichts untergeht
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Das bringst du mit</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Interesse an Websites, digitalen Produkten und Online-Tools
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Strukturierte und zuverlässige Arbeitsweise – du behältst gerne den Überblick
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Sicherer Umgang mit gängigen Tools wie Google Workspace, MS Office o. ä.
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Offenheit, Neues zu lernen und eigenständig Aufgaben umzusetzen
                      </li>
                      <li className="flex items-start">
                        <GraduationCap className="text-primary-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        Gute schriftliche Ausdrucksweise und Kommunikation
                      </li>
                    </ul>
                  </div>

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
                  {/* Logo centered above form */}
                  <div className="flex justify-center mb-8">
                    <img 
                      src="https://i.imgur.com/bJnPIVv.png" 
                      alt="AMCD Logo" 
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Jetzt bewerben
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
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

                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="cv"
                              render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                  <FormLabel>Lebenslauf (PDF) *</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...fieldProps}
                                      type="file"
                                      accept=".pdf"
                                      onChange={(event) => {
                                        onChange(event.target.files);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="anschreiben"
                              render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                  <FormLabel>Anschreiben (PDF)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...fieldProps}
                                      type="file"
                                      accept=".pdf"
                                      onChange={(event) => {
                                        onChange(event.target.files);
                                      }}
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

                        {/* Progress indicator */}
                        {uploadProgress && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-blue-700 font-medium">{uploadProgress}</span>
                            </div>
                          </div>
                        )}

                        <Button 
                          type="submit" 
                          className="w-full mt-6" 
                          disabled={isSubmitting}
                          size="lg"
                        >
                          {isSubmitting ? 'Bewerbung wird eingereicht...' : 'Bewerbung einreichen'}
                        </Button>

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

      <BenefitsSlider />
      
      {/* Success Popup with Confetti */}
      <ConfettiPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
    </div>
  );
};

export default Careers;
