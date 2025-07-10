import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, Edit, ExternalLink, Copy, Eye, EyeOff, Info } from 'lucide-react';
import AppointmentDetailsDialog from './AppointmentDetailsDialog';

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
  // Extended job application data
  job_applications?: {
    phone: string;
    adresse: string;
    plz: string;
    stadt: string;
    staatsangehoerigkeit: string;
    cv_file_path: string | null;
    anschreiben_file_path: string | null;
    status: string | null;
    notes: string | null;
    created_at: string;
    accepted_at: string | null;
  };
}

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [showAllPastAppointments, setShowAllPastAppointments] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
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
          job_applications(
            phone,
            adresse,
            plz,
            stadt,
            staatsangehoerigkeit,
            cv_file_path,
            anschreiben_file_path,
            status,
            notes,
            created_at,
            accepted_at
          )
        `)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;

      // Transform data to include phone numbers
      const appointmentsWithPhone = (data || []).map(appointment => ({
        ...appointment,
        applicant_phone: appointment.job_applications?.phone
      }));

      // Sort appointments with custom logic
      const sortedAppointments = sortAppointments(appointmentsWithPhone);

      // Find the next upcoming appointment
      const now = new Date();
      const upcoming = sortedAppointments.find(appointment => {
        const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
        return appointmentDateTime > now && appointment.status === 'scheduled';
      });

      setAppointments(sortedAppointments);
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

  const sortAppointments = (appointments: Appointment[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return appointments.sort((a, b) => {
      const dateTimeA = new Date(`${a.appointment_date}T${a.appointment_time}`);
      const dateTimeB = new Date(`${b.appointment_date}T${b.appointment_time}`);
      
      const isAFuture = dateTimeA > now;
      const isBFuture = dateTimeB > now;
      
      // Future appointments first (sorted chronologically)
      if (isAFuture && isBFuture) {
        return dateTimeA.getTime() - dateTimeB.getTime();
      }
      
      // Then recent past appointments (today/tomorrow, sorted reverse chronologically)
      if (!isAFuture && !isBFuture) {
        return dateTimeB.getTime() - dateTimeA.getTime();
      }
      
      // Future before past
      return isAFuture ? -1 : 1;
    });
  };

  const getFilteredAppointments = () => {
    if (showAllPastAppointments) {
      return appointments;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
      
      // Always show future appointments
      if (appointmentDateTime > now) {
        return true;
      }
      
      // Show past appointments only from today and tomorrow
      return appointmentDate >= today && appointmentDate <= tomorrow;
    });
  };

  const getHiddenPastAppointmentsCount = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointment_date);
      const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
      
      // Count past appointments older than today
      return appointmentDateTime < now && appointmentDate < today;
    }).length;
  };

  const copyPhoneToClipboard = async (phone: string, name: string) => {
    if (!phone) return;
    
    try {
      await navigator.clipboard.writeText(phone);
      toast({
        title: "Telefonnummer kopiert",
        description: `Die Telefonnummer von ${name} wurde in die Zwischenablage kopiert.`,
      });
    } catch (error) {
      console.error('Error copying phone number:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Kopieren der Telefonnummer.",
        variant: "destructive",
      });
    }
  };

  const openDetailsDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setSelectedAppointment(null);
    setIsDetailsDialogOpen(false);
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

  const isOlderPastAppointment = (date: string, time: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const appointmentDate = new Date(date);
    const appointmentDateTime = new Date(`${date}T${time}`);
    
    return appointmentDateTime < now && appointmentDate < today;
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

  const filteredAppointments = getFilteredAppointments();
  const hiddenCount = getHiddenPastAppointmentsCount();

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
                        <button
                          onClick={() => copyPhoneToClipboard(nextAppointment.applicant_phone!, nextAppointment.applicant_name)}
                          className="text-blue-700 hover:text-blue-900 underline cursor-pointer"
                          title="Telefonnummer kopieren"
                        >
                          {formatPhoneNumber(nextAppointment.applicant_phone)}
                        </button>
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
                  className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 shadow-sm"
                >
                  {processingIds.has(nextAppointment.id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700"></div>
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
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 shadow-sm"
                >
                  {processingIds.has(nextAppointment.id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-700"></div>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Terminkalender
              </CardTitle>
              <CardDescription>
                Übersicht und Verwaltung aller gebuchten Termine
              </CardDescription>
            </div>
            {/* Always show the toggle button */}
            <Button
              onClick={() => setShowAllPastAppointments(!showAllPastAppointments)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {showAllPastAppointments ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Ältere ausblenden
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  {hiddenCount > 0 ? `${hiddenCount} ältere anzeigen` : 'Alle anzeigen'}
                </>
              )}
            </Button>
          </div>
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
                      <TableHead className="min-w-[250px]">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => {
                      const isAppointmentPast = isPast(appointment.appointment_date, appointment.appointment_time);
                      const isAppointmentUpcoming = isUpcoming(appointment.appointment_date, appointment.appointment_time);
                      const isOlderPast = isOlderPastAppointment(appointment.appointment_date, appointment.appointment_time);
                      
                      return (
                        <TableRow 
                          key={appointment.id} 
                          className={`align-top ${
                            isAppointmentUpcoming && appointment.status === 'scheduled'
                              ? 'bg-blue-50/50' 
                              : isAppointmentPast 
                                ? isOlderPast 
                                  ? 'bg-gray-50/60 text-gray-500'
                                  : 'bg-gray-50/40 text-gray-600'
                                : ''
                          }`}
                        >
                          <TableCell className={isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : ''}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Calendar className={`h-3 w-3 ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : 'text-gray-500'}`} />
                                <span className="font-medium text-sm">
                                  {formatDate(appointment.appointment_date)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className={`h-3 w-3 ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : 'text-gray-500'}`} />
                                <span className="text-sm">
                                  {formatTime(appointment.appointment_time)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell className={isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : ''}>
                            <div className="flex items-center gap-1">
                              <User className={`h-3 w-3 ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : 'text-gray-500'}`} />
                              <span className="font-medium text-sm">
                                {appointment.applicant_name}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell className={isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : ''}>
                            <div className="flex items-center gap-1">
                              <Mail className={`h-3 w-3 ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : 'text-gray-500'}`} />
                              <span className="text-sm">{appointment.applicant_email}</span>
                            </div>
                          </TableCell>

                          <TableCell className={isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : ''}>
                            <div className="flex items-center gap-1">
                              <Phone className={`h-3 w-3 ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : 'text-gray-500'}`} />
                              {appointment.applicant_phone ? (
                                <button
                                  onClick={() => copyPhoneToClipboard(appointment.applicant_phone!, appointment.applicant_name)}
                                  className={`text-sm hover:underline cursor-pointer ${
                                    isAppointmentPast 
                                      ? (isOlderPast ? 'text-gray-400 hover:text-gray-500' : 'text-gray-500 hover:text-gray-700')
                                      : 'text-blue-600 hover:text-blue-800'
                                  }`}
                                  title="Telefonnummer kopieren"
                                >
                                  {formatPhoneNumber(appointment.applicant_phone)}
                                </button>
                              ) : (
                                <span className="text-sm">-</span>
                              )}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className={isAppointmentPast ? (isOlderPast ? 'opacity-50' : 'opacity-70') : ''}>
                              {getStatusBadge(appointment.status)}
                            </div>
                          </TableCell>
                          
                          <TableCell className={`text-sm ${isAppointmentPast ? (isOlderPast ? 'text-gray-400' : 'text-gray-500') : ''}`}>
                            {new Date(appointment.created_at).toLocaleDateString('de-DE')}
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {/* Details Button - Always visible */}
                              <Button
                                onClick={() => openDetailsDialog(appointment)}
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                              >
                                <Info className="h-3 w-3 mr-1" />
                                Details
                              </Button>

                              {appointment.status === 'scheduled' && (
                                <>
                                  <Button
                                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                    disabled={processingIds.has(appointment.id)}
                                    size="sm"
                                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 shadow-sm"
                                  >
                                    {processingIds.has(appointment.id) ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700"></div>
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
                                    className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 shadow-sm"
                                  >
                                    {processingIds.has(appointment.id) ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-700"></div>
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
              
              {filteredAppointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Noch keine Termine gebucht.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <AppointmentDetailsDialog
        appointment={selectedAppointment}
        isOpen={isDetailsDialogOpen}
        onClose={closeDetailsDialog}
      />
    </div>
  );
};

export default AppointmentsManager;
