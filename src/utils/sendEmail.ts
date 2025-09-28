import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body);

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "saidcueter11@gmail.com",
      subject: `New contact from ${name}`,
      text: `Message: ${message}\nEmail: ${email}`,
    });

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me!",
      text: `Hi ${name},\n\nThank you for reaching out! I’ll get back to you shortly.\n\nBest,\nSaid Cueter`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}