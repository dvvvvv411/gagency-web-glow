import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock, Wifi, CheckCircle } from "lucide-react";

const LiveChat = () => {
  useEffect(() => {
    // Erst alle existierenden Crisp Elemente entfernen
    const existingScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const crispWidget = document.querySelector('#crisp-chatbox');
    if (crispWidget) {
      crispWidget.remove();
    }

    // Globale Variablen zurücksetzen
    delete (window as any).$crisp;
    delete (window as any).CRISP_WEBSITE_ID;
    delete (window as any).CRISP_RUNTIME_CONFIG;
    
    // Kleine Verzögerung, dann Crisp neu laden
    const timeoutId = setTimeout(() => {
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = "d4303196-8b82-4187-b0ed-6d919ce2774b";
      
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      script.onload = () => {
        console.log("Crisp Chat erfolgreich geladen!");
      };
      script.onerror = () => {
        console.error("Fehler beim Laden von Crisp Chat");
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    }, 100);
    
    // Cleanup beim Verlassen der Seite
    return () => {
      clearTimeout(timeoutId);
      const existingScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      const crispWidget = document.querySelector('#crisp-chatbox');
      if (crispWidget) {
        crispWidget.remove();
      }
      delete (window as any).$crisp;
      delete (window as any).CRISP_WEBSITE_ID;
      delete (window as any).CRISP_RUNTIME_CONFIG;
    };
  }, []);
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-background to-muted/20">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-primary to-primary/80 rounded-full">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Live Chat Beratung
            </CardTitle>
            <p className="text-xl text-muted-foreground">
              Nutzen Sie unseren Live Chat für Ihre persönliche Beratung
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  So funktioniert's:
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Live Chat öffnen</h4>
                      <p className="text-muted-foreground">
                        Klicken Sie auf das Chat-Symbol unten rechts in der Ecke, um den Live Chat zu starten.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Pünktlichkeit</h4>
                      <p className="text-muted-foreground">
                        Seien Sie bitte pünktlich zu Ihrem vereinbarten Termin im Chat verfügbar.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Wifi className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Stabile Verbindung</h4>
                      <p className="text-muted-foreground">
                        Sorgen Sie für eine stabile Internetverbindung während des Beratungsgesprächs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Wichtige Hinweise:
                </h3>
                
                <div className="space-y-4">
                  <Card className="border border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">Vorbereitung</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Halten Sie alle relevanten Unterlagen und Fragen bereit, bevor Sie den Chat starten.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">Ruhige Umgebung</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Suchen Sie sich einen ruhigen Ort für ungestörte Auftragsbearbeitung.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">Geduld</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Falls der Berater noch in einem anderen Gespräch ist, warten Sie bitte kurz.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t border-border">
              <p className="text-lg text-muted-foreground">
                Der Live Chat erscheint automatisch unten rechts auf dieser Seite
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Bei technischen Problemen kontaktieren Sie uns bitte telefonisch
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveChat;