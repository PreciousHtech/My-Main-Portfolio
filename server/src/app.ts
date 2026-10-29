import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Security headers with helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Let dev server and Vite handle CSP
      crossOriginEmbedderPolicy: false
    })
  );

  // CORS configuration supporting single origin or comma-separated CLIENT_ORIGIN list
  const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (process.env.APP_URL) {
    configuredOrigins.push(process.env.APP_URL.trim());
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin) return callback(null, true);
        if (configuredOrigins.length === 0) return callback(null, true);

        const isAllowed =
          configuredOrigins.includes(origin) ||
          configuredOrigins.includes('*') ||
          origin.includes('localhost') ||
          origin.includes('127.0.0.1') ||
          origin.endsWith('.run.app') ||
          origin.endsWith('.vercel.app') ||
          origin.endsWith('.netlify.app');

        if (isAllowed) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} blocked by CORS policy`));
        }
      },
      credentials: true
    })
  );

  // Body parsing
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Precious Hart Portfolio API'
      }
    });
  });

  // Mount API endpoints
  app.use('/api/projects', projectsRouter);
  app.use('/api/contact', contactRouter);

  // Central error handling
  app.use(errorHandler);

  return app;
}
