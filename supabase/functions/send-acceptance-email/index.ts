
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

    // Create appointment booking link - use the request origin or fallback to project URL
    const origin = req.headers.get('origin') || `https://${Deno.env.get('SUPABASE_URL')?.replace('https://', '').replace('.supabase.co', '')}.vercel.app`;
    const appointmentBookingLink = `${origin}/appointment-booking?applicationId=${applicationId}`;

    console.log('Sending acceptance email with booking link:', appointmentBookingLink);
    console.log('Using sender config:', { sender_name: config.sender_name, sender_email: config.sender_email });

    const emailResponse = await resend.emails.send({
      from: `${config.sender_name} <${config.sender_email}>`,
      to: [applicantEmail],
      subject: "Herzlichen Glückwunsch! Ihre Bewerbung wurde akzeptiert",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Herzlichen Glückwunsch!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Ihre Bewerbung wurde akzeptiert</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #333; margin-top: 0;">Liebe/r ${applicantName},</h2>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung erfolgreich war! 
              Nach sorgfältiger Prüfung Ihrer Unterlagen sind wir davon überzeugt, dass Sie 
              eine wertvolle Bereicherung für unser Team sein werden.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #28a745;">
              <h3 style="color: #28a745; margin-top: 0;">Nächste Schritte:</h3>
              <p style="color: #555; margin-bottom: 15px;">
                Um den Bewerbungsprozess abzuschließen, möchten wir Sie zu einem persönlichen 
                Telefongespräch einladen. Bitte buchen Sie einen für Sie passenden Termin über 
                den untenstehenden Link.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${appointmentBookingLink}" 
               style="background: linear-gradient(135deg, #28a745, #20c997); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      font-weight: bold; 
                      font-size: 16px;
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);">
              Termin jetzt buchen
            </a>
          </div>
          
          <div style="background: #e9ecef; padding: 20px; border-radius: 6px; margin-top: 25px;">
            <p style="color: #666; margin: 0; font-size: 14px; text-align: center;">
              <strong>Wichtiger Hinweis:</strong> Bitte buchen Sie Ihren Termin innerhalb der nächsten 7 Tage.
              Bei Fragen stehen wir Ihnen gerne zur Verfügung.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Mit freundlichen Grüßen<br>
              <strong>${config.sender_name}</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Acceptance email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      appointmentBookingLink 
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
