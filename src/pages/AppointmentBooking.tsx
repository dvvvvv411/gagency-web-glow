import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const bookingSchema = z.object({
  date: z.date({
    required_error: "Bitte wählen Sie ein Datum aus",
  }),
  time: z.string().min(1, "Bitte wählen Sie eine Uhrzeit aus"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Application {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  phone: string;
}

interface TimeSlotInfo {
  time: string;
  isAvailable: boolean;
  reason?: 'booked' | 'past';
}

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const applicationId = searchParams.get('applicationId');

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  // Base time slots (9 AM to 5 PM, 30-minute intervals)
  const baseTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  useEffect(() => {
    if (!applicationId) {
      setError("Keine Bewerbungs-ID gefunden. Bitte verwenden Sie den Link aus Ihrer E-Mail.");
      setLoading(false);
      return;
    }
    fetchApplicationData();
    fetchBookedAppointments();
  }, [applicationId]);

  const fetchApplicationData = async () => {
    try {
      console.log('Fetching application with ID:', applicationId);
      const { data, error } = await supabase
        .from('job_applications')
        .select('id, vorname, nachname, email, phone')
        .eq('id', applicationId)
        .eq('status', 'angenommen')
        .single();

      if (error) {
        console.error('Error fetching application:', error);
        throw error;
      }
      
      console.log('Application data:', data);
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
      setError("Bewerbung nicht gefunden oder nicht berechtigt für Terminbuchung.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_date, appointment_time');

      if (error) throw error;
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateTimeSlots = (selectedDate: Date) => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const now = new Date();
    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === now.toDateString();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
    
    supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', dateString)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching appointments for date:', error);
          return;
        }

        const bookedTimes = data?.map(app => app.appointment_time) || [];
        
        const slotsWithAvailability: TimeSlotInfo[] = baseTimeSlots.map(time => {
          const [hours, minutes] = time.split(':').map(Number);
          const slotTime = hours * 60 + minutes; // minutes since midnight
          
          let isAvailable = true;
          let reason: 'booked' | 'past' | undefined;

          // Check if time slot is booked
          if (bookedTimes.includes(time)) {
            isAvailable = false;
            reason = 'booked';
          }
          // Check if time slot is in the past (only for today)
          else if (isToday && slotTime <= currentTime) {
            isAvailable = false;
            reason = 'past';
          }

          return {
            time,
            isAvailable,
            reason
          };
        });

        setTimeSlots(slotsWithAvailability);
      });
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!application) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          application_id: application.id,
          appointment_date: data.date.toISOString().split('T')[0],
          appointment_time: data.time,
          applicant_name: `${application.vorname} ${application.nachname}`,
          applicant_email: application.email,
        });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Termin gebucht",
        description: "Ihr Termin wurde erfolgreich gebucht. Sie erhalten eine Bestätigungs-E-Mail.",
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Buchen des Termins. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates and weekends
    if (date < today || date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }

    return false;
  };

  const getTimeSlotButtonStyle = (slot: TimeSlotInfo, isSelected: boolean) => {
    if (!slot.isAvailable) {
      return "h-14 w-full text-base font-medium bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 justify-center items-center";
    }
    
    if (isSelected) {
      return "h-14 w-full text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 justify-center items-center";
    }
    
    return "h-14 w-full text-base font-medium border-input bg-background hover:bg-accent hover:text-accent-foreground justify-center items-center";
  };

  const getTimeSlotTooltip = (slot: TimeSlotInfo) => {
    if (slot.reason === 'booked') return 'Dieser Termin ist bereits gebucht';
    if (slot.reason === 'past') return 'Dieser Zeitpunkt liegt in der Vergangenheit';
    return 'Verfügbar - Klicken Sie zum Auswählen';
  };

  if (loading) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-xl border-0">
          <CardContent className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (error) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <AnimatedSection className="max-w-lg mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-md shadow-xl border-0 text-center">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-600">Zugang nicht möglich</CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button onClick={() => navigate('/')} className="w-full" size="lg">
                Zur Startseite
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </FluidBackground>
    );
  }

  if (success) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <AnimatedSection className="max-w-lg mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-md shadow-xl border-0 text-center">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600 mb-2">Termin erfolgreich gebucht!</CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Ihr Telefontermin wurde bestätigt. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="bg-green-50 rounded-lg p-4 text-left">
                <p className="text-sm text-green-800 font-medium">Nächste Schritte:</p>
                <p className="text-sm text-green-700 mt-1">
                  Halten Sie sich bitte zum gebuchten Termin telefonisch bereit. Wir rufen Sie an.
                </p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full" size="lg">
                Zur Startseite
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </FluidBackground>
    );
  }

  return (
    <FluidBackground className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Telefontermin buchen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vereinbaren Sie Ihren persönlichen Telefontermin für das Bewerbungsgespräch
          </p>
        </AnimatedSection>

        {application && (
          <AnimatedSection delay={100} className="mb-8">
            <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Ihre Bewerberdaten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{application.vorname} {application.nachname}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">E-Mail</p>
                      <p className="font-medium text-gray-900">{application.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="font-medium text-gray-900">{application.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        <AnimatedSection delay={200}>
          <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-5 w-5 text-green-600" />
                </div>
                Termin auswählen
              </CardTitle>
              <CardDescription className="text-base">
                Wählen Sie einen passenden Termin für Ihr Telefoninterview aus.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Calendar Section */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              Datum auswählen
                            </FormLabel>
                            <FormControl>
                              <div className="bg-white rounded-lg border shadow-sm">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    if (date) updateTimeSlots(date);
                                  }}
                                  disabled={isDateDisabled}
                                  className="rounded-lg"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Uhrzeiten
                            </FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                {form.watch('date') ? (
                                  timeSlots.length > 0 ? (
                                    <>
                                      <TooltipProvider>
                                        <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                                          {timeSlots.map((slot) => (
                                            <Tooltip key={slot.time}>
                                              <TooltipTrigger asChild>
                                                <div>
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={!slot.isAvailable}
                                                    onClick={() => slot.isAvailable && field.onChange(slot.time)}
                                                    className={getTimeSlotButtonStyle(slot, field.value === slot.time)}
                                                  >
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    {slot.time}
                                                  </Button>
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>{getTimeSlotTooltip(slot)}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          ))}
                                        </div>
                                      </TooltipProvider>
                                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 bg-primary rounded"></div>
                                          <span>Verfügbar</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 bg-gray-300 rounded"></div>
                                          <span>Nicht verfügbar</span>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                      <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                      <p className="text-gray-500">Keine Termine für diesen Tag verfügbar</p>
                                    </div>
                                  )
                                ) : (
                                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <CalendarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">Bitte wählen Sie zuerst ein Datum aus</p>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button 
                      type="submit" 
                      disabled={submitting || !form.watch('date') || !form.watch('time')}
                      className="w-full h-14 text-lg font-semibold"
                      size="lg"
                    >
                      {submitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      ) : (
                        <CalendarIcon className="h-5 w-5 mr-3" />
                      )}
                      {submitting ? 'Termin wird gebucht...' : 'Termin jetzt buchen'}
                      {!submitting && <ArrowRight className="h-5 w-5 ml-3" />}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </FluidBackground>
  );
};

export default AppointmentBooking;
