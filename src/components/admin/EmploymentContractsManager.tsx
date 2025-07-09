
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Building,
  CreditCard,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface EmploymentContract {
  id: string;
  appointment_id: string;
  application_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  id_front_file_path: string | null;
  id_back_file_path: string | null;
  bank_name: string;
  iban: string;
  tax_id: string;
  appointments?: {
    appointment_date: string;
    appointment_time: string;
  };
}

const EmploymentContractsManager = () => {
  const [contracts, setContracts] = useState<EmploymentContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('employment_contracts')
        .select(`
          *,
          appointments!inner(
            appointment_date,
            appointment_time
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContracts(data || []);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Arbeitsverträge.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContractStatus = async (contractId: string, newStatus: string) => {
    if (processingIds.has(contractId)) return;
    
    setProcessingIds(prev => new Set(prev).add(contractId));
    
    try {
      const { error } = await supabase
        .from('employment_contracts')
        .update({ status: newStatus })
        .eq('id', contractId);

      if (error) throw error;

      toast({
        title: "Status aktualisiert",
        description: `Vertragsstatus wurde auf "${newStatus}" geändert.`,
      });

      fetchContracts();
    } catch (error) {
      console.error('Error updating contract status:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Aktualisieren des Vertragsstatus.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(contractId);
        return newSet;
      });
    }
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('id-documents')
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

      toast({
        title: "Download gestartet",
        description: `${fileName} wird heruntergeladen.`,
      });
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Download-Fehler",
        description: "Fehler beim Herunterladen des Dokuments.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <Clock className="h-3 w-3 mr-1" />
            Eingereicht
          </Badge>
        );
      case 'reviewed':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Eye className="h-3 w-3 mr-1" />
            Geprüft
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Genehmigt
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Abgelehnt
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // HH:MM format
  };

  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Arbeitsverträge
        </CardTitle>
        <CardDescription>
          Übersicht und Verwaltung aller eingereichten Arbeitsvertragsdaten
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
                    <TableHead className="min-w-[150px]">Name</TableHead>
                    <TableHead className="min-w-[150px]">Kontaktdaten</TableHead>
                    <TableHead className="min-w-[150px]">Termin</TableHead>
                    <TableHead className="min-w-[150px]">Bankdaten</TableHead>
                    <TableHead className="min-w-[100px]">Steuer-ID</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Eingereicht</TableHead>
                    <TableHead className="min-w-[200px]">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="font-medium text-sm">
                            {contract.first_name} {contract.last_name}
                          </span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-500" />
                            <span>{contract.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-gray-500" />
                            <span>{contract.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {contract.appointments && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span>{formatDate(contract.appointments.appointment_date)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatTime(contract.appointments.appointment_time)}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Building className="h-3 w-3 text-gray-500" />
                            <span className="font-medium">{contract.bank_name}</span>
                          </div>
                          <div className="text-xs text-gray-600 font-mono">
                            {formatIban(contract.iban)}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-xs font-mono">
                          {contract.tax_id}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(contract.status)}
                      </TableCell>
                      
                      <TableCell className="text-sm">
                        {formatDate(contract.created_at)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contract.status === 'submitted' && (
                            <>
                              <Button
                                onClick={() => updateContractStatus(contract.id, 'reviewed')}
                                disabled={processingIds.has(contract.id)}
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                {processingIds.has(contract.id) ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                                ) : (
                                  <>
                                    <Eye className="h-3 w-3 mr-1" />
                                    Geprüft
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => updateContractStatus(contract.id, 'approved')}
                                disabled={processingIds.has(contract.id)}
                                size="sm"
                                className="text-xs bg-green-600 hover:bg-green-700"
                              >
                                {processingIds.has(contract.id) ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Genehmigen
                                  </>
                                )}
                              </Button>
                            </>
                          )}
                          
                          {contract.status === 'reviewed' && (
                            <>
                              <Button
                                onClick={() => updateContractStatus(contract.id, 'approved')}
                                disabled={processingIds.has(contract.id)}
                                size="sm"
                                className="text-xs bg-green-600 hover:bg-green-700"
                              >
                                {processingIds.has(contract.id) ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Genehmigen
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => updateContractStatus(contract.id, 'rejected')}
                                disabled={processingIds.has(contract.id)}
                                size="sm"
                                variant="destructive"
                                className="text-xs"
                              >
                                {processingIds.has(contract.id) ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  <>
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Ablehnen
                                  </>
                                )}
                              </Button>
                            </>
                          )}
                          
                          {/* Download buttons for ID documents */}
                          {contract.id_front_file_path && (
                            <Button
                              onClick={() => downloadDocument(
                                contract.id_front_file_path!,
                                `${contract.first_name}_${contract.last_name}_Ausweis_Vorderseite`
                              )}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Vorderseite
                            </Button>
                          )}
                          
                          {contract.id_back_file_path && (
                            <Button
                              onClick={() => downloadDocument(
                                contract.id_back_file_path!,
                                `${contract.first_name}_${contract.last_name}_Ausweis_Rueckseite`
                              )}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Rückseite
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {contracts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Noch keine Arbeitsvertragsdaten eingereicht.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmploymentContractsManager;
