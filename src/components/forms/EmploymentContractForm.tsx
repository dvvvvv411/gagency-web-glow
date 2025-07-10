
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Building, 
  Upload,
  FileText,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface EmploymentContractFormProps {
  appointmentId: string;
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  onSuccess?: () => void;
}

const EmploymentContractForm: React.FC<EmploymentContractFormProps> = ({
  appointmentId,
  applicationId,
  applicantName,
  applicantEmail,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ front: false, back: false });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
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
    church_tax: false,
    health_insurance_company: '',
    social_security_number: '',
    bank_name: '',
    iban: '',
    bic: '',
    account_holder: '',
    id_front_file_path: '',
    id_back_file_path: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
          ...formData
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

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Persönliche Angaben
          </CardTitle>
          <CardDescription>
            Bitte geben Sie Ihre persönlichen Daten ein
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Titel (optional)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Dr., Prof., etc."
            />
          </div>
          
          <div></div>
          
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
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Adresse
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">Straße und Hausnummer *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          
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
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Kontaktdaten
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Steuerliche Angaben
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="church_tax"
                checked={formData.church_tax}
                onCheckedChange={(checked) => handleInputChange('church_tax', checked as boolean)}
              />
              <Label htmlFor="church_tax">Kirchensteuerpflichtig</Label>
            </div>
          </div>
          
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
        </CardContent>
      </Card>

      {/* Bank Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Bankverbindung
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </CardContent>
      </Card>

      {/* ID Card Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Ausweisdokumente
          </CardTitle>
          <CardDescription>
            Bitte laden Sie beide Seiten Ihres Personalausweises hoch
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="id_front">Vorderseite *</Label>
            <div className="mt-2">
              <Input
                id="id_front"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'front');
                }}
                disabled={uploading.front}
              />
              {uploading.front && (
                <p className="text-sm text-gray-500 mt-1">Hochladen...</p>
              )}
              {formData.id_front_file_path && (
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Hochgeladen
                </p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="id_back">Rückseite *</Label>
            <div className="mt-2">
              <Input
                id="id_back"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'back');
                }}
                disabled={uploading.back}
              />
              {uploading.back && (
                <p className="text-sm text-gray-500 mt-1">Hochladen...</p>
              )}
              {formData.id_back_file_path && (
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Hochgeladen
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            type="submit"
            disabled={loading || uploading.front || uploading.back}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Wird übermittelt...' : 'Vertragsdaten übermitteln'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default EmploymentContractForm;
