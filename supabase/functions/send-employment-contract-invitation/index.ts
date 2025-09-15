import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.10';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  applicantEmail: string;
  applicantName: string;
  appointmentId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Employment contract invitation function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }

  try {
    const { applicantEmail, applicantName, appointmentId }: EmailRequest = await req.json();
    console.log('Request data:', { applicantEmail, applicantName, appointmentId });

    if (!applicantEmail || !applicantName || !appointmentId) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: applicantEmail, applicantName, appointmentId' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Resend configuration
    console.log('Fetching Resend configuration...');
    const { data: resendConfig, error: configError } = await supabase
      .from('resend_config')
      .select('sender_email, sender_name')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (configError) {
      console.error('Error fetching Resend config:', configError);
      throw new Error('Failed to fetch email configuration');
    }

    if (!resendConfig) {
      console.error('No Resend configuration found');
      throw new Error('Email configuration not found. Please configure Resend settings in the admin panel.');
    }

    console.log('Using Resend config:', { 
      sender_email: resendConfig.sender_email, 
      sender_name: resendConfig.sender_name 
    });

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found');
      throw new Error('Resend API key not configured');
    }

    const resend = new Resend(resendApiKey);

    // Create employment contract link with custom domain
    const contractUrl = `https://ingenio-europe.de/employment-contract?appointment=${appointmentId}`;

    // Send email
    console.log('Sending employment contract invitation email...');
    const emailResponse = await resend.emails.send({
      from: `${resendConfig.sender_name} <${resendConfig.sender_email}>`,
      to: [applicantEmail],
      subject: 'Herzlichen Glückwunsch - Nächste Schritte für Ihren Arbeitsvertrag',
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Arbeitsvertrag - Nächste Schritte</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background-color: white;
              border-radius: 12px;
              padding: 32px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 2px solid #e2e8f0;
            }
            .success-icon {
              width: 64px;
              height: 64px;
              background-color: #10b981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 16px;
              font-size: 32px;
              color: white;
            }
            h1 {
              color: #1e293b;
              font-size: 24px;
              font-weight: 700;
              margin: 0 0 8px 0;
            }
            .subtitle {
              color: #64748b;
              font-size: 16px;
              margin: 0;
            }
            .content {
              margin-bottom: 32px;
            }
            .content p {
              margin-bottom: 16px;
              color: #475569;
              font-size: 16px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              text-align: center;
              margin: 24px 0;
              box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
              transition: all 0.2s ease;
            }
            .cta-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.4);
            }
            .info-box {
              background-color: #f1f5f9;
              border: 1px solid #cbd5e1;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .info-box h3 {
              color: #1e293b;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 12px 0;
            }
            .info-box ul {
              margin: 0;
              padding-left: 20px;
              color: #475569;
            }
            .info-box li {
              margin-bottom: 8px;
            }
            .footer {
              text-align: center;
              padding-top: 24px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✓</div>
              <h1>Herzlichen Glückwunsch!</h1>
              <p class="subtitle">Ihr Vorstellungsgespräch war erfolgreich</p>
            </div>
            
            <div class="content">
              <p><strong>Liebe/r ${applicantName},</strong></p>
              
              <p>wir freuen uns, Ihnen mitteilen zu können, dass Ihr Vorstellungsgespräch sehr erfolgreich verlaufen ist! Wir sind beeindruckt von Ihren Qualifikationen und möchten Sie gerne in unserem Team begrüßen.</p>
              
              <p>Um den Einstellungsprozess abzuschließen, bitten wir Sie, das folgende Arbeitsvertrag-Formular auszufüllen:</p>
              
              <div style="text-align: center;">
                <a href="${contractUrl}" class="cta-button">
                  Arbeitsvertrag-Formular ausfüllen
                </a>
              </div>
              
              <div class="info-box">
                <h3>Was Sie für das Formular benötigen:</h3>
                <ul>
                  <li>Ihre vollständigen persönlichen Daten</li>
                  <li>Bankverbindung (IBAN, BIC, Kontoinhaber)</li>
                  <li>Steuerliche Informationen (Steuer-ID, Steuerklasse)</li>
                  <li>Sozialversicherungsnummer</li>
                  <li>Krankenversicherung</li>
                  <li>Kopien Ihres Personalausweises (Vorder- und Rückseite)</li>
                </ul>
              </div>
              
              <p>Bitte füllen Sie das Formular zeitnah aus, damit wir Ihren Arbeitsvertrag vorbereiten können. Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
              
              <p>Wir freuen uns auf die Zusammenarbeit mit Ihnen!</p>
            </div>
            
            <div class="footer">
              <p>Mit freundlichen Grüßen<br><strong>${resendConfig.sender_name}</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Employment contract invitation sent successfully',
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-employment-contract-invitation function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send employment contract invitation',
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
