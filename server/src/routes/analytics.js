import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Overview analytics
router.get('/overview', authMiddleware, async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId: req.userId, status: 'PUBLISHED' },
      include: {
        platforms: {
          include: { analytics: true }
        }
      }
    });

    let totalViews = 0, totalEngagement = 0, totalClicks = 0, totalShares = 0;
    const platformStats = {};

    for (const post of posts) {
      for (const platform of post.platforms) {
        if (!platformStats[platform.platform]) {
          platformStats[platform.platform] = { views: 0, engagement: 0, clicks: 0, shares: 0, posts: 0 };
        }
        platformStats[platform.platform].posts++;
        for (const a of platform.analytics) {
          totalViews += a.views;
          totalEngagement += a.engagement;
          totalClicks += a.clicks;
          totalShares += a.shares;
          platformStats[platform.platform].views += a.views;
          platformStats[platform.platform].engagement += a.engagement;
          platformStats[platform.platform].clicks += a.clicks;
          platformStats[platform.platform].shares += a.shares;
        }
      }
    }

    res.json({
      totalPosts: posts.length,
      totalViews,
      totalEngagement,
      totalClicks,
      totalShares,
      engagementRate: totalViews > 0 ? ((totalEngagement / totalViews) * 100).toFixed(2) : 0,
      platformStats,
      // Mock trend data for chart
      trend: generateMockTrend(30)
    });
  } catch (err) {
    next(err);
  }
});

// Per-post analytics
router.get('/post/:postId', authMiddleware, async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: req.params.postId, userId: req.userId },
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

function generateMockTrend(days) {
  const trend = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    trend.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 5000) + 500,
      engagement: Math.floor(Math.random() * 300) + 20,
      clicks: Math.floor(Math.random() * 100) + 5
    });
  }
  return trend;
}

export default router;
