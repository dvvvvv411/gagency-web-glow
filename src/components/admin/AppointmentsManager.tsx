
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, Edit, ExternalLink, Copy } from 'lucide-react';

interface Appointment {
  id: string;
  application_id: string;
  appointment_date: string;
  appointment_time: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          job_applications(phone)
        `)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;

      // Transform data to include phone numbers
      const appointmentsWithPhone = (data || []).map(appointment => ({
        ...appointment,
        applicant_phone: appointment.job_applications?.phone
      }));

      // Find the next upcoming appointment
      const now = new Date();
      const upcoming = appointmentsWithPhone.find(appointment => {
        const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
        return appointmentDateTime > now && appointment.status === 'scheduled';
      });

      setAppointments(appointmentsWithPhone);
      setNextAppointment(upcoming || null);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Termine.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendCompletionEmail = async (appointment: Appointment) => {
    try {
      console.log('Sending completion email for appointment:', appointment.id);
      
      const { error } = await supabase.functions.invoke('send-application-confirmation', {
        body: {
          applicantEmail: appointment.applicant_email,
          applicantName: appointment.applicant_name,
          appointmentId: appointment.id,
          type: 'appointment_completed'
        }
      });

      if (error) {
        console.error('Error sending completion email:', error);
        throw error;
      }

      console.log('Completion email sent successfully');
      toast({
        title: "E-Mail gesendet",
        description: `Bestätigungs-E-Mail wurde an ${appointment.applicant_name} gesendet.`,
      });
    } catch (error) {
      console.error('Error sending completion email:', error);
      toast({
        title: "E-Mail Fehler",
        description: "Fehler beim Senden der Bestätigungs-E-Mail.",
        variant: "destructive",
      });
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    if (processingIds.has(appointmentId)) return;
    
    setProcessingIds(prev => new Set(prev).add(appointmentId));
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Status aktualisiert",
        description: `Termin-Status wurde auf "${newStatus}" geändert.`,
      });

      // If the appointment is marked as completed, send email
      if (newStatus === 'completed') {
        const appointment = appointments.find(app => app.id === appointmentId);
        if (appointment) {
          await sendCompletionEmail(appointment);
        }
      }

      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren des Termin-Status.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(appointmentId);
        return newSet;
      });
    }
  };

  const copyContractLink = async (appointmentId: string) => {
    const contractUrl = `${window.location.origin}/employment-contract?appointment=${appointmentId}`;
    
    try {
      await navigator.clipboard.writeText(contractUrl);
      toast({
        title: "Link kopiert",
        description: "Der Arbeitsvertrag-Link wurde in die Zwischenablage kopiert.",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Kopieren des Links.",
        variant: "destructive",
      });
    }
  };

  const openContractLink = (appointmentId: string) => {
    const contractUrl = `${window.location.origin}/employment-contract?appointment=${appointmentId}`;
    window.open(contractUrl, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <Calendar className="h-3 w-3 mr-1" />
            Geplant
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Abgeschlossen
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Storniert
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // HH:MM format
  };

  const isUpcoming = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime > new Date();
  };

  const isPast = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime < new Date();
  };

  const formatPhoneNumber = (phone: string) => {
    // Simple phone number formatting for German numbers
    if (!phone) return phone;
    
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 11 && cleaned.startsWith('49')) {
      // +49 xxx xxxx xxxx
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
    } else if (cleaned.length === 10) {
      // 0xxx xxxx xxxx
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
    }
    
    return phone; // Return original if no pattern matches
  };

  return (
    <div className="space-y-6">
      {/* Next Appointment Card */}
      {nextAppointment && (
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Calendar className="h-5 w-5" />
              Nächster Termin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">
                      {formatDate(nextAppointment.appointment_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">
                      {formatTime(nextAppointment.appointment_time)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">
                      {nextAppointment.applicant_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-blue-700">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{nextAppointment.applicant_email}</span>
                    </div>
                    {nextAppointment.applicant_phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{formatPhoneNumber(nextAppointment.applicant_phone)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => updateAppointmentStatus(nextAppointment.id, 'completed')}
                  disabled={processingIds.has(nextAppointment.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {processingIds.has(nextAppointment.id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Abschließen
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => updateAppointmentStatus(nextAppointment.id, 'cancelled')}
                  disabled={processingIds.has(nextAppointment.id)}
                  size="sm"
                  variant="destructive"
                >
                  {processingIds.has(nextAppointment.id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Stornieren
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Appointments Table */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Terminkalender
          </CardTitle>
          <CardDescription>
            Übersicht und Verwaltung aller gebuchten Termine
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Datum & Zeit</TableHead>
                      <TableHead className="min-w-[150px]">Bewerber</TableHead>
                      <TableHead className="min-w-[200px]">E-Mail</TableHead>
                      <TableHead className="min-w-[150px]">Telefonnummer</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Gebucht am</TableHead>
                      <TableHead className="min-w-[200px]">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => {
                      const isAppointmentPast = isPast(appointment.appointment_date, appointment.appointment_time);
                      const isAppointmentUpcoming = isUpcoming(appointment.appointment_date, appointment.appointment_time);
                      
                      return (
                        <TableRow 
                          key={appointment.id} 
                          className={`align-top ${
                            isAppointmentUpcoming && appointment.status === 'scheduled'
                              ? 'bg-blue-50/50' 
                              : isAppointmentPast 
                                ? 'bg-gray-50/80 text-gray-500'
                                : ''
                          }`}
                        >
                          <TableCell className={isAppointmentPast ? 'text-gray-400' : ''}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Calendar className={`h-3 w-3 ${isAppointmentPast ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className="font-medium text-sm">
                                  {formatDate(appointment.appointment_date)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className={`h-3 w-3 ${isAppointmentPast ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className="text-sm">
                                  {formatTime(appointment.appointment_time)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell className={isAppointmentPast ? 'text-gray-400' : ''}>
                            <div className="flex items-center gap-1">
                              <User className={`h-3 w-3 ${isAppointmentPast ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className="font-medium text-sm">
                                {appointment.applicant_name}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell className={isAppointmentPast ? 'text-gray-400' : ''}>
                            <div className="flex items-center gap-1">
                              <Mail className={`h-3 w-3 ${isAppointmentPast ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className="text-sm">{appointment.applicant_email}</span>
                            </div>
                          </TableCell>

                          <TableCell className={isAppointmentPast ? 'text-gray-400' : ''}>
                            <div className="flex items-center gap-1">
                              <Phone className={`h-3 w-3 ${isAppointmentPast ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className="text-sm">
                                {appointment.applicant_phone 
                                  ? formatPhoneNumber(appointment.applicant_phone)
                                  : '-'
                                }
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className={isAppointmentPast ? 'opacity-60' : ''}>
                              {getStatusBadge(appointment.status)}
                            </div>
                          </TableCell>
                          
                          <TableCell className={`text-sm ${isAppointmentPast ? 'text-gray-400' : ''}`}>
                            {new Date(appointment.created_at).toLocaleDateString('de-DE')}
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {appointment.status === 'scheduled' && (
                                <>
                                  <Button
                                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                    disabled={processingIds.has(appointment.id)}
                                    size="sm"
                                    className="text-xs bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    {processingIds.has(appointment.id) ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Abschließen
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                    disabled={processingIds.has(appointment.id)}
                                    size="sm"
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    {processingIds.has(appointment.id) ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                    ) : (
                                      <>
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Stornieren
                                      </>
                                    )}
                                  </Button>
                                </>
                              )}
                              {appointment.status === 'completed' && (
                                <div className="space-y-1">
                                  <span className="text-xs text-green-600 font-medium">
                                    ✓ Abgeschlossen
                                  </span>
                                  <div className="flex gap-1">
                                    <Button
                                      onClick={() => copyContractLink(appointment.id)}
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7"
                                    >
                                      <Copy className="h-3 w-3 mr-1" />
                                      Link kopieren
                                    </Button>
                                    <Button
                                      onClick={() => openContractLink(appointment.id)}
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7"
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Öffnen
                                    </Button>
                                  </div>
                                </div>
                              )}
                              {appointment.status === 'cancelled' && (
                                <span className="text-xs text-red-600 font-medium">
                                  ✗ Storniert
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {appointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Noch keine Termine gebucht.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsManager;
