
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, Edit } from 'lucide-react';

interface Appointment {
  id: string;
  application_id: string;
  appointment_date: string;
  appointment_time: string;
  applicant_name: string;
  applicant_email: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
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

  return (
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
                    <TableHead className="min-w-[200px]">Kontakt</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[200px]">Anmerkungen</TableHead>
                    <TableHead className="min-w-[100px]">Gebucht am</TableHead>
                    <TableHead className="min-w-[150px]">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow 
                      key={appointment.id} 
                      className={`align-top ${
                        isUpcoming(appointment.appointment_date, appointment.appointment_time) 
                          ? 'bg-blue-50/50' 
                          : ''
                      }`}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="font-medium text-sm">
                              {formatDate(appointment.appointment_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-sm">
                              {formatTime(appointment.appointment_time)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="font-medium text-sm">
                            {appointment.applicant_name}
                          </span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-500" />
                            <span>{appointment.applicant_email}</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      
                      <TableCell className="text-sm max-w-xs">
                        {appointment.notes ? (
                          <div className="truncate" title={appointment.notes}>
                            {appointment.notes}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-sm">
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
                            <span className="text-xs text-green-600 font-medium">
                              ✓ Abgeschlossen
                            </span>
                          )}
                          {appointment.status === 'cancelled' && (
                            <span className="text-xs text-red-600 font-medium">
                              ✗ Storniert
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
  );
};

export default AppointmentsManager;
