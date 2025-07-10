
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  FileText, 
  Building, 
  CreditCard, 
  Upload,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Check,
  FileImage,
  File
} from 'lucide-react';

interface SteppedEmploymentContractFormProps {
  appointmentId: string;
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  onSuccess?: () => void;
}

interface JobApplicationData {
  vorname: string;
  nachname: string;
  email: string;
  phone: string;
  adresse: string;
  plz: string;
  stadt: string;
}

const SteppedEmploymentContractForm: React.FC<SteppedEmploymentContractFormProps> = ({
  appointmentId,
  applicationId,
  applicantName,
  applicantEmail,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ front: false, back: false });
  const [jobApplicationData, setJobApplicationData] = useState<JobApplicationData | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    first_name: applicantName.split(' ')[0] || '',
    last_name: applicantName.split(' ').slice(1).join(' ') || '',
    birth_date: '',
    birth_place: '',
    nationality: '',
    address: '',
    postal_code: '',
    city: '',
    phone: '',
    email: applicantEmail,
    marital_status: '',
    tax_id: '',
    tax_class: '',
    health_insurance_company: '',
    social_security_number: '',
    bank_name: '',
    iban: '',
    bic: '',
    account_holder: '',
    id_front_file_path: '',
    id_back_file_path: ''
  });

  useEffect(() => {
    fetchJobApplicationData();
  }, [applicationId]);

  const fetchJobApplicationData = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('vorname, nachname, email, phone, adresse, plz, stadt')
        .eq('id', applicationId)
        .single();

      if (error) throw error;

      if (data) {
        setJobApplicationData(data);
        setFormData(prev => ({
          ...prev,
          first_name: data.vorname,
          last_name: data.nachname,
          email: data.email,
          phone: data.phone,
          address: data.adresse,
          postal_code: data.plz,
          city: data.stadt
        }));
      }
    } catch (error) {
      console.error('Error fetching job application data:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File, type: 'front' | 'back') => {
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${appointmentId}_${type}.${fileExt}`;
    
    setUploading(prev => ({ ...prev, [type]: true }));
    
    try {
      const { data, error } = await supabase.storage
        .from('id-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const filePath = data.path;
      handleInputChange(`id_${type}_file_path`, filePath);
      
      toast({
        title: "Datei hochgeladen",
        description: `${type === 'front' ? 'Vorderseite' : 'Rückseite'} des Ausweises erfolgreich hochgeladen.`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload-Fehler",
        description: "Fehler beim Hochladen der Datei. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.id_front_file_path || !formData.id_back_file_path) {
      toast({
        title: "Fehlende Dokumente",
        description: "Bitte laden Sie beide Seiten Ihres Ausweises hoch.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('employment_contracts')
        .insert({
          appointment_id: appointmentId,
          application_id: applicationId,
          ...formData,
          church_tax: false
        });

      if (error) throw error;

      toast({
        title: "Daten erfolgreich übermittelt",
        description: "Ihre Vertragsdaten wurden erfolgreich gespeichert.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting employment contract:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern der Daten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.first_name && formData.last_name && formData.birth_date && 
               formData.birth_place && formData.nationality && formData.address && 
               formData.postal_code && formData.city && formData.phone && 
               formData.email && formData.marital_status;
      case 2:
        return formData.tax_id && formData.tax_class && formData.health_insurance_company && 
               formData.social_security_number;
      case 3:
        return formData.bank_name && formData.iban && formData.bic && formData.account_holder;
      case 4:
        return formData.id_front_file_path && formData.id_back_file_path;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: 'Persönliche Angaben', icon: User },
    { number: 2, title: 'Steuerliche Angaben', icon: FileText },
    { number: 3, title: 'Bankverbindung', icon: Building },
    { number: 4, title: 'Ausweisdokumente', icon: CreditCard }
  ];

  const BankCard = () => (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm opacity-75 mb-1">Bank</div>
            <div className="text-lg font-semibold">
              {formData.bank_name || 'Ihre Bank'}
            </div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-sm opacity-75 mb-1">IBAN</div>
          <div className="text-lg font-mono tracking-wider">
            {formData.iban || '•••• •••• •••• ••••'}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-sm opacity-75 mb-1">Kontoinhaber</div>
            <div className="text-base font-medium">
              {formData.account_holder || 'Ihr Name'}
            </div>
          </div>
          <div>
            <div className="text-sm opacity-75 mb-1">BIC</div>
            <div className="text-sm font-mono">
              {formData.bic || '••••••••'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentUploadCard = ({ type, label }: { type: 'front' | 'back', label: string }) => {
    const isUploaded = formData[`id_${type}_file_path` as keyof typeof formData];
    const isUploading = uploading[type];

    return (
      <Card className={`border-2 border-dashed transition-colors ${
        isUploaded ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
      }`}>
        <CardContent className="p-6">
          <div className="text-center">
            {isUploaded ? (
              <div className="space-y-3">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-green-700">{label} hochgeladen</p>
                  <p className="text-xs text-green-600">Datei erfolgreich gespeichert</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-500">
                    {isUploading ? 'Wird hochgeladen...' : 'Klicken Sie hier zum Hochladen'}
                  </p>
                </div>
              </div>
            )}
            
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, type);
              }}
              disabled={isUploading}
              className="mt-4 cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Vorname *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="last_name">Nachname *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="birth_date">Geburtsdatum *</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange('birth_date', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="birth_place">Geburtsort *</Label>
                <Input
                  id="birth_place"
                  value={formData.birth_place}
                  onChange={(e) => handleInputChange('birth_place', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nationality">Staatsangehörigkeit *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="marital_status">Familienstand *</Label>
                <Select value={formData.marital_status} onValueChange={(value) => handleInputChange('marital_status', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie Ihren Familienstand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ledig">Ledig</SelectItem>
                    <SelectItem value="verheiratet">Verheiratet</SelectItem>
                    <SelectItem value="geschieden">Geschieden</SelectItem>
                    <SelectItem value="verwitwet">Verwitwet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Straße und Hausnummer *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postal_code">Postleitzahl *</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) => handleInputChange('postal_code', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">Stadt *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefonnummer *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tax_id">Steuerliche Identifikationsnummer *</Label>
                <Input
                  id="tax_id"
                  value={formData.tax_id}
                  onChange={(e) => handleInputChange('tax_id', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="tax_class">Steuerklasse *</Label>
                <Select value={formData.tax_class} onValueChange={(value) => handleInputChange('tax_class', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie Ihre Steuerklasse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="health_insurance_company">Krankenkasse *</Label>
                <Input
                  id="health_insurance_company"
                  value={formData.health_insurance_company}
                  onChange={(e) => handleInputChange('health_insurance_company', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="social_security_number">Sozialversicherungsnummer *</Label>
                <Input
                  id="social_security_number"
                  value={formData.social_security_number}
                  onChange={(e) => handleInputChange('social_security_number', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <BankCard />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bank_name">Bank *</Label>
                <Input
                  id="bank_name"
                  value={formData.bank_name}
                  onChange={(e) => handleInputChange('bank_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="account_holder">Kontoinhaber *</Label>
                <Input
                  id="account_holder"
                  value={formData.account_holder}
                  onChange={(e) => handleInputChange('account_holder', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="iban">IBAN *</Label>
                <Input
                  id="iban"
                  value={formData.iban}
                  onChange={(e) => handleInputChange('iban', e.target.value)}
                  required
                  placeholder="DE89 3704 0044 0532 0130 00"
                />
              </div>
              
              <div>
                <Label htmlFor="bic">BIC *</Label>
                <Input
                  id="bic"
                  value={formData.bic}
                  onChange={(e) => handleInputChange('bic', e.target.value)}
                  required
                  placeholder="COBADEFFXXX"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <DocumentUploadCard type="front" label="Vorderseite des Ausweises" />
              <DocumentUploadCard type="back" label="Rückseite des Ausweises" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Arbeitsvertrag - Datenerfassung
        </CardTitle>
        <CardDescription className="text-center">
          Bitte füllen Sie die folgenden Schritte aus, um Ihre Vertragsdaten zu erfassen.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Step Navigation */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number || (currentStep === step.number && isStepValid(step.number));
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : isActive 
                      ? 'border-primary text-primary bg-primary/10' 
                      : 'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted && currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    Schritt {step.number}
                  </div>
                  <div className={`text-xs ${
                    isActive ? 'text-primary' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-4 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-sm text-gray-600">
              {currentStep === 1 && "Geben Sie Ihre persönlichen Daten ein"}
              {currentStep === 2 && "Vervollständigen Sie Ihre steuerlichen Angaben"}
              {currentStep === 3 && "Geben Sie Ihre Bankverbindung ein"}
              {currentStep === 4 && "Laden Sie beide Seiten Ihres Ausweises hoch"}
            </p>
          </div>
          
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
            >
              Weiter
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading || uploading.front || uploading.back || !isStepValid(4)}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Wird übermittelt...' : 'Vertragsdaten übermitteln'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SteppedEmploymentContractForm;
