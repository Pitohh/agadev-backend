import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { translateText } from '../services/translation.js';

const router = express.Router();

// Get all news (PUBLIC - with filters)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, lang = 'fr' } = req.query;
    const offset = (page - 1) * limit;
    
    const titleField = lang === 'en' ? 'title_en' : 'title_fr';
    const excerptField = lang === 'en' ? 'excerpt_en' : 'excerpt_fr';
    const contentField = lang === 'en' ? 'content_en' : 'content_fr';
    
    const result = await query(
      `SELECT id, 
              ${titleField} as title, ${excerptField} as excerpt, ${contentField} as content,
              slug, cover_image_url, publish_date, created_at
       FROM news 
       WHERE published = true 
       ORDER BY publish_date DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM news WHERE published = true');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      news: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get single news by slug (PUBLIC)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang = 'fr' } = req.query;
    
    const titleField = lang === 'en' ? 'title_en' : 'title_fr';
    const excerptField = lang === 'en' ? 'excerpt_en' : 'excerpt_fr';
    const contentField = lang === 'en' ? 'content_en' : 'content_fr';
    
    const result = await query(
      `SELECT id, 
              ${titleField} as title, ${excerptField} as excerpt, ${contentField} as content,
              slug, cover_image_url, publish_date, created_at
       FROM news 
       WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json({ news: result.rows[0] });
  } catch (error) {
    console.error('Get news by slug error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get all news (ADMIN - no filters)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const result = await query(
      `SELECT id, title_fr, title_en, excerpt_fr, slug, cover_image_url, 
              published, publish_date, created_at, updated_at
       FROM news 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM news');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      news: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create news
router.post('/',
  authenticate,
  [
    body('title_fr').notEmpty().withMessage('French title is required'),
    body('content_fr').notEmpty().withMessage('French content is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { title_fr, title_en, content_fr, content_en, excerpt_fr, excerpt_en,
            slug, cover_image_url, published = false, auto_translate = false } = req.body;

      // Auto-translate if requested and English versions are empty
      if (auto_translate) {
        if (!title_en && title_fr) {
          title_en = await translateText(title_fr, 'FR', 'EN-US');
        }
        if (!content_en && content_fr) {
          content_en = await translateText(content_fr, 'FR', 'EN-US');
        }
        if (!excerpt_en && excerpt_fr) {
          excerpt_en = await translateText(excerpt_fr, 'FR', 'EN-US');
        }
      }

      // Generate slug from title if not provided
      if (!slug) {
        slug = title_fr
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      const publish_date = published ? new Date() : null;

      const result = await query(
        `INSERT INTO news (title_fr, title_en, content_fr, content_en, excerpt_fr, excerpt_en, 
                          slug, cover_image_url, published, publish_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [title_fr, title_en, content_fr, content_en, excerpt_fr, excerpt_en,
         slug, cover_image_url, published, publish_date]
      );

      res.status(201).json({ news: result.rows[0] });
    } catch (error) {
      console.error('Create news error:', error);
      if (error.code === '23505') {
        return res.status(400).json({ error: 'A news with this slug already exists' });
      }
      res.status(500).json({ error: 'Failed to create news' });
    }
  }
);

// Update news
router.put('/:id',
  authenticate,
  [
    body('title_fr').optional().notEmpty(),
    body('content_fr').optional().notEmpty(),
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      let { title_fr, title_en, content_fr, content_en, excerpt_fr, excerpt_en,
            slug, cover_image_url, published, auto_translate = false } = req.body;

      // Auto-translate if requested
      if (auto_translate) {
        if (!title_en && title_fr) {
          title_en = await translateText(title_fr, 'FR', 'EN-US');
        }
        if (!content_en && content_fr) {
          content_en = await translateText(content_fr, 'FR', 'EN-US');
        }
        if (!excerpt_en && excerpt_fr) {
          excerpt_en = await translateText(excerpt_fr, 'FR', 'EN-US');
        }
      }

      // Generate slug if title changed
      if (!slug && title_fr) {
        slug = title_fr
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      const result = await query(
        `UPDATE news SET 
          title_fr = $2, content_fr = $3, excerpt_fr = $4,
          title_en = $5, content_en = $6, excerpt_en = $7,
          cover_image_url = $8, published = $9, slug = $10
         WHERE id = $1 
         RETURNING *`,
        [id, title_fr, content_fr, excerpt_fr, title_en, content_en, excerpt_en,
         cover_image_url, published, slug]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'News not found' });
      }

      res.json({ news: result.rows[0] });
    } catch (error) {
      console.error('Update news error:', error);
      res.status(500).json({ error: 'Failed to update news' });
    }
  }
);

// Toggle publish status
router.patch('/:id/publish', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;
    const publish_date = published ? new Date() : null;

    const result = await query(
      'UPDATE news SET published = $1, publish_date = $2 WHERE id = $3 RETURNING *',
      [published, publish_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json({ news: result.rows[0] });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Delete news
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM news WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

export default router;