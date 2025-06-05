
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Eye, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';

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
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
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

  const updateApplication = async (id: string, updates: Partial<JobApplication>) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Bewerbung aktualisiert",
        description: "Die Bewerbung wurde erfolgreich aktualisiert.",
      });

      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren der Bewerbung.",
        variant: "destructive",
      });
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Herunterladen der Datei.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neu':
        return 'bg-blue-100 text-blue-800';
      case 'in_bearbeitung':
        return 'bg-yellow-100 text-yellow-800';
      case 'angenommen':
        return 'bg-green-100 text-green-800';
      case 'abgelehnt':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'neu':
        return 'Neu';
      case 'in_bearbeitung':
        return 'In Bearbeitung';
      case 'angenommen':
        return 'Angenommen';
      case 'abgelehnt':
        return 'Abgelehnt';
      default:
        return status;
    }
  };

  return (
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Eingereicht</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {application.vorname} {application.nachname}
                    </TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>
                      {new Date(application.created_at).toLocaleDateString('de-DE')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusText(application.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setNotes(application.notes || '');
                              setStatus(application.status);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Bewerbung von {selectedApplication?.vorname} {selectedApplication?.nachname}
                            </DialogTitle>
                            <DialogDescription>
                              Eingereicht am {selectedApplication && new Date(selectedApplication.created_at).toLocaleDateString('de-DE')}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedApplication && (
                            <div className="space-y-6">
                              {/* Personal Information */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Persönliche Daten</span>
                                  </div>
                                  <div className="pl-6 space-y-2 text-sm">
                                    <p><strong>Name:</strong> {selectedApplication.vorname} {selectedApplication.nachname}</p>
                                    <p><strong>Staatsangehörigkeit:</strong> {selectedApplication.staatsangehoerigkeit}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Kontakt</span>
                                  </div>
                                  <div className="pl-6 space-y-2 text-sm">
                                    <p><strong>E-Mail:</strong> {selectedApplication.email}</p>
                                    <p><strong>Telefon:</strong> {selectedApplication.phone}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Address */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium">Adresse</span>
                                </div>
                                <div className="pl-6 text-sm">
                                  <p>{selectedApplication.adresse}</p>
                                  <p>{selectedApplication.plz} {selectedApplication.stadt}</p>
                                </div>
                              </div>

                              {/* Documents */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium">Dokumente</span>
                                </div>
                                <div className="pl-6 space-y-2">
                                  {selectedApplication.cv_file_path && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => downloadFile(selectedApplication.cv_file_path!, 'Lebenslauf.pdf')}
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Lebenslauf herunterladen
                                    </Button>
                                  )}
                                  {selectedApplication.anschreiben_file_path && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => downloadFile(selectedApplication.anschreiben_file_path!, 'Anschreiben.pdf')}
                                    >
                                      <Download className="h-4 w-4 mr-2" />
                                      Anschreiben herunterladen
                                    </Button>
                                  )}
                                </div>
                              </div>

                              {/* Status and Notes */}
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Status</label>
                                  <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="neu">Neu</SelectItem>
                                      <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                                      <SelectItem value="angenommen">Angenommen</SelectItem>
                                      <SelectItem value="abgelehnt">Abgelehnt</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-2">Notizen</label>
                                  <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Interne Notizen zur Bewerbung..."
                                    rows={4}
                                  />
                                </div>

                                <Button
                                  onClick={() => {
                                    if (selectedApplication) {
                                      updateApplication(selectedApplication.id, {
                                        status,
                                        notes
                                      });
                                    }
                                  }}
                                  className="w-full"
                                >
                                  Änderungen speichern
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {applications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Noch keine Bewerbungen eingegangen.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobApplicationsManager;
