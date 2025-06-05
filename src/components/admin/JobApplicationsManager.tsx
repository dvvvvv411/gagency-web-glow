
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Save, Phone, Mail, MapPin, User, Flag } from 'lucide-react';

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
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});
  const [editingStatus, setEditingStatus] = useState<{ [key: string]: string }>({});
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
      
      // Initialize editing states
      const notesState: { [key: string]: string } = {};
      const statusState: { [key: string]: string } = {};
      data?.forEach(app => {
        notesState[app.id] = app.notes || '';
        statusState[app.id] = app.status;
      });
      setEditingNotes(notesState);
      setEditingStatus(statusState);
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

  const handleSaveChanges = (applicationId: string) => {
    updateApplication(applicationId, {
      status: editingStatus[applicationId],
      notes: editingNotes[applicationId]
    });
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Persönliche Daten</TableHead>
                    <TableHead className="min-w-[200px]">Kontakt</TableHead>
                    <TableHead className="min-w-[200px]">Adresse</TableHead>
                    <TableHead className="min-w-[120px]">Staatsangehörigkeit</TableHead>
                    <TableHead className="min-w-[100px]">Eingereicht</TableHead>
                    <TableHead className="min-w-[150px]">Status</TableHead>
                    <TableHead className="min-w-[200px]">Notizen</TableHead>
                    <TableHead className="min-w-[200px]">Dokumente</TableHead>
                    <TableHead className="min-w-[100px]">Aktionen</TableHead>
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
                        <Select 
                          value={editingStatus[application.id] || application.status} 
                          onValueChange={(value) => 
                            setEditingStatus(prev => ({...prev, [application.id]: value}))
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="neu">Neu</SelectItem>
                            <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                            <SelectItem value="angenommen">Angenommen</SelectItem>
                            <SelectItem value="abgelehnt">Abgelehnt</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      
                      <TableCell>
                        <Textarea
                          value={editingNotes[application.id] || ''}
                          onChange={(e) => 
                            setEditingNotes(prev => ({...prev, [application.id]: e.target.value}))
                          }
                          placeholder="Notizen..."
                          className="min-h-[60px] text-sm"
                          rows={3}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-2">
                          {application.cv_file_path && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(application.cv_file_path!, 'Lebenslauf.pdf')}
                              className="w-full justify-start text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Lebenslauf
                            </Button>
                          )}
                          {application.anschreiben_file_path && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(application.anschreiben_file_path!, 'Anschreiben.pdf')}
                              className="w-full justify-start text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Anschreiben
                            </Button>
                          )}
                          {!application.cv_file_path && !application.anschreiben_file_path && (
                            <span className="text-xs text-gray-500">Keine Dokumente</span>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Button
                          onClick={() => handleSaveChanges(application.id)}
                          size="sm"
                          className="w-full"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Speichern
                        </Button>
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
  );
};

export default JobApplicationsManager;
