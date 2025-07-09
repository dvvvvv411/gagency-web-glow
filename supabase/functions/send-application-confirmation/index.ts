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
  appointmentId?: string;
  type: 'confirmation' | 'acceptance' | 'appointment_completed' | 'test';
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
    const { applicantEmail, applicantName, applicationId, appointmentId, type }: ApplicationEmailRequest = await req.json();
    console.log("Processing email request:", { applicantEmail, applicantName, applicationId, appointmentId, type });

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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:auto;v-text-anchor:middle;width:100%;" arcsize="5%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center>
                      <![endif]-->
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🧪 Test E-Mail</h1>
                      <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Resend Konfiguration erfolgreich</p>
                      <!--[if mso]>
                      </center>
                      </v:roundrect>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="background-color: white; padding: 30px;">
                      <p style="font-size: 16px; color: #374151; margin-bottom: 20px; line-height: 1.6;">
                        Diese Test-E-Mail bestätigt, dass Ihre Resend-Konfiguration korrekt funktioniert.
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">✅ Konfiguration aktiv</h3>
                            <p style="color: #374151; margin: 0; line-height: 1.6;">
                              Absender: ${resendConfig.sender_name} &lt;${resendConfig.sender_email}&gt;
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <tr>
                          <td>
                            <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.6;">
                              Mit freundlichen Grüßen,<br>
                              <strong>${resendConfig.sender_name}</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
    } else if (type === 'appointment_completed') {
      const contractUrl = `${req.headers.get('origin') || 'https://id-preview--70742796-8eb6-4d9f-a870-1f297bf01653.lovable.app'}/arbeitsvertrag?appointment=${appointmentId}`;
      
      emailSubject = "🎊 Ihr Termin wurde erfolgreich abgeschlossen!";
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:auto;v-text-anchor:middle;width:100%;" arcsize="5%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center>
                      <![endif]-->
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎊 Großartiger Termin!</h1>
                      <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Ihr Termin wurde erfolgreich abgeschlossen</p>
                      <!--[if mso]>
                      </center>
                      </v:roundrect>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="background-color: white; padding: 30px;">
                      <p style="font-size: 16px; color: #374151; margin-bottom: 20px; line-height: 1.6;">
                        Liebe/r ${applicantName},
                      </p>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                        wir freuen uns, Ihnen mitteilen zu können, dass Ihr Telefoninterview erfolgreich verlaufen ist! 
                        Wir sind begeistert von Ihren Qualifikationen und möchten Ihnen gerne eine Stelle anbieten.
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">📝 Nächster Schritt: Arbeitsvertrag</h3>
                            <p style="color: #374151; margin: 0; line-height: 1.6;">
                              Um den Einstellungsprozess abzuschließen, bitten wir Sie, Ihre Daten für den Arbeitsvertrag zu vervollständigen.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${contractUrl}" style="height:50px;v-text-anchor:middle;width:300px;" arcsize="50%" stroke="f" fillcolor="#667eea">
                            <w:anchorlock/>
                            <center>
                            <![endif]-->
                            <a href="${contractUrl}" style="background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; text-align: center;">
                              📄 Arbeitsvertrag ausfüllen
                            </a>
                            <!--[if mso]>
                            </center>
                            </v:roundrect>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border: 1px solid #f59e0b; margin: 20px 0;">
                        <tr>
                          <td style="padding: 15px;">
                            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
                              <strong>💡 Wichtig:</strong> Bitte füllen Sie den Arbeitsvertrag innerhalb der nächsten 7 Tage aus. 
                              Bei Fragen stehen wir Ihnen gerne zur Verfügung.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-top: 30px;">
                        Wir freuen uns darauf, Sie bald in unserem Team begrüßen zu dürfen!
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <tr>
                          <td>
                            <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.6;">
                              Mit freundlichen Grüßen,<br>
                              <strong>${resendConfig.sender_name}</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
                      <p style="margin: 0;">Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns bitte direkt.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
    } else if (type === 'acceptance') {
      const bookingUrl = `${req.headers.get('origin') || 'https://id-preview--70742796-8eb6-4d9f-a870-1f297bf01653.lovable.app'}/termin-buchen?application=${applicationId}`;
      
      emailSubject = "🎉 Ihre Bewerbung wurde akzeptiert!";
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:auto;v-text-anchor:middle;width:100%;" arcsize="5%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center>
                      <![endif]-->
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎉 Herzlichen Glückwunsch!</h1>
                      <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Ihre Bewerbung wurde akzeptiert</p>
                      <!--[if mso]>
                      </center>
                      </v:roundrect>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="background-color: white; padding: 30px;">
                      <p style="font-size: 16px; color: #374151; margin-bottom: 20px; line-height: 1.6;">
                        Liebe/r ${applicantName},
                      </p>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                        wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung bei unserem Unternehmen erfolgreich war! 
                        Nach sorgfältiger Prüfung Ihrer Unterlagen sind wir von Ihren Qualifikationen überzeugt.
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">📞 Nächster Schritt: Telefoninterview</h3>
                            <p style="color: #374151; margin: 0; line-height: 1.6;">
                              Um Sie persönlich kennenzulernen und weitere Details zu besprechen, würden wir gerne ein Telefoninterview mit Ihnen führen.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${bookingUrl}" style="height:50px;v-text-anchor:middle;width:250px;" arcsize="50%" stroke="f" fillcolor="#667eea">
                            <w:anchorlock/>
                            <center>
                            <![endif]-->
                            <a href="${bookingUrl}" style="background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; text-align: center;">
                              🗓️ Jetzt Termin buchen
                            </a>
                            <!--[if mso]>
                            </center>
                            </v:roundrect>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef3c7; border: 1px solid #f59e0b; margin: 20px 0;">
                        <tr>
                          <td style="padding: 15px;">
                            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
                              <strong>💡 Hinweis:</strong> Bitte buchen Sie Ihren Termin innerhalb der nächsten 7 Tage. 
                              Bei Fragen stehen wir Ihnen gerne zur Verfügung.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-top: 30px;">
                        Wir freuen uns auf das Gespräch mit Ihnen!
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <tr>
                          <td>
                            <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.6;">
                              Mit freundlichen Grüßen,<br>
                              <strong>${resendConfig.sender_name}</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
                      <p style="margin: 0;">Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns bitte direkt.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
    } else {
      emailSubject = "Bestätigung Ihrer Bewerbung";
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #667eea; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:auto;v-text-anchor:middle;width:100%;" arcsize="5%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center>
                      <![endif]-->
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📧 Bewerbung erhalten</h1>
                      <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Vielen Dank für Ihr Interesse</p>
                      <!--[if mso]>
                      </center>
                      </v:roundrect>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="background-color: white; padding: 30px;">
                      <p style="font-size: 16px; color: #374151; margin-bottom: 20px; line-height: 1.6;">
                        Liebe/r ${applicantName},
                      </p>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                        vielen Dank für Ihre Bewerbung! Wir haben Ihre Unterlagen erfolgreich erhalten und werden diese sorgfältig prüfen.
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">⏰ Wie geht es weiter?</h3>
                            <p style="color: #374151; margin: 0; line-height: 1.6;">
                              Unser Team wird Ihre Bewerbung in den nächsten Tagen bearbeiten. 
                              Sie erhalten von uns eine Rückmeldung, sobald wir eine Entscheidung getroffen haben.
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Bei Fragen stehen wir Ihnen gerne zur Verfügung.
                      </p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <tr>
                          <td>
                            <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.6;">
                              Mit freundlichen Grüßen,<br>
                              <strong>${resendConfig.sender_name}</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
                      <p style="margin: 0;">Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns bitte direkt.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
