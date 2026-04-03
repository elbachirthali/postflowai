import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const prisma = new PrismaClient();

// List connected accounts
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const accounts = await prisma.connectedAccount.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// Connect a platform (mock OAuth)
router.post('/connect/:platform', authMiddleware, async (req, res, next) => {
  try {
    const platform = req.params.platform.toUpperCase();
    const validPlatforms = ['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'TWITTER'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}` });
    }

    // Check if already connected
    const existing = await prisma.connectedAccount.findFirst({
      where: { userId: req.userId, platform }
    });
    if (existing) {
      return res.status(409).json({ error: `${platform} is already connected` });
    }

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    // Mock OAuth — create connected account with placeholder tokens
    const account = await prisma.connectedAccount.create({
      data: {
        userId: req.userId,
        platform,
        accessToken: `mock_access_${uuidv4()}`,
        refreshToken: `mock_refresh_${uuidv4()}`,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        status: 'CONNECTED',
        profileName: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
        profileAvatar: null,
        profileUrl: `https://${platform.toLowerCase()}.com/${user.name.toLowerCase().replace(/\s+/g, '')}`
      }
    });

    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

// Disconnect account
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const account = await prisma.connectedAccount.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    await prisma.connectedAccount.delete({ where: { id: req.params.id } });
    res.json({ message: 'Account disconnected' });
  } catch (err) {
    next(err);
  }
});

// Reconnect account (refresh tokens)
router.post('/:id/reconnect', authMiddleware, async (req, res, next) => {
  try {
    const account = await prisma.connectedAccount.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const updated = await prisma.connectedAccount.update({
      where: { id: req.params.id },
      data: {
        accessToken: `mock_access_${uuidv4()}`,
        refreshToken: `mock_refresh_${uuidv4()}`,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        status: 'CONNECTED'
      }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
