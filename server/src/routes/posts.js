import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// List all posts for current user
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = { userId: req.userId };
    if (status) where.status = status;

    const posts = await prisma.post.findMany({
      where,
      include: {
        platforms: {
          include: { analytics: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.post.count({ where });
    res.json({ posts, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    next(err);
  }
});

// Get single post
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: {
        platforms: {
          include: { analytics: true }
        }
      }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Create post
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { baseIdea, mediaUrl, mediaType, contentType, platforms, scheduledAt } = req.body;
    if (!baseIdea || !platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'Base idea and at least one platform are required' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    const post = await prisma.post.create({
      data: {
        baseIdea,
        mediaUrl,
        mediaType,
        contentType: contentType || 'GENERAL',
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        userId: req.userId,
        workspaceId: user.workspaceId,
        platforms: {
          create: platforms.map(p => ({
            platform: p.platform,
            generatedCaption: p.caption || '',
            editedCaption: p.editedCaption || null,
            hashtags: p.hashtags || '',
            hookText: p.hookText || '',
            ctaText: p.ctaText || '',
            charLimit: getCharLimit(p.platform)
          }))
        }
      },
      include: { platforms: true }
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Update post
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { baseIdea, mediaUrl, mediaType, contentType, platforms, status, scheduledAt } = req.body;

    const existingPost = await prisma.post.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!existingPost) return res.status(404).json({ error: 'Post not found' });

    // Update main post fields
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        ...(baseIdea && { baseIdea }),
        ...(mediaUrl && { mediaUrl }),
        ...(mediaType && { mediaType }),
        ...(contentType && { contentType }),
        ...(status && { status }),
        ...(scheduledAt !== undefined && { scheduledAt: scheduledAt ? new Date(scheduledAt) : null })
      }
    });

    // Update platform captions if provided
    if (platforms) {
      for (const p of platforms) {
        if (p.id) {
          await prisma.postPlatform.update({
            where: { id: p.id },
            data: {
              ...(p.editedCaption !== undefined && { editedCaption: p.editedCaption }),
              ...(p.generatedCaption && { generatedCaption: p.generatedCaption }),
              ...(p.hashtags && { hashtags: p.hashtags }),
              ...(p.hookText && { hookText: p.hookText }),
              ...(p.ctaText && { ctaText: p.ctaText })
            }
          });
        }
      }
    }

    const updated = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { platforms: true }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete post
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await prisma.post.delete({ where: { id: req.params.id } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

// Publish post now
router.post('/:id/publish', authMiddleware, async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { platforms: true }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Simulate publishing to each platform
    for (const platform of post.platforms) {
      await prisma.postPlatform.update({
        where: { id: platform.id },
        data: {
          publishStatus: 'PUBLISHED',
          publishedAt: new Date(),
          externalPostId: `mock_${platform.platform}_${Date.now()}`,
          externalUrl: `https://${platform.platform}.com/post/${Date.now()}`
        }
      });

      // Create mock analytics
      await prisma.analytics.create({
        data: {
          postPlatformId: platform.id,
          views: Math.floor(Math.random() * 10000),
          engagement: Math.floor(Math.random() * 500),
          clicks: Math.floor(Math.random() * 200),
          shares: Math.floor(Math.random() * 50)
        }
      });
    }

    const updated = await prisma.post.update({
      where: { id: req.params.id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
      include: { platforms: { include: { analytics: true } } }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Schedule post
router.post('/:id/schedule', authMiddleware, async (req, res, next) => {
  try {
    const { scheduledAt } = req.body;
    if (!scheduledAt) return res.status(400).json({ error: 'scheduledAt is required' });

    const post = await prisma.post.findFirst({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const updated = await prisma.post.update({
      where: { id: req.params.id },
      data: { status: 'SCHEDULED', scheduledAt: new Date(scheduledAt) },
      include: { platforms: true }
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

function getCharLimit(platform) {
  const limits = {
    TIKTOK: 2200,
    INSTAGRAM: 2200,
    YOUTUBE: 5000,
    TWITTER: 280
  };
  return limits[platform] || 2200;
}

export default router;
