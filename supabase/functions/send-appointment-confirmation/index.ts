
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicant_name, applicant_email, appointment_date, appointment_time }: AppointmentConfirmationRequest = await req.json();

    console.log("Sending appointment confirmation email to:", applicant_email);

    // Format the date for display
    const formattedDate = new Date(appointment_date).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailResponse = await resend.emails.send({
      from: "Tech-Talent <noreply@tech-talent.de>",
      to: [applicant_email],
      subject: "Terminbestätigung - Ihr Telefontermin bei Tech-Talent",
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Terminbestätigung</title>
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
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              border-radius: 12px 12px 0 0;
              margin: -20px -20px 0 -20px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .header p {
              margin: 10px 0 0 0;
              font-size: 16px;
              opacity: 0.9;
            }
            .content {
              background: white;
              padding: 40px 30px;
              border-radius: 0 0 12px 12px;
              margin: 0 -20px -20px -20px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .appointment-details {
              background: #f1f5f9;
              padding: 24px;
              border-radius: 8px;
              margin: 24px 0;
              border-left: 4px solid #667eea;
            }
            .appointment-details h3 {
              margin: 0 0 16px 0;
              color: #1e293b;
              font-size: 18px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #475569;
            }
            .detail-value {
              color: #1e293b;
              font-weight: 500;
            }
            .important-note {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .important-note h4 {
              margin: 0 0 12px 0;
              color: #92400e;
              font-size: 16px;
            }
            .important-note p {
              margin: 0;
              color: #92400e;
            }
            .footer {
              text-align: center;
              padding: 30px 0 0 0;
              border-top: 1px solid #e2e8f0;
              margin-top: 30px;
            }
            .footer p {
              margin: 5px 0;
              color: #64748b;
              font-size: 14px;
            }
            .company-name {
              font-weight: 700;
              color: #667eea;
            }
            @media (max-width: 600px) {
              body {
                padding: 10px;
              }
              .header, .content {
                margin: 0 -10px;
              }
              .header {
                padding: 30px 20px;
              }
              .content {
                padding: 30px 20px;
              }
              .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Termin bestätigt!</h1>
            <p>Ihr Telefontermin wurde erfolgreich gebucht</p>
          </div>
          
          <div class="content">
            <p>Liebe/r ${applicant_name},</p>
            
            <p>vielen Dank für Ihre Terminbuchung! Wir freuen uns auf unser Gespräch.</p>
            
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
            
            <div class="important-note">
              <h4>📞 Wichtiger Hinweis</h4>
              <p>Bitte halten Sie sich zum vereinbarten Termin telefonisch bereit. Wir werden Sie zur angegebenen Zeit unter der von Ihnen angegebenen Telefonnummer anrufen.</p>
            </div>
            
            <p>Sollten Sie Fragen haben oder den Termin verschieben müssen, kontaktieren Sie uns bitte rechtzeitig.</p>
            
            <p>Wir freuen uns auf ein interessantes Gespräch mit Ihnen!</p>
            
            <div class="footer">
              <p class="company-name">Tech-Talent Team</p>
              <p>Ihr Partner für technische Karrieren</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Appointment confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-confirmation function:", error);
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
