import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { generateCaptions, classifyContent, suggestBestTime } from '../services/ai.js';

const router = Router();

// Generate AI captions for multiple platforms
router.post('/generate-captions', authMiddleware, async (req, res, next) => {
  try {
    const { baseIdea, platforms, tone, contentType } = req.body;
    if (!baseIdea || !platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'baseIdea and platforms array are required' });
    }

    const captions = await generateCaptions(baseIdea, platforms, { tone, contentType });
    res.json({ captions });
  } catch (err) {
    next(err);
  }
});

// Classify content type
router.post('/classify-content', authMiddleware, async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content is required' });

    const classification = await classifyContent(content);
    res.json(classification);
  } catch (err) {
    next(err);
  }
});

// Suggest best posting time
router.post('/suggest-time', authMiddleware, async (req, res, next) => {
  try {
    const { platforms, contentType } = req.body;
    const suggestions = suggestBestTime(platforms || [], contentType);
    res.json({ suggestions });
  } catch (err) {
    next(err);
  }
});

export default router;
