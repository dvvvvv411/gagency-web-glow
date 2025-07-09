
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Eye, Phone, Mail, MapPin, User, Flag, Check, Calendar } from 'lucide-react';
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
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', application.id);

      if (updateError) throw updateError;

      // Send acceptance email with appointment booking link
      const { error: emailError } = await supabase.functions.invoke('send-application-confirmation', {
        body: {
          applicantEmail: application.email,
          applicantName: `${application.vorname} ${application.nachname}`,
          applicationId: application.id,
          type: 'acceptance'
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
          description: "Die Bewerbung wurde erfolgreich akzeptiert und der Bewerber wurde per E-Mail benachrichtigt.",
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

  const getStatusBadge = (status: string, acceptedAt: string | null) => {
    if (status === 'accepted' || acceptedAt) {
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
                      <TableHead className="min-w-[150px]">Persönliche Daten</TableHead>
                      <TableHead className="min-w-[200px]">Kontakt</TableHead>
                      <TableHead className="min-w-[200px]">Adresse</TableHead>
                      <TableHead className="min-w-[120px]">Staatsangehörigkeit</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Eingereicht</TableHead>
                      <TableHead className="min-w-[200px]">Dokumente</TableHead>
                      <TableHead className="min-w-[150px]">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id} className="align-top">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-gray-500" />
                              <span className="font-medium text-sm">
                                {application.vorname} {application.nachname}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-gray-500" />
                              <span>{application.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-500" />
                              <span>{application.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-500" />
                              <div>
                                <div>{application.adresse}</div>
                                <div>{application.plz} {application.stadt}</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Flag className="h-3 w-3 text-gray-500" />
                            <span>{application.staatsangehoerigkeit}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {getStatusBadge(application.status, application.accepted_at)}
                        </TableCell>
                        
                        <TableCell className="text-sm">
                          {new Date(application.created_at).toLocaleDateString('de-DE')}
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-2">
                            {application.cv_file_path && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewFile(application.cv_file_path!, 'Lebenslauf', application)}
                                className="w-full justify-start text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Lebenslauf anzeigen
                              </Button>
                            )}
                            {application.anschreiben_file_path && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewFile(application.anschreiben_file_path!, 'Anschreiben', application)}
                                className="w-full justify-start text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Anschreiben anzeigen
                              </Button>
                            )}
                            {!application.cv_file_path && !application.anschreiben_file_path && (
                              <span className="text-xs text-gray-500">Keine Dokumente</span>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {!application.accepted_at && application.status !== 'accepted' ? (
                            <Button
                              onClick={() => acceptApplication(application)}
                              disabled={processingIds.has(application.id)}
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                              {processingIds.has(application.id) ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              ) : (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Akzeptieren
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="text-sm text-green-600 font-medium">
                              <Check className="h-4 w-4 inline mr-1" />
                              Akzeptiert am {new Date(application.accepted_at!).toLocaleDateString('de-DE')}
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
