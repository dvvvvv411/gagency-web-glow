import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Eye, Phone, Mail, MapPin, User, Flag, Check, Calendar, ExternalLink, Copy } from 'lucide-react';
import PDFViewerDialog from './PDFViewerDialog';

interface JobApplication {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  phone: string;
  adresse: string;
  plz: string;
  stadt: string;
  staatsangehoerigkeit: string;
  cv_file_path: string | null;
  anschreiben_file_path: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  accepted_at: string | null;
}

const JobApplicationsManager = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [pdfViewerTitle, setPdfViewerTitle] = useState('');
  const [currentApplicant, setCurrentApplicant] = useState<{
    name: string;
    submissionDate: string;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Bewerbungen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const acceptApplication = async (application: JobApplication) => {
    if (processingIds.has(application.id)) return;
    
    setProcessingIds(prev => new Set(prev).add(application.id));
    
    try {
      // Update the application status and accepted_at timestamp
      const { error: updateError } = await supabase
        .from('job_applications')
        .update({ 
          status: 'angenommen',
          accepted_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Send acceptance email using the new edge function
      const { error: emailError } = await supabase.functions.invoke('send-acceptance-email', {
        body: {
          applicantEmail: application.email,
          applicantName: `${application.vorname} ${application.nachname}`,
          applicationId: application.id
        }
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        toast({
          title: "Warnung",
          description: "Bewerbung wurde akzeptiert, aber die E-Mail konnte nicht gesendet werden.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bewerbung akzeptiert",
          description: "Die Bewerbung wurde erfolgreich akzeptiert und der Bewerber wurde per E-Mail mit Terminbuchungslink benachrichtigt.",
        });
      }

      // Refresh the applications list
      fetchApplications();
    } catch (error) {
      console.error('Error accepting application:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Akzeptieren der Bewerbung.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(application.id);
        return newSet;
      });
    }
  };

  const viewFile = async (filePath: string, fileName: string, application: JobApplication) => {
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .createSignedUrl(filePath, 3600); // URL valid for 1 hour

      if (error) throw error;

      setCurrentPdfUrl(data.signedUrl);
      setPdfViewerTitle(fileName);
      setCurrentApplicant({
        name: `${application.vorname} ${application.nachname}`,
        submissionDate: application.created_at
      });
      setPdfViewerOpen(true);
    } catch (error) {
      console.error('Error viewing file:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Anzeigen der Datei.",
        variant: "destructive",
      });
    }
  };

  const getAppointmentBookingLink = (applicationId: string) => {
    return `${window.location.origin}/appointment-booking?applicationId=${applicationId}`;
  };

  const copyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link kopiert",
      description: "Der Terminbuchungs-Link wurde in die Zwischenablage kopiert.",
    });
  };

  const openLinkInNewTab = (link: string) => {
    window.open(link, '_blank');
  };

  const getStatusBadge = (status: string, acceptedAt: string | null) => {
    if (status === 'angenommen' || acceptedAt) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300">
          <Check className="h-3 w-3 mr-1" />
          Akzeptiert
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        Neu
      </Badge>
    );
  };

  return (
    <>
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bewerbungen verwalten
          </CardTitle>
          <CardDescription>
            Übersicht und Verwaltung aller eingegangenen Bewerbungen
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
                      <TableHead className="w-[200px]">Bewerber</TableHead>
                      <TableHead className="w-[180px]">Kontakt</TableHead>
                      <TableHead className="w-[160px]">Ort</TableHead>
                      <TableHead className="w-[100px]">Nation</TableHead>
                      <TableHead className="w-[90px]">Status</TableHead>
                      <TableHead className="w-[140px]">Dokumente</TableHead>
                      <TableHead className="w-[160px]">Terminbuchung</TableHead>
                      <TableHead className="w-[120px]">Aktion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id} className="align-top">
                        <TableCell className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span className="font-medium text-sm break-words">
                                {application.vorname} {application.nachname}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(application.created_at).toLocaleDateString('de-DE')}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-3">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span className="break-all">{application.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span className="break-words">{application.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-3">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <div className="break-words">
                                <div>{application.plz} {application.stadt}</div>
                                <div className="text-gray-400 truncate">{application.adresse}</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-3">
                          <div className="flex items-center gap-1 text-xs">
                            <Flag className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <span className="break-words">{application.staatsangehoerigkeit}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="p-3">
                          {getStatusBadge(application.status, application.accepted_at)}
                        </TableCell>
                        
                        <TableCell className="p-3">
                          <div className="space-y-1">
                            {application.cv_file_path && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewFile(application.cv_file_path!, 'Lebenslauf', application)}
                                className="w-full justify-start text-xs h-7 px-2"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                CV
                              </Button>
                            )}
                            {application.anschreiben_file_path && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewFile(application.anschreiben_file_path!, 'Anschreiben', application)}
                                className="w-full justify-start text-xs h-7 px-2"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Brief
                              </Button>
                            )}
                            {!application.cv_file_path && !application.anschreiben_file_path && (
                              <span className="text-xs text-gray-500">Keine</span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="p-3">
                          {(application.status === 'angenommen' || application.accepted_at) ? (
                            <div className="space-y-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openLinkInNewTab(getAppointmentBookingLink(application.id))}
                                className="w-full justify-start text-xs h-7 px-2"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Öffnen
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyLinkToClipboard(getAppointmentBookingLink(application.id))}
                                className="w-full justify-start text-xs h-7 px-2"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Kopieren
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">
                              Nach Akzeptierung verfügbar
                            </span>
                          )}
                        </TableCell>
                        
                        <TableCell className="p-3">
                          {!application.accepted_at && application.status !== 'angenommen' ? (
                            <Button
                              onClick={() => acceptApplication(application)}
                              disabled={processingIds.has(application.id)}
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                            >
                              {processingIds.has(application.id) ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              ) : (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Akzeptieren
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="text-xs text-green-600 font-medium break-words">
                              <Check className="h-3 w-3 inline mr-1" />
                              Akzeptiert
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {applications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Noch keine Bewerbungen eingegangen.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <PDFViewerDialog
        isOpen={pdfViewerOpen}
        onClose={() => {
          setPdfViewerOpen(false);
          setCurrentApplicant(null);
        }}
        pdfUrl={currentPdfUrl}
        title={pdfViewerTitle}
        applicantName={currentApplicant?.name}
        submissionDate={currentApplicant?.submissionDate}
      />
    </>
  );
};

export default JobApplicationsManager;
