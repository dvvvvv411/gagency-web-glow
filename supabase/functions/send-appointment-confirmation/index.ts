
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentConfirmationRequest {
  applicant_name: string;
  applicant_email: string;
  appointment_date: string;
  appointment_time: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Appointment confirmation email function called');
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicant_name, applicant_email, appointment_date, appointment_time }: AppointmentConfirmationRequest = await req.json();

    console.log("Processing appointment confirmation email for:", { applicant_name, applicant_email, appointment_date, appointment_time });

    if (!applicant_name || !applicant_email || !appointment_date || !appointment_time) {
      console.error('Missing required fields:', { applicant_name, applicant_email, appointment_date, appointment_time });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Supabase client with service role key for database access
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch the sender configuration from the database
    console.log('Fetching sender configuration from database...');
    const { data: resendConfig, error: configError } = await supabase
      .from('resend_config')
      .select('sender_email, sender_name, api_key')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (configError) {
      console.error('Error fetching resend config:', configError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch email configuration" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resendConfig || !resendConfig.api_key) {
      console.error('Resend API key not configured');
      return new Response(
        JSON.stringify({ error: "Resend API key not configured in admin panel" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Resend with API key from database
    const resend = new Resend(resendConfig.api_key);

    // Use default values if no configuration is found
    const senderEmail = resendConfig?.sender_email || "noreply@ingenio-europe.de";
    const senderName = resendConfig?.sender_name || "Ingenio Europe";
    
    console.log('Using sender configuration:', { senderEmail, senderName });

    // Format the date for display
    const formattedDate = new Date(appointment_date).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Modern, professional email template matching other functions
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Terminbestätigung - ${senderName}</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 16px;
          }
          .appointment-details {
            background-color: #f0f9ff;
            border-left: 4px solid #2563eb;
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 6px 6px 0;
          }
          .appointment-details h3 {
            font-size: 18px;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 20px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e0f2fe;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
          }
          .detail-value {
            color: #1e40af;
            font-weight: 500;
            font-size: 14px;
          }
          .highlight-box {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 20px;
            margin: 30px 0;
          }
          .highlight-box h4 {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 12px;
          }
          .highlight-box p {
            margin: 0;
            color: #92400e;
            font-size: 14px;
            line-height: 1.6;
          }
          .contact-info {
            background-color: #f9fafb;
            padding: 25px;
            border-radius: 6px;
            margin: 30px 0;
            border: 1px solid #e5e7eb;
          }
          .contact-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
          }
          .contact-info p {
            margin: 8px 0;
            font-size: 14px;
            color: #6b7280;
          }
          .footer {
            background-color: #1f2937;
            padding: 30px;
            text-align: center;
            color: #9ca3af;
          }
          .footer p {
            margin: 8px 0;
            font-size: 14px;
          }
          .company-name {
            color: #ffffff;
            font-weight: 600;
          }
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
            margin: 30px 0;
          }
          /* Outlook-specific styles */
          <!--[if mso]>
          .email-container {
            width: 600px !important;
          }
          .header, .content, .footer {
            width: 100% !important;
          }
          <![endif]-->
          /* Mobile responsiveness */
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 6px;
            }
            .header, .content {
              padding: 25px 20px;
            }
            .detail-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
            .appointment-details, .contact-info, .highlight-box {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div style="padding: 20px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td align="center">
                <div class="email-container">
                  <!-- Header -->
                  <div class="header">
                    <h1>✅ Termin bestätigt!</h1>
                  </div>
                  
                  <!-- Main Content -->
                  <div class="content">
                    <div class="greeting">
                      Liebe/r ${applicant_name},
                    </div>
                    
                    <p class="message">
                      vielen Dank für Ihre Terminbuchung! Wir freuen uns auf unser Gespräch und haben Ihren Termin erfolgreich reserviert.
                    </p>
                    
                    <div class="appointment-details">
                      <h3>📅 Ihre Termindetails</h3>
                      <div class="detail-row">
                        <span class="detail-label">Datum:</span>
                        <span class="detail-value">${formattedDate}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Uhrzeit:</span>
                        <span class="detail-value">${appointment_time} Uhr</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Art des Termins:</span>
                        <span class="detail-value">Telefonisches Bewerbungsgespräch</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Kontakt:</span>
                        <span class="detail-value">${applicant_email}</span>
                      </div>
                    </div>
                    
                    <div class="highlight-box">
                      <h4>📞 Wichtiger Hinweis</h4>
                      <p>Bitte halten Sie sich zum vereinbarten Termin telefonisch bereit. Wir werden Sie zur angegebenen Zeit unter der von Ihnen angegebenen Telefonnummer anrufen.</p>
                    </div>
                    
                    <p class="message">
                      Unser Team wird Ihre Bewerbungsunterlagen vor dem Gespräch nochmals sorgfältig prüfen, damit wir das Gespräch bestmöglich vorbereiten können.
                    </p>
                    
                    <p class="message">
                      Sollten Sie Fragen haben oder den Termin verschieben müssen, kontaktieren Sie uns bitte rechtzeitig unter der unten angegebenen E-Mail-Adresse.
                    </p>
                    
                    <div class="divider"></div>
                    
                    <div class="contact-info">
                      <h3>Kontaktinformationen</h3>
                      <p><strong>E-Mail:</strong> ${senderEmail}</p>
                      <p><strong>Unternehmen:</strong> ${senderName}</p>
                      <p>Wir sind von Montag bis Freitag, 9:00 - 17:00 Uhr für Sie da.</p>
                    </div>
                    
                    <p class="message">
                      Wir freuen uns auf ein interessantes und erfolgreiches Gespräch mit Ihnen!
                    </p>
                  </div>
                  
                  <!-- Footer -->
                  <div class="footer">
                    <p>Mit freundlichen Grüßen</p>
                    <p class="company-name">Ihr ${senderName} Team</p>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #374151;">
                      <p style="font-size: 12px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    console.log('Sending appointment confirmation email to:', applicant_email);

    const emailResponse = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: [applicant_email],
      subject: `Terminbestätigung - Ihr Telefontermin bei ${senderName}`,
      html: emailHtml,
    });

    console.log("Appointment confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id,
        senderUsed: `${senderName} <${senderEmail}>`
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-appointment-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send appointment confirmation email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
