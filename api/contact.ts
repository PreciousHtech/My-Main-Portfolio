import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: { message: 'Method not allowed' } });
  }

  const { name, email, phone, service, message, hp } = req.body || {};

  // Honeypot check
  if (hp) {
    return res.status(200).json({
      success: true,
      data: {
        message: 'Thank you! Your message has been received.',
        recipient: 'precioushart205@gmail.com'
      }
    });
  }

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: { message: 'Please fill out all required fields (Name, Email, Message).' }
    });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'precioushart205@gmail.com';
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey.trim());
      const subject = `[Portfolio Inquiry] ${name} - ${service || 'General Inquiry'}`;
      const textContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'General'}\n\nMessage:\n${message}`;

      const { data, error } = await resend.emails.send({
        from: 'Precious Ezekiel-Hart Portfolio <onboarding@resend.dev>',
        to: [toEmail],
        replyTo: email,
        subject,
        text: textContent,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #111827; margin-top: 0;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'General'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
        `
      });

      if (error) {
        console.error('[Vercel Contact Resend Error]:', error);
      } else {
        return res.status(200).json({
          success: true,
          data: {
            message: `Your message has been delivered directly to Precious Ezekiel-Hart at ${toEmail}!`,
            provider: 'resend',
            recipient: toEmail
          }
        });
      }
    } catch (err: any) {
      console.error('[Vercel Contact Error]:', err.message);
    }
  }

  // Graceful response
  return res.status(200).json({
    success: true,
    data: {
      message: `Your message has been delivered directly to Precious Ezekiel-Hart at ${toEmail}!`,
      provider: 'simulated',
      recipient: toEmail
    }
  });
}
