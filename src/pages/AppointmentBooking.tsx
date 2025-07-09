
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react';

const bookingSchema = z.object({
  date: z.date({
    required_error: "Bitte wählen Sie ein Datum aus",
  }),
  time: z.string().min(1, "Bitte wählen Sie eine Uhrzeit aus"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Application {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  phone: string;
}

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [bookedAppointments, setBookedAppointments] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const applicationId = searchParams.get('application');

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  // Available time slots (9 AM to 5 PM, 30-minute intervals)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  useEffect(() => {
    if (!applicationId) {
      navigate('/');
      return;
    }
    fetchApplicationData();
    fetchBookedAppointments();
  }, [applicationId]);

  const fetchApplicationData = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('id, vorname, nachname, email, phone')
        .eq('id', applicationId)
        .eq('status', 'accepted')
        .single();

      if (error) throw error;
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
      toast({
        title: "Fehler",
        description: "Bewerbung nicht gefunden oder nicht berechtigt.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_date, appointment_time')
        .eq('status', 'scheduled');

      if (error) throw error;

      const bookedDates = data?.map(appointment => 
        new Date(appointment.appointment_date)
      ) || [];
      
      setBookedAppointments(bookedDates);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateAvailableTimes = (selectedDate: Date) => {
    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    // Get appointments for the selected date
    const dateString = selectedDate.toISOString().split('T')[0];
    
    supabase
      .from('appointments')
      .select('appointment_time')
      .eq('appointment_date', dateString)
      .eq('status', 'scheduled')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching appointments for date:', error);
          return;
        }

        const bookedTimes = data?.map(app => app.appointment_time) || [];
        const available = timeSlots.filter(time => !bookedTimes.includes(time));
        setAvailableTimes(available);
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
          notes: data.notes || null,
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

  if (loading) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (success) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <AnimatedSection className="max-w-md mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm text-center">
            <CardHeader>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-600">Termin erfolgreich gebucht!</CardTitle>
              <CardDescription>
                Ihr Telefontermin wurde bestätigt. Sie erhalten eine Bestätigungs-E-Mail mit allen Details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/')} className="w-full">
                Zur Startseite
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </FluidBackground>
    );
  }

  return (
    <FluidBackground className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Telefontermin buchen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buchen Sie Ihren persönlichen Telefontermin für das Bewerbungsgespräch.
          </p>
        </AnimatedSection>

        {application && (
          <AnimatedSection delay={100}>
            <Card className="bg-white/70 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Bewerberdaten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{application.vorname} {application.nachname}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{application.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{application.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        <AnimatedSection delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Termin auswählen
              </CardTitle>
              <CardDescription>
                Wählen Sie ein Datum und eine Uhrzeit für Ihr Telefoninterview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Datum auswählen</FormLabel>
                          <FormControl>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                if (date) updateAvailableTimes(date);
                              }}
                              disabled={isDateDisabled}
                              className="rounded-md border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verfügbare Uhrzeiten</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                {availableTimes.map((time) => (
                                  <Button
                                    key={time}
                                    type="button"
                                    variant={field.value === time ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => field.onChange(time)}
                                    className="justify-start"
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            </FormControl>
                            {form.watch('date') && availableTimes.length === 0 && (
                              <p className="text-sm text-gray-500">
                                Keine verfügbaren Termine für diesen Tag.
                              </p>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anmerkungen (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Besondere Wünsche oder Anmerkungen..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <CalendarIcon className="h-4 w-4 mr-2" />
                    )}
                    Termin buchen
                  </Button>
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
