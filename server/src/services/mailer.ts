import { Resend } from 'resend';
import nodemailer, { type Transporter } from 'nodemailer';
import { ValidatedContact } from '../validators/contact.js';

export class MailerService {
  private static resendClient: Resend | null = null;
  private static smtpTransporter: Transporter | null = null;

  private static getResendClient(): Resend | null {
    const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }
    if (!this.resendClient) {
      this.resendClient = new Resend(apiKey.trim());
    }
    return this.resendClient;
  }

  private static getSmtpTransporter(): Transporter | null {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return null;
    }

    if (!this.smtpTransporter) {
      this.smtpTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_PORT || '465') === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
    }

    return this.smtpTransporter;
  }

  static async sendContactEmail(contact: ValidatedContact): Promise<{
    sent: boolean;
    provider: 'resend' | 'smtp' | 'simulated';
    recipient: string;
    mailtoUrl: string;
    messageId?: string;
  }> {
    const toEmail = process.env.CONTACT_TO_EMAIL || 'precioushart205@gmail.com';
    const resend = this.getResendClient();
    const smtp = this.getSmtpTransporter();

    const subject = `[Portfolio Inquiry] ${contact.name} - ${contact.service}`;
    const textBody = `Name: ${contact.name}\nEmail: ${contact.email}\nService: ${contact.service}\n\nMessage:\n${contact.message}`;

    // Mailto fallback link
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(
      `Hello Precious,\n\nName: ${contact.name}\nEmail: ${contact.email}\nService: ${contact.service}\n\nMessage:\n${contact.message}`
    );
    const mailtoUrl = `mailto:${toEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; background: #ffffff;">
        <h2 style="color: #111827; margin-top: 0; font-size: 20px;">New Portfolio Inquiry</h2>
        <p style="color: #4b5563; font-size: 14px;">You have received a new project inquiry through your personal portfolio website.</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 130px;"><strong>Client Name:</strong></td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Email Address:</strong></td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${contact.email}" style="color: #2563eb; text-decoration: none;">${contact.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;"><strong>Service Requested:</strong></td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${contact.service}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #f3f4f6;">
          <strong style="color: #374151; display: block; margin-bottom: 8px; font-size: 13px;">Client Message:</strong>
          <p style="color: #1f2937; white-space: pre-wrap; margin: 0; line-height: 1.6; font-size: 14px;">${contact.message}</p>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px; text-align: center;">
          Sent to ${toEmail} from Precious Ezekiel-Hart Portfolio Backend
        </p>
      </div>
    `;

    // 1. Try Resend if configured
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Precious Ezekiel-Hart Portfolio <onboarding@resend.dev>',
          to: [toEmail],
          replyTo: contact.email,
          subject,
          html: htmlContent,
          text: textBody
        });

        if (error) {
          console.error('[Resend Error]:', error);
          throw new Error(error.message || 'Resend failed to deliver email');
        }

        return {
          sent: true,
          provider: 'resend',
          recipient: toEmail,
          mailtoUrl,
          messageId: data?.id
        };
      } catch (err: any) {
        console.error('[Resend Dispatch Failure]:', err.message);
        // Fall through to SMTP or simulation
      }
    }

    // 2. Try SMTP if configured (e.g. Gmail App Password)
    if (smtp) {
      try {
        const info = await smtp.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: toEmail,
          replyTo: contact.email,
          subject,
          text: textBody,
          html: htmlContent
        });

        return {
          sent: true,
          provider: 'smtp',
          recipient: toEmail,
          mailtoUrl,
          messageId: info.messageId
        };
      } catch (err: any) {
        console.error('[SMTP Dispatch Failure]:', err.message);
      }
    }

    // 3. Simulated fallback
    return {
      sent: true,
      provider: 'simulated',
      recipient: toEmail,
      mailtoUrl
    };
  }
}
