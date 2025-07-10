
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Mail, Phone, MapPin, Globe, FileText, CheckCircle, XCircle } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Termindetails - {appointment.applicant_name}
          </DialogTitle>
          <DialogDescription>
            Vollständige Informationen zum gebuchten Termin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            {getStatusBadge(appointment.status)}
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Termindetails
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Kontaktinformationen
            </h3>
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
              {appointment.applicant_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Telefon:</span>
                  <a 
                    href={`tel:${appointment.applicant_phone}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {formatPhoneNumber(appointment.applicant_phone)}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* System Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Systeminformationen
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
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

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" />
                Notizen
              </h3>
              <p className="text-yellow-800 text-sm whitespace-pre-wrap">{appointment.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
