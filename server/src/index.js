import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes     from './routes/auth.js';
import postRoutes     from './routes/posts.js';
import accountRoutes  from './routes/accounts.js';
import aiRoutes       from './routes/ai.js';
import analyticsRoutes from './routes/analytics.js';
import billingRoutes  from './routes/billing.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

/**
 * The Paddle webhook route needs the raw request body for HMAC verification,
 * so it must be registered BEFORE express.json() strips the raw bytes.
 */
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }));

// All other routes use JSON body parsing
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/auth',      authRoutes);
app.use('/api/posts',     postRoutes);
app.use('/api/accounts',  accountRoutes);
app.use('/api/ai',        aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/billing',   billingRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 PostUnivers Server running on http://localhost:${PORT}`);
});
