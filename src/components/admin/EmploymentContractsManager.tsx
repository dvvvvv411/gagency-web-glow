import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  AlertCircle,
  HelpCircle,
  Loader
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
  desired_start_date: string | null;
  id_front_file_path: string | null;
  id_back_file_path: string | null;
  bank_name: string;
  iban: string;
  tax_id: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  address: string;
  postal_code: string;
  city: string;
  marital_status: string;
  tax_class: string;
  health_insurance_company: string;
  social_security_number: string;
  bic: string;
  account_holder: string;
  appointments?: {
    appointment_date: string;
    appointment_time: string;
  };
}

const EmploymentContractsManager = () => {
  const [contracts, setContracts] = useState<EmploymentContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [selectedContract, setSelectedContract] = useState<EmploymentContract | null>(null);
  const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({});
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
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

  const getSignedUrl = async (filePath: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.storage
        .from('id-documents')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }
  };

  const loadImageUrl = async (contractId: string, filePath: string, type: 'front' | 'back') => {
    const cacheKey = `${contractId}_${type}`;
    
    if (imageUrls[cacheKey] || loadingImages.has(cacheKey)) {
      return;
    }

    setLoadingImages(prev => new Set(prev).add(cacheKey));

    try {
      const signedUrl = await getSignedUrl(filePath);
      if (signedUrl) {
        setImageUrls(prev => ({
          ...prev,
          [cacheKey]: signedUrl
        }));
      }
    } catch (error) {
      console.error('Error loading image URL:', error);
    } finally {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(cacheKey);
        return newSet;
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
      case 'done':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Erledigt
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Erledigt
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
          <Badge className="bg-gray-100 text-gray-800 border-gray-300">
            <HelpCircle className="h-3 w-3 mr-1" />
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

  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  const ImageDisplay = ({ contract, type }: { contract: EmploymentContract; type: 'front' | 'back' }) => {
    const filePath = type === 'front' ? contract.id_front_file_path : contract.id_back_file_path;
    const cacheKey = `${contract.id}_${type}`;
    const imageUrl = imageUrls[cacheKey];
    const isLoading = loadingImages.has(cacheKey);

    useEffect(() => {
      if (filePath && !imageUrl && !isLoading) {
        loadImageUrl(contract.id, filePath, type);
      }
    }, [filePath, imageUrl, isLoading, contract.id, type]);

    if (!filePath) {
      return (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">Kein Dokument hochgeladen</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500 text-sm">Lädt...</span>
        </div>
      );
    }

    if (!imageUrl) {
      return (
        <div className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2">
          <AlertCircle className="h-6 w-6 text-red-400" />
          <p className="text-red-500 text-sm">Fehler beim Laden</p>
          <Button
            onClick={() => downloadDocument(filePath, `${contract.first_name}_${contract.last_name}_Ausweis_${type === 'front' ? 'Vorderseite' : 'Rueckseite'}`)}
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Herunterladen
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <img
          src={imageUrl}
          alt={`Ausweis ${type === 'front' ? 'Vorderseite' : 'Rückseite'}`}
          className="w-full h-48 object-contain bg-gray-50 rounded-lg border"
          onError={() => {
            setImageUrls(prev => {
              const newUrls = { ...prev };
              delete newUrls[cacheKey];
              return newUrls;
            });
          }}
        />
        <Button
          onClick={() => downloadDocument(filePath, `${contract.first_name}_${contract.last_name}_Ausweis_${type === 'front' ? 'Vorderseite' : 'Rueckseite'}`)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Herunterladen
        </Button>
      </div>
    );
  };

  const ContractDetailsDialog = ({ contract }: { contract: EmploymentContract }) => (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Vertragsdetails - {contract.first_name} {contract.last_name}
        </DialogTitle>
        <DialogDescription>
          Vollständige Übersicht aller eingereichten Vertragsdaten
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" />
              Persönliche Daten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Vorname</div>
                <div className="text-sm">{contract.first_name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Nachname</div>
                <div className="text-sm">{contract.last_name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Geburtsdatum</div>
                <div className="text-sm">{formatDate(contract.birth_date)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Geburtsort</div>
                <div className="text-sm">{contract.birth_place}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Staatsangehörigkeit</div>
                <div className="text-sm">{contract.nationality}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Familienstand</div>
                <div className="text-sm">{contract.marital_status}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Adresse</div>
              <div className="text-sm">{contract.address}, {contract.postal_code} {contract.city}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">E-Mail</div>
                <div className="text-sm">{contract.email}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Telefon</div>
                <div className="text-sm">{contract.phone}</div>
              </div>
            </div>
            {contract.desired_start_date && (
              <div>
                <div className="text-sm font-medium text-gray-500">Gewünschtes Startdatum</div>
                <div className="text-sm font-semibold text-blue-600">{formatDate(contract.desired_start_date)}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Steuerliche Angaben
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Steuer-ID</div>
                <div className="text-sm font-mono">{contract.tax_id}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Steuerklasse</div>
                <div className="text-sm">{contract.tax_class}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Krankenkasse</div>
                <div className="text-sm">{contract.health_insurance_company}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Sozialversicherungsnummer</div>
                <div className="text-sm font-mono">{contract.social_security_number}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-4 w-4" />
              Bankverbindung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Bank</div>
                <div className="text-sm font-semibold">{contract.bank_name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Kontoinhaber</div>
                <div className="text-sm">{contract.account_holder}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">IBAN</div>
                <div className="text-sm font-mono">{formatIban(contract.iban)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">BIC</div>
                <div className="text-sm font-mono">{contract.bic}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents - Now spans full width and shows images */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Ausweisdokumente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Vorderseite</h4>
                <ImageDisplay contract={contract} type="front" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rückseite</h4>
                <ImageDisplay contract={contract} type="back" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );

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
                    <TableHead className="min-w-[200px]">Kontaktdaten</TableHead>
                    <TableHead className="min-w-[120px]">Startdatum</TableHead>
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
                        {contract.desired_start_date ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="font-medium">{formatDate(contract.desired_start_date)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Nicht angegeben</span>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(contract.status)}
                      </TableCell>
                      
                      <TableCell className="text-sm">
                        {formatDate(contract.created_at)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <ContractDetailsDialog contract={contract} />
                          </Dialog>

                          {contract.status === 'submitted' && (
                            <Button
                              onClick={() => updateContractStatus(contract.id, 'done')}
                              disabled={processingIds.has(contract.id)}
                              size="sm"
                              className="text-xs bg-green-600 hover:bg-green-700"
                            >
                              {processingIds.has(contract.id) ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Erledigt
                                </>
                              )}
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
