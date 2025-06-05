import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Eye, Phone, Mail, MapPin, User, Flag } from 'lucide-react';
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
}

const JobApplicationsManager = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
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
                      <TableHead className="min-w-[100px]">Eingereicht</TableHead>
                      <TableHead className="min-w-[200px]">Dokumente</TableHead>
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
