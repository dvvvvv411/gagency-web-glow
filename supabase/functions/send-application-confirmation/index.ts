
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  applicantEmail: string;
  applicantName: string;
  type: 'confirmation';
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Confirmation email function called');
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantEmail, applicantName, type }: ConfirmationEmailRequest = await req.json();
    
    console.log('Processing confirmation email for:', { applicantEmail, applicantName, type });

    if (!applicantEmail || !applicantName) {
      console.error('Missing required fields:', { applicantEmail, applicantName });
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
      .select('sender_email, sender_name')
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

    // Use default values if no configuration is found
    const senderEmail = resendConfig?.sender_email || "noreply@amcd.de";
    const senderName = resendConfig?.sender_name || "AMCD";
    
    console.log('Using sender configuration:', { senderEmail, senderName });

    // Professional, Outlook-compatible email template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Bewerbungsbestätigung - ${senderName}</title>
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
          .highlight-box {
            background-color: #f0f9ff;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 6px 6px 0;
          }
          .highlight-box p {
            margin: 0;
            font-size: 16px;
            color: #1e40af;
            font-weight: 500;
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
                    <h1>Vielen Dank für Ihre Bewerbung!</h1>
                  </div>
                  
                  <!-- Main Content -->
                  <div class="content">
                    <div class="greeting">
                      Liebe/r ${applicantName},
                    </div>
                    
                    <p class="message">
                      wir freuen uns über Ihr Interesse an unserem Unternehmen und haben Ihre Bewerbung erfolgreich erhalten.
                    </p>
                    
                    <div class="highlight-box">
                      <p>✓ Ihre Bewerbungsunterlagen sind vollständig bei uns eingegangen und werden nun sorgfältig geprüft.</p>
                    </div>
                    
                    <p class="message">
                      Unser Recruiting-Team wird Ihre Unterlagen in den nächsten Tagen eingehend prüfen. Sie können davon ausgehen, dass Sie innerhalb einer Woche eine Rückmeldung von uns erhalten.
                    </p>
                    
                    <p class="message">
                      Sollten Sie zwischenzeitlich Fragen haben oder zusätzliche Informationen bereitstellen möchten, zögern Sie bitte nicht, uns zu kontaktieren.
                    </p>
                    
                    <div class="divider"></div>
                    
                    <div class="contact-info">
                      <h3>Kontaktinformationen</h3>
                      <p><strong>E-Mail:</strong> ${senderEmail}</p>
                      <p><strong>Unternehmen:</strong> ${senderName}</p>
                      <p>Wir sind von Montag bis Freitag, 9:00 - 17:00 Uhr für Sie da.</p>
                    </div>
                    
                    <p class="message">
                      Nochmals vielen Dank für Ihr Interesse. Wir freuen uns darauf, Sie kennenzulernen!
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

    console.log('Sending confirmation email to:', applicantEmail);

    const emailResponse = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: [applicantEmail],
      subject: "Bestätigung Ihrer Bewerbung - AMCD",
      html: emailHtml,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

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
    console.error("Error in send-application-confirmation function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send confirmation email",
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
