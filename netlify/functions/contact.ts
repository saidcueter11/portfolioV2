import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    await resend.emails.send({
      from: "noreply@scueter.com",
      to: "saidcueter11@gmail.com",
      subject: `New contact from ${name}`,
      text: `Message: ${message}\nEmail: ${email}`,
    });

    await resend.emails.send({
      from: "noreply@scueter.com",
      to: email,
      subject: "Thanks for contacting me!",
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="color-scheme" content="light dark">
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f9fafb; color:#2D4F2B;">
      <div style="max-width:600px; margin:20px auto; padding:24px; border-radius:12px;
                  background-color:#ffffff; border:1px solid #e5e7eb; line-height:1.6;">
        
        <h2 style="margin-top:0; color:#2D4F2B;">Hi ${name},</h2>

        <p>Thank you for reaching out! I’ve received your message and will get back to you as soon as possible.</p>

        <p>Meanwhile, feel free to explore my latest projects:</p>

        <p>
          <a href="https://scueter.com" 
             style="display:inline-block; padding:12px 20px; background-color:#FFB823; color:#2D4F2B; 
                    text-decoration:none; border-radius:6px; font-weight:bold;">
            Visit My Portfolio
          </a>
        </p>

        <p style="margin-top:24px;">Best regards,<br/>
        <strong>Said Cueter</strong><br/>
        Frontend Developer</p>

        <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />

        <p style="font-size:12px; color:#6b7280;">
          This is an automated reply confirming we’ve received your message.
        </p>
      </div>
    </body>
    </html>
  `
    });




    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
