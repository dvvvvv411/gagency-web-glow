
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationEmailRequest {
  applicantEmail: string;
  applicantName: string;
  applicationId?: string;
  type: 'confirmation' | 'acceptance' | 'test';
}

interface ResendConfig {
  sender_email: string;
  sender_name: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function called with method:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantEmail, applicantName, applicationId, type }: ApplicationEmailRequest = await req.json();
    console.log("Processing email request:", { applicantEmail, applicantName, applicationId, type });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch Resend configuration from database
    let resendConfig: ResendConfig = {
      sender_email: "onboarding@resend.dev",
      sender_name: "Bewerbungsteam"
    };

    try {
      const { data: configData, error: configError } = await supabase
        .from('resend_config')
        .select('sender_email, sender_name')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (configError) {
        console.error('Error fetching resend config:', configError);
      } else if (configData) {
        resendConfig = configData;
        console.log('Using custom resend config:', resendConfig);
      } else {
        console.log('No custom resend config found, using defaults');
      }
    } catch (error) {
      console.error('Error fetching resend config:', error);
      console.log('Using default resend config');
    }

    let emailSubject: string;
    let emailHtml: string;

    if (type === 'test') {
      emailSubject = "Test E-Mail - Resend Konfiguration";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🧪 Test E-Mail</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Resend Konfiguration erfolgreich</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Diese Test-E-Mail bestätigt, dass Ihre Resend-Konfiguration korrekt funktioniert.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">✅ Konfiguration aktiv</h3>
              <p style="color: #374151; margin: 0; line-height: 1.6;">
                Absender: ${resendConfig.sender_name} &lt;${resendConfig.sender_email}&gt;
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Mit freundlichen Grüßen,<br>
                <strong>${resendConfig.sender_name}</strong>
              </p>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'acceptance') {
      // Generate appointment booking link
      const bookingUrl = `${req.headers.get('origin') || 'https://id-preview--70742796-8eb6-4d9f-a870-1f297bf01653.lovable.app'}/termin-buchen?application=${applicationId}`;
      
      emailSubject = "🎉 Ihre Bewerbung wurde akzeptiert!";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Herzlichen Glückwunsch!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Ihre Bewerbung wurde akzeptiert</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Liebe/r ${applicantName},
            </p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
              wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung bei unserem Unternehmen erfolgreich war! 
              Nach sorgfältiger Prüfung Ihrer Unterlagen sind wir von Ihren Qualifikationen überzeugt.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">📞 Nächster Schritt: Telefoninterview</h3>
              <p style="color: #374151; margin: 0; line-height: 1.6;">
                Um Sie persönlich kennenzulernen und weitere Details zu besprechen, würden wir gerne ein Telefoninterview mit Ihnen führen.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${bookingUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        text-decoration: none; 
                        padding: 15px 30px; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        font-size: 16px; 
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;">
                🗓️ Jetzt Termin buchen
              </a>
            </div>
            
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>💡 Hinweis:</strong> Bitte buchen Sie Ihren Termin innerhalb der nächsten 7 Tage. 
                Bei Fragen stehen wir Ihnen gerne zur Verfügung.
              </p>
            </div>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-top: 30px;">
              Wir freuen uns auf das Gespräch mit Ihnen!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Mit freundlichen Grüßen,<br>
                <strong>${resendConfig.sender_name}</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns bitte direkt.</p>
          </div>
        </div>
      `;
    } else {
      // Confirmation email for new applications
      emailSubject = "Bestätigung Ihrer Bewerbung";
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">📧 Bewerbung erhalten</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Vielen Dank für Ihr Interesse</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Liebe/r ${applicantName},
            </p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
              vielen Dank für Ihre Bewerbung! Wir haben Ihre Unterlagen erfolgreich erhalten und werden diese sorgfältig prüfen.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">⏰ Wie geht es weiter?</h3>
              <p style="color: #374151; margin: 0; line-height: 1.6;">
                Unser Team wird Ihre Bewerbung in den nächsten Tagen bearbeiten. 
                Sie erhalten von uns eine Rückmeldung, sobald wir eine Entscheidung getroffen haben.
              </p>
            </div>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Bei Fragen stehen wir Ihnen gerne zur Verfügung.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Mit freundlichen Grüßen,<br>
                <strong>${resendConfig.sender_name}</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns bitte direkt.</p>
          </div>
        </div>
      `;
    }

    const fromEmail = `${resendConfig.sender_name} <${resendConfig.sender_email}>`;
    console.log('Sending email from:', fromEmail);

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [applicantEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
