import { Router, Request, Response, NextFunction } from 'express';
import { contactSchema } from '../validators/contact.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';
import { MailerService } from '../services/mailer.js';

const router = Router();

// POST /api/contact - validate, check honeypot, rate-limit, dispatch email
router.post('/', contactRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = contactSchema.parse(req.body);

    // Honeypot spam check: if filled, quietly return success without sending
    if (parsed.hp && parsed.hp.trim() !== '') {
      console.warn('Honeypot field triggered by bot submission.');
      res.json({
        success: true,
        data: {
          message: 'Thank you! Your message has been received.',
          provider: 'honeypot',
          recipient: process.env.CONTACT_TO_EMAIL || 'precioushart205@gmail.com'
        }
      });
      return;
    }

    const result = await MailerService.sendContactEmail(parsed);

    res.json({
      success: true,
      data: {
        message: `Your message has been delivered directly to Precious Ezekiel-Hart at ${result.recipient}!`,
        provider: result.provider,
        recipient: result.recipient
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
