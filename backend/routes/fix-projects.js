import express from 'express';
import { query } from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route pour réparer tous les projets
router.post('/fix-all-projects', authenticate, requireAdmin, async (req, res) => {
  try {
    const { image_url } = req.body;
    
    const defaultImage = image_url || 'https://res.cloudinary.com/dovuamrec/image/upload/v1766515423/agadev/file_kawv7q.jpg';
    
    // 1. Fix le projet id:4
    await query(
      `UPDATE projects 
       SET published = true, 
           cover_image_url = $1,
           status = 'active',
           updated_at = NOW()
       WHERE id = 4`,
      [defaultImage]
    );
    
    // 2. Fix tous les autres projets
    const otherProjects = await query(
      `UPDATE projects 
       SET cover_image_url = $1,
           published = true,
           updated_at = NOW()
       WHERE id != 4 AND (cover_image_url IS NULL OR cover_image_url = '')
       RETURNING COUNT(*) as updated_count`,
      [defaultImage]
    );
    
    // 3. Fix les news
    const newsResult = await query(
      `UPDATE news 
       SET cover_image_url = $1,
           updated_at = NOW()
       WHERE cover_image_url IS NULL OR cover_image_url = ''
       RETURNING COUNT(*) as updated_count`,
      [defaultImage]
    );
    
    // 4. Vérification
    const verification = await query(`
      SELECT 
        (SELECT COUNT(*) FROM projects WHERE cover_image_url LIKE '%cloudinary%') as projects_with_image,
        (SELECT COUNT(*) FROM projects WHERE published = true) as projects_published,
        (SELECT COUNT(*) FROM news WHERE cover_image_url LIKE '%cloudinary%') as news_with_image
    `);
    
    res.json({
      success: true,
      message: 'All projects and news have been fixed',
      results: {
        project_4_fixed: true,
        other_projects_updated: parseInt(otherProjects.rows[0].updated_count),
        news_updated: parseInt(newsResult.rows[0].updated_count),
        verification: verification.rows[0]
      }
    });
    
  } catch (error) {
    console.error('Fix projects error:', error);
    res.status(500).json({ error: 'Failed to fix projects' });
  }
});

// Route pour voir l'état actuel
router.get('/status', authenticate, async (req, res) => {
  try {
    const projects = await query(`
      SELECT id, title_fr, cover_image_url, published, 
             CASE 
               WHEN cover_image_url LIKE '%cloudinary%' THEN '✅'
               WHEN cover_image_url IS NULL OR cover_image_url = '' THEN '❌'
               ELSE '⚠️'
             END as image_status
      FROM projects 
      ORDER BY id
    `);
    
    const news = await query(`
      SELECT id, title_fr, cover_image_url,
             CASE 
               WHEN cover_image_url LIKE '%cloudinary%' THEN '✅'
               WHEN cover_image_url IS NULL OR cover_image_url = '' THEN '❌'
               ELSE '⚠️'
             END as image_status
      FROM news 
      ORDER BY id
    `);
    
    res.json({
      success: true,
      projects: {
        total: projects.rows.length,
        with_cloudinary: projects.rows.filter(p => p.image_status === '✅').length,
        without_image: projects.rows.filter(p => p.image_status === '❌').length,
        details: projects.rows
      },
      news: {
        total: news.rows.length,
        with_cloudinary: news.rows.filter(n => n.image_status === '✅').length,
        without_image: news.rows.filter(n => n.image_status === '❌').length,
        details: news.rows
      }
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

export default router;
