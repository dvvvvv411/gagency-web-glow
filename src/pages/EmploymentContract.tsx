
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FluidBackground from '@/components/backgrounds/FluidBackground';
import SteppedEmploymentContractForm from '@/components/forms/SteppedEmploymentContractForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface AppointmentData {
  id: string;
  application_id: string;
  applicant_name: string;
  applicant_email: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

const EmploymentContract = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [existingContract, setExistingContract] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const appointmentId = searchParams.get('appointment');

  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentData();
      checkExistingContract();
    } else {
      setLoading(false);
    }
  }, [appointmentId]);

  const fetchAppointmentData = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

      if (error) throw error;

      if (data.status !== 'completed') {
        toast({
          title: "Termin nicht abgeschlossen",
          description: "Dieser Termin wurde noch nicht als abgeschlossen markiert.",
          variant: "destructive",
        });
        return;
      }

      setAppointment(data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      toast({
        title: "Fehler",
        description: "Termin konnte nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkExistingContract = async () => {
    try {
      const { data, error } = await supabase
        .from('employment_contracts')
        .select('id')
        .eq('appointment_id', appointmentId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setExistingContract(true);
      }
    } catch (error) {
      console.error('Error checking existing contract:', error);
    }
  };

  const handleFormSuccess = () => {
    setSubmitted(true);
    toast({
      title: "Erfolgreich übermittelt",
      description: "Ihre Vertragsdaten wurden erfolgreich gespeichert.",
    });
  };

  if (loading) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (!appointmentId || !appointment) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <CardTitle className="text-red-600">Ungültiger Link</CardTitle>
            <CardDescription>
              Der Link ist ungültig oder der Termin wurde nicht gefunden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zur Startseite
            </Button>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (existingContract) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <CardTitle className="text-green-600">Bereits übermittelt</CardTitle>
            <CardDescription>
              Sie haben bereits Ihre Vertragsdaten für diesen Termin übermittelt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zur Startseite
            </Button>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  if (submitted) {
    return (
      <FluidBackground className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <CardTitle className="text-green-600">Erfolgreich übermittelt</CardTitle>
            <CardDescription>
              Vielen Dank! Ihre Vertragsdaten wurden erfolgreich übermittelt. Wir werden uns bald bei Ihnen melden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zur Startseite
            </Button>
          </CardContent>
        </Card>
      </FluidBackground>
    );
  }

  return (
    <FluidBackground className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Info */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="text-sm text-gray-600">
              <p><strong>Bewerber:</strong> {appointment.applicant_name}</p>
              <p><strong>E-Mail:</strong> {appointment.applicant_email}</p>
              <p><strong>Termin:</strong> {new Date(appointment.appointment_date).toLocaleDateString('de-DE')} um {appointment.appointment_time.slice(0, 5)}</p>
            </div>
          </div>
        </div>

        {/* Stepped Form */}
        <SteppedEmploymentContractForm
          appointmentId={appointment.id}
          applicationId={appointment.application_id}
          applicantName={appointment.applicant_name}
          applicantEmail={appointment.applicant_email}
          onSuccess={handleFormSuccess}
        />
      </div>
    </FluidBackground>
  );
};

export default EmploymentContract;
