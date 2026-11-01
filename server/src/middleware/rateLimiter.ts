import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per hour
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  validate: {
    xForwardedForHeader: false,
    default: true
  },
  message: {
    success: false,
    error: {
      message: 'Too many messages sent from this IP. Please wait an hour before reaching out again or email directly.',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  }
});
