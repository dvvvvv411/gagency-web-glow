
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Settings, Save, AlertCircle } from 'lucide-react';

interface ResendConfig {
  id: string;
  sender_email: string;
  sender_name: string;
  api_key: string;
  created_at: string;
  updated_at: string;
}

const ResendManager = () => {
  const [config, setConfig] = useState<ResendConfig | null>(null);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchResendConfig();
  }, []);

  const fetchResendConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resend_config')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

        if (data) {
          setConfig(data);
          setSenderEmail(data.sender_email);
          setSenderName(data.sender_name);
          setApiKey(data.api_key || '');
        }
    } catch (error) {
      console.error('Error fetching Resend config:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Laden der Resend-Konfiguration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveResendConfig = async () => {
    if (!senderEmail || !senderName || !apiKey) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus, einschließlich des API Keys.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      if (config) {
        // Update existing configuration
        const { error } = await supabase
          .from('resend_config')
          .update({
            sender_email: senderEmail,
            sender_name: senderName,
            api_key: apiKey,
          })
          .eq('id', config.id);

        if (error) throw error;
      } else {
        // Create new configuration
        const { error } = await supabase
          .from('resend_config')
          .insert({
            sender_email: senderEmail,
            sender_name: senderName,
            api_key: apiKey,
          });

        if (error) throw error;
      }

      toast({
        title: "Konfiguration gespeichert",
        description: "Die Resend-Konfiguration wurde erfolgreich gespeichert.",
      });

      // Refresh the configuration
      await fetchResendConfig();
    } catch (error) {
      console.error('Error saving Resend config:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern der Resend-Konfiguration.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const testConfiguration = async () => {
    if (!senderEmail || !senderName || !apiKey) {
      toast({
        title: "Fehler",
        description: "Bitte speichern Sie zuerst die vollständige Konfiguration.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-application-confirmation', {
        body: {
          applicantEmail: 'test@example.com',
          applicantName: 'Test User',
          type: 'test',
        },
      });

      if (error) throw error;

      toast({
        title: "Test erfolgreich",
        description: "Die Test-E-Mail wurde versendet (falls die Resend-Konfiguration korrekt ist).",
      });
    } catch (error) {
      console.error('Error testing configuration:', error);
      toast({
        title: "Test fehlgeschlagen",
        description: "Fehler beim Testen der E-Mail-Konfiguration.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Resend E-Mail Konfiguration
        </CardTitle>
        <CardDescription>
          Konfigurieren Sie die E-Mail-Einstellungen für Bewerbungsbestätigungen und Terminbuchungen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Wichtige Hinweise:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Stellen Sie sicher, dass Ihre Domain bei Resend verifiziert ist</li>
                <li>Die Absender-E-Mail muss von einer verifizierten Domain stammen</li>
                <li>Testen Sie die Konfiguration nach dem Speichern</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Resend API Key *</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="re_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Holen Sie sich Ihren API Key von <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">resend.com/api-keys</a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Absender E-Mail *</Label>
              <Input
                id="senderEmail"
                type="email"
                placeholder="noreply@ihredomain.de"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Die E-Mail-Adresse, von der E-Mails versendet werden
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderName">Absender Name *</Label>
              <Input
                id="senderName"
                placeholder="Ihr Unternehmen"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Der Name, der als Absender angezeigt wird
              </p>
            </div>
          </div>
        </div>

        {config && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Aktuelle Konfiguration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">E-Mail:</span>
                <span className="ml-2 font-mono">{config.sender_email}</span>
              </div>
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2">{config.sender_name}</span>
              </div>
              <div>
                <span className="text-gray-600">Erstellt:</span>
                <span className="ml-2">{new Date(config.created_at).toLocaleDateString('de-DE')}</span>
              </div>
              <div>
                <span className="text-gray-600">Aktualisiert:</span>
                <span className="ml-2">{new Date(config.updated_at).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={saveResendConfig}
            disabled={saving || !senderEmail || !senderName || !apiKey}
            className="flex items-center gap-2"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Speichern...' : 'Konfiguration speichern'}
          </Button>

          <Button 
            onClick={testConfiguration}
            variant="outline"
            disabled={!config || !senderEmail || !senderName || !apiKey}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Konfiguration testen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResendManager;
