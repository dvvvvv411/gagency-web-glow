
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

    // Simple, lightweight email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Vielen Dank für Ihre Bewerbung!</h2>
        <p>Liebe/r ${applicantName},</p>
        <p>wir haben Ihre Bewerbung erfolgreich erhalten und werden diese sorgfältig prüfen.</p>
        <p>Sie hören innerhalb der nächsten Tage von uns.</p>
        <p>Bei Fragen können Sie uns jederzeit kontaktieren.</p>
        <br>
        <p>Mit freundlichen Grüßen<br>Ihr ${senderName} Team</p>
      </div>
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
