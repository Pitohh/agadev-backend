import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { translateText } from '../services/translation.js';

const router = express.Router();

// Get all projects (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, lang = 'fr' } = req.query;
    const offset = (page - 1) * limit;

    const titleField = lang === 'en' ? 'title_en' : 'title_fr';
    const descriptionField = lang === 'en' ? 'description_en' : 'description_fr';
    const contentField = lang === 'en' ? 'content_en' : 'content_fr';

    let queryText = `
      SELECT id,
             ${titleField} as title, ${descriptionField} as description, ${contentField} as content,
             slug, cover_image_url, presentation_file_url, status, start_date, end_date, location, partners, created_at
      FROM projects
      WHERE published = true
    `;
    const params = [];

    if (status) {
      queryText += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    const countResult = await query('SELECT COUNT(*) FROM projects WHERE published = true');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      projects: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by slug (PUBLIC)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang = 'fr' } = req.query;

    const titleField = lang === 'en' ? 'title_en' : 'title_fr';
    const descriptionField = lang === 'en' ? 'description_en' : 'description_fr';
    const contentField = lang === 'en' ? 'content_en' : 'content_fr';

    const result = await query(
      `SELECT id,
              ${titleField} as title, ${descriptionField} as description, ${contentField} as content,
              slug, cover_image_url, presentation_file_url, status, start_date, end_date, location, partners, created_at
       FROM projects
       WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error('Get project by slug error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Get all projects (ADMIN)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT id, title_fr, title_en, description_fr, slug, cover_image_url, presentation_file_url,
              status, published, start_date, end_date, created_at, updated_at
       FROM projects
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM projects');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      projects: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create project
router.post('/',
  authenticate,
  [
    body('title_fr').notEmpty().withMessage('French title is required'),
    body('description_fr').notEmpty().withMessage('French description is required'),
    body('content_fr').notEmpty().withMessage('French content is required'),
    body('status').optional().isIn(['active', 'completed', 'planned']),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { title_fr, title_en, description_fr, description_en, content_fr, content_en,
            slug, cover_image_url, presentation_file_url, status = 'active', start_date, end_date,
            budget, location, partners, published = false, auto_translate = false } = req.body;

      // Auto-translate if requested
      if (auto_translate) {
        if (!title_en && title_fr) {
          title_en = await translateText(title_fr, 'FR', 'EN-US');
        }
        if (!description_en && description_fr) {
          description_en = await translateText(description_fr, 'FR', 'EN-US');
        }
        if (!content_en && content_fr) {
          content_en = await translateText(content_fr, 'FR', 'EN-US');
        }
      }

      // Generate slug
      if (!slug) {
        slug = title_fr
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      const result = await query(
        `INSERT INTO projects (
          title_fr, title_en, description_fr, description_en, content_fr, content_en,
          slug, cover_image_url, presentation_file_url, status, start_date, end_date, budget, location, partners, published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *`,
        [title_fr, title_en, description_fr, description_en, content_fr, content_en,
         slug, cover_image_url, presentation_file_url, status, start_date, end_date, budget, location, partners, published]
      );

      res.status(201).json({ project: result.rows[0] });
    } catch (error) {
      console.error('Create project error:', error);
      if (error.code === '23505') {
        return res.status(400).json({ error: 'A project with this slug already exists' });
      }
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// Update project
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    let { title_fr, title_en, description_fr, description_en, content_fr, content_en,
          slug, cover_image_url, presentation_file_url, status, start_date, end_date, budget, location,
          partners, published, auto_translate = false } = req.body;

    // Auto-translate if requested
    if (auto_translate) {
      if (!title_en && title_fr) {
        title_en = await translateText(title_fr, 'FR', 'EN-US');
      }
      if (!description_en && description_fr) {
        description_en = await translateText(description_fr, 'FR', 'EN-US');
      }
      if (!content_en && content_fr) {
        content_en = await translateText(content_fr, 'FR', 'EN-US');
      }
    }

    // Generate slug if needed
    if (!slug && title_fr) {
      slug = title_fr
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const result = await query(
      `UPDATE projects SET
        title_fr = $2, title_en = $3, description_fr = $4, description_en = $5,
        content_fr = $6, content_en = $7, slug = $8, cover_image_url = $9,
        presentation_file_url = $10, status = $11, start_date = $12, end_date = $13, budget = $14,
        location = $15, partners = $16, published = $17
       WHERE id = $1
       RETURNING *`,
      [id, title_fr, title_en, description_fr, description_en, content_fr, content_en,
       slug, cover_image_url, presentation_file_url, status, start_date, end_date, budget, location, partners, published]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Toggle publish status
router.patch('/:id/publish', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

    const result = await query(
      'UPDATE projects SET published = $1 WHERE id = $2 RETURNING *',
      [published, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;