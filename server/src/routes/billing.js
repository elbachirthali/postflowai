import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const router = Router();
const prisma = new PrismaClient();

/**
 * Map your Paddle price IDs → internal plan names.
 * Set PADDLE_STANDARD_PRICE_ID and PADDLE_PRO_PRICE_ID in server/.env
 */
const PRICE_TO_PLAN = {
  [process.env.PADDLE_STANDARD_PRICE_ID]: 'STANDARD',
  [process.env.PADDLE_PRO_PRICE_ID]:      'PRO',
};

/**
 * Verify Paddle webhook signature (HMAC-SHA256).
 * Paddle sends: paddle-signature: ts=<timestamp>;h1=<hmac>
 */
function verifySignature(rawBody, signatureHeader, secret) {
  try {
    const parts = signatureHeader.split(';');
    const ts    = parts.find((p) => p.startsWith('ts=')).split('=')[1];
    const h1    = parts.find((p) => p.startsWith('h1=')).split('=')[1];
    const signed = `${ts}:${rawBody}`;
    const hmac   = crypto.createHmac('sha256', secret).update(signed).digest('hex');
    return hmac === h1;
  } catch {
    return false;
  }
}

/**
 * POST /api/billing/webhook
 *
 * Handles Paddle Billing events:
 *  - subscription.created  → activate plan
 *  - subscription.updated  → update plan (upgrade/downgrade)
 *  - subscription.canceled → revert to FREE
 *  - transaction.completed → one-time purchase (if ever used)
 */
router.post('/webhook', async (req, res) => {
  try {
    const secret    = process.env.PADDLE_WEBHOOK_SECRET;
    const signature = req.headers['paddle-signature'];
    const rawBody   = req.body; // raw Buffer — see index.js

    // Verify in production; skip in dev if secret is not set
    if (secret && signature) {
      if (!verifySignature(rawBody.toString(), signature, secret)) {
        return res.status(401).json({ error: 'Invalid Paddle signature' });
      }
    }

    const event = JSON.parse(rawBody.toString());
    const { event_type, data } = event;

    console.log(`[Paddle] Event received: ${event_type}`);

    // ── subscription.created / subscription.updated ──────────────────────────
    if (event_type === 'subscription.created' || event_type === 'subscription.updated') {
      const priceId    = data?.items?.[0]?.price?.id;
      const plan       = PRICE_TO_PLAN[priceId];
      const userId     = data?.custom_data?.userId;
      const email      = data?.customer?.email;

      if (!plan) {
        console.warn(`[Paddle] Unknown priceId: ${priceId}`);
        return res.json({ received: true });
      }

      if (userId) {
        await prisma.user.update({ where: { id: userId }, data: { plan } });
        console.log(`[Paddle] Plan → ${plan} for user ${userId}`);
      } else if (email) {
        await prisma.user.updateMany({ where: { email }, data: { plan } });
        console.log(`[Paddle] Plan → ${plan} for email ${email}`);
      }
    }

    // ── subscription.canceled ────────────────────────────────────────────────
    if (event_type === 'subscription.canceled') {
      const userId = data?.custom_data?.userId;
      const email  = data?.customer?.email;

      if (userId) {
        await prisma.user.update({ where: { id: userId }, data: { plan: 'FREE' } });
        console.log(`[Paddle] Plan → FREE for user ${userId}`);
      } else if (email) {
        await prisma.user.updateMany({ where: { email }, data: { plan: 'FREE' } });
        console.log(`[Paddle] Plan → FREE for email ${email}`);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('[Paddle] Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
