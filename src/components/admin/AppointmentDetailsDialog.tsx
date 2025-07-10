
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, Clock, User, Mail, Phone, MapPin, Globe, FileText, 
  CheckCircle, XCircle, Download, ExternalLink, Briefcase, 
  Home, CreditCard, UserCheck, AlertCircle
} from 'lucide-react';

interface JobApplication {
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
}

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
  job_applications?: JobApplication;
}

interface AppointmentDetailsDialogProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentDetailsDialog: React.FC<AppointmentDetailsDialogProps> = ({
  appointment,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();

  if (!appointment) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return phone;
    
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11 && cleaned.startsWith('49')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
    } else if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
    }
    
    return phone;
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

  const getApplicationStatusBadge = (status: string | null) => {
    switch (status) {
      case 'neu':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Neu
          </Badge>
        );
      case 'angenommen':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <UserCheck className="h-3 w-3 mr-1" />
            Angenommen
          </Badge>
        );
      case 'abgelehnt':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Abgelehnt
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status || 'Unbekannt'}
          </Badge>
        );
    }
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .download(filePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download gestartet",
        description: `${fileName} wird heruntergeladen.`,
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Download-Fehler",
        description: `Fehler beim Herunterladen von ${fileName}.`,
        variant: "destructive",
      });
    }
  };

  const viewDocument = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('application-documents')
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        window.open(data.publicUrl, '_blank');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Öffnen des Dokuments.",
        variant: "destructive",
      });
    }
  };

  const jobApp = appointment.job_applications;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Vollständige Bewerbungsdetails - {appointment.applicant_name}
          </DialogTitle>
          <DialogDescription>
            Alle Informationen zum Bewerber und gebuchten Termin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointment Status & Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Termindetails
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-blue-700">Datum:</span>
                  <p className="text-blue-900">{formatDate(appointment.appointment_date)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Uhrzeit:</span>
                  <p className="text-blue-900 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(appointment.appointment_time)}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-700">Status:</span>
                  <div className="mt-1">{getStatusBadge(appointment.status)}</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-green-900 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Bewerbungsstatus
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-green-700">Status:</span>
                  <div className="mt-1">{getApplicationStatusBadge(jobApp?.status)}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-green-700">Eingereicht am:</span>
                  <p className="text-green-900">
                    {jobApp?.created_at ? new Date(jobApp.created_at).toLocaleDateString('de-DE') : 'N/A'}
                  </p>
                </div>
                {jobApp?.accepted_at && (
                  <div>
                    <span className="text-sm font-medium text-green-700">Angenommen am:</span>
                    <p className="text-green-900">
                      {new Date(jobApp.accepted_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Persönliche Informationen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{appointment.applicant_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">E-Mail:</span>
                  <a 
                    href={`mailto:${appointment.applicant_email}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {appointment.applicant_email}
                  </a>
                </div>
                {(appointment.applicant_phone || jobApp?.phone) && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Telefon:</span>
                    <a 
                      href={`tel:${appointment.applicant_phone || jobApp?.phone}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {formatPhoneNumber(appointment.applicant_phone || jobApp?.phone || '')}
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {jobApp?.staatsangehoerigkeit && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Staatsangehörigkeit:</span>
                    <span className="text-gray-900">{jobApp.staatsangehoerigkeit}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          {jobApp && (
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <Home className="h-4 w-4" />
                Adresse
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-blue-900">
                    {jobApp.adresse}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <span className="text-blue-900">
                    {jobApp.plz} {jobApp.stadt}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {jobApp && (jobApp.cv_file_path || jobApp.anschreiben_file_path) && (
            <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-yellow-900 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Bewerbungsunterlagen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobApp.cv_file_path && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-yellow-700">Lebenslauf:</span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadDocument(jobApp.cv_file_path!, 'Lebenslauf.pdf')}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Herunterladen
                      </Button>
                      <Button
                        onClick={() => viewDocument(jobApp.cv_file_path!)}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Anzeigen
                      </Button>
                    </div>
                  </div>
                )}
                {jobApp.anschreiben_file_path && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-yellow-700">Anschreiben:</span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadDocument(jobApp.anschreiben_file_path!, 'Anschreiben.pdf')}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Herunterladen
                      </Button>
                      <Button
                        onClick={() => viewDocument(jobApp.anschreiben_file_path!)}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Anzeigen
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointment.notes && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Terminnotizen
                </h3>
                <p className="text-purple-800 text-sm whitespace-pre-wrap">{appointment.notes}</p>
              </div>
            )}
            {jobApp?.notes && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Bewerbungsnotizen
                </h3>
                <p className="text-orange-800 text-sm whitespace-pre-wrap">{jobApp.notes}</p>
              </div>
            )}
          </div>

          {/* System Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Systeminformationen
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Termin-ID:</span>
                <p className="text-gray-600 font-mono text-xs break-all">{appointment.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Bewerbung-ID:</span>
                <p className="text-gray-600 font-mono text-xs break-all">{appointment.application_id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Erstellt am:</span>
                <p className="text-gray-600">
                  {new Date(appointment.created_at).toLocaleDateString('de-DE')} um{' '}
                  {new Date(appointment.created_at).toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Zuletzt aktualisiert:</span>
                <p className="text-gray-600">
                  {new Date(appointment.updated_at).toLocaleDateString('de-DE')} um{' '}
                  {new Date(appointment.updated_at).toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
