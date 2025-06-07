
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  vorname: string;
  nachname: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vorname, nachname, email }: ConfirmationEmailRequest = await req.json();

    console.log(`Sending confirmation email to: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "AMCD Consult <noreply@amcd-agentur.de>",
      to: [email],
      subject: "Bestätigung Ihrer Bewerbung - AMCD Consult GmbH",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bewerbungsbestätigung</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <img src="https://i.imgur.com/bJnPIVv.png" alt="AMCD Logo" style="height: 50px; width: auto; margin-bottom: 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Vielen Dank für Ihre Bewerbung!</h1>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px;">
              <p style="color: #374151; font-size: 18px; margin-bottom: 20px;">Liebe/r ${vorname} ${nachname},</p>
              
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 20px;">
                vielen Dank für Ihr Interesse an der Position <strong>Assistenz im digitalen Projektmanagement (m/w/d)</strong> bei der AMCD Consult GmbH.
              </p>
              
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 20px;">
                Wir haben Ihre Bewerbungsunterlagen erfolgreich erhalten und werden diese sorgfältig prüfen. 
                Sie können davon ausgehen, dass wir uns innerhalb der nächsten <strong>2 Wochen</strong> bei Ihnen melden.
              </p>
              
              <!-- Info box -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 6px;">
                <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">Was passiert als nächstes?</h3>
                <ul style="color: #075985; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Unser HR-Team prüft Ihre Unterlagen</li>
                  <li>Bei positiver Ersteinschätzung laden wir Sie zu einem Gespräch ein</li>
                  <li>Sie erhalten von uns eine Rückmeldung - in jedem Fall</li>
                </ul>
              </div>
              
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 30px;">
                Sollten Sie noch Fragen haben, können Sie uns gerne unter 
                <a href="mailto:info@amcd-agentur.de" style="color: #667eea; text-decoration: none;">info@amcd-agentur.de</a> 
                oder telefonisch unter <a href="tel:+498941435250" style="color: #667eea; text-decoration: none;">+49 89 41435250</a> erreichen.
              </p>
              
              <p style="color: #6b7280; font-size: 16px; margin-bottom: 10px;">
                Mit freundlichen Grüßen
              </p>
              <p style="color: #374151; font-size: 16px; font-weight: 600; margin: 0;">
                Ihr AMCD Consult Team
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <div style="margin-bottom: 20px;">
                <strong style="color: #374151; font-size: 16px;">AMCD Consult GmbH</strong>
              </div>
              <div style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                Rubensstr. 13<br>
                81245 München<br>
                Deutschland<br><br>
                <a href="tel:+498941435250" style="color: #667eea; text-decoration: none;">+49 89 41435250</a> | 
                <a href="mailto:info@amcd-agentur.de" style="color: #667eea; text-decoration: none;">info@amcd-agentur.de</a><br>
                <a href="https://amcd-agentur.de" style="color: #667eea; text-decoration: none;">www.amcd-agentur.de</a>
              </div>
            </div>
          </div>
          
          <!-- Disclaimer -->
          <div style="max-width: 600px; margin: 20px auto; text-align: center; color: #9ca3af; font-size: 12px;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
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
