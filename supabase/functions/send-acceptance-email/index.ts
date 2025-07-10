import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AcceptanceEmailRequest {
  applicantEmail: string;
  applicantName: string;
  applicationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantEmail, applicantName, applicationId }: AcceptanceEmailRequest = await req.json();

    console.log('Processing acceptance email for:', { applicantEmail, applicantName, applicationId });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Get Resend API key
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    const resend = new Resend(resendApiKey);

    // Get sender configuration from database
    const { data: config, error: configError } = await supabase
      .from('resend_config')
      .select('sender_name, sender_email')
      .single();

    if (configError) {
      console.error('Error fetching sender config:', configError);
      throw new Error('Could not fetch sender configuration. Please configure email settings in admin panel.');
    }

    if (!config) {
      throw new Error('No email configuration found. Please configure email settings in admin panel.');
    }

    // Create appointment booking link with direct URL
    const appointmentBookingLink = `https://qdslhxpjnciozacwfyix.lovableproject.com/appointment-booking?applicationId=${applicationId}`;

    console.log('Sending acceptance email with booking link:', appointmentBookingLink);
    console.log('Using sender config:', { sender_name: config.sender_name, sender_email: config.sender_email });

    // Professional, Outlook-compatible email template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Bewerbung Angenommen - ${config.sender_name}</title>
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
          .header .subtitle {
            font-size: 18px;
            font-weight: 400;
            margin: 10px 0 0 0;
            opacity: 0.95;
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
            background-color: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 6px 6px 0;
          }
          .highlight-box p {
            margin: 0;
            font-size: 16px;
            color: #065f46;
            font-weight: 500;
          }
          .cta-section {
            background-color: #f9fafb;
            padding: 30px 25px;
            border-radius: 6px;
            margin: 30px 0;
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .cta-section h3 {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
          }
          .cta-section p {
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #6b7280;
            line-height: 1.6;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            transition: all 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          }
          .important-note {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 6px 6px 0;
          }
          .important-note h4 {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin: 0 0 10px 0;
          }
          .important-note p {
            margin: 0;
            font-size: 14px;
            color: #92400e;
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
                    <h1>Herzlichen Glückwunsch!</h1>
                    <p class="subtitle">Ihre Bewerbung wurde akzeptiert</p>
                  </div>
                  
                  <!-- Main Content -->
                  <div class="content">
                    <div class="greeting">
                      Liebe/r ${applicantName},
                    </div>
                    
                    <p class="message">
                      wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung erfolgreich war! 
                      Nach sorgfältiger Prüfung Ihrer Unterlagen sind wir davon überzeugt, dass Sie 
                      eine wertvolle Bereicherung für unser Team sein werden.
                    </p>
                    
                    <div class="highlight-box">
                      <p>✓ Ihre Bewerbung wurde erfolgreich angenommen und Sie sind für die nächste Phase qualifiziert.</p>
                    </div>
                    
                    <p class="message">
                      Um den Bewerbungsprozess abzuschließen, möchten wir Sie zu einem persönlichen 
                      Telefongespräch einladen. Dieses Gespräch bietet uns die Möglichkeit, Sie besser 
                      kennenzulernen und offene Fragen zu besprechen.
                    </p>
                    
                    <div class="cta-section">
                      <h3>Nächster Schritt: Terminbuchung</h3>
                      <p>
                        Bitte buchen Sie einen für Sie passenden Termin über den untenstehenden Link. 
                        Das Gespräch wird etwa 30 Minuten dauern und findet telefonisch statt.
                      </p>
                      <a href="${appointmentBookingLink}" class="cta-button">
                        Termin jetzt buchen
                      </a>
                    </div>
                    
                    <div class="important-note">
                      <h4>Wichtiger Hinweis</h4>
                      <p>
                        Bitte buchen Sie Ihren Termin innerhalb der nächsten 7 Tage. 
                        Bei Fragen oder technischen Problemen stehen wir Ihnen gerne zur Verfügung.
                      </p>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <p class="message">
                      Wir freuen uns sehr auf das Gespräch mit Ihnen und darauf, Sie bald in unserem Team begrüßen zu dürfen!
                    </p>
                  </div>
                  
                  <!-- Footer -->
                  <div class="footer">
                    <p>Mit freundlichen Grüßen</p>
                    <p class="company-name">Ihr ${config.sender_name} Team</p>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #374151;">
                      <p style="font-size: 12px;">Diese E-Mail wurde automatisch generiert. Bei Fragen können Sie uns gerne kontaktieren.</p>
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

    console.log('Sending acceptance email to:', applicantEmail);

    const emailResponse = await resend.emails.send({
      from: `${config.sender_name} <${config.sender_email}>`,
      to: [applicantEmail],
      subject: "Herzlichen Glückwunsch! Ihre Bewerbung wurde akzeptiert",
      html: emailHtml,
    });

    console.log("Acceptance email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      appointmentBookingLink,
      senderUsed: `${config.sender_name} <${config.sender_email}>`
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-acceptance-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
