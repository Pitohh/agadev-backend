import express from 'express';
import multer from 'multer';
import { query } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Configuration multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|xls|xlsx/;
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  }
});

// GET tous les médias
router.get('/', authenticate, async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const result = await query(
      `SELECT m.*, u.username as uploader_name
       FROM media m
       LEFT JOIN users u ON m.uploader_id = u.id
       ORDER BY m.created_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    const countResult = await query('SELECT COUNT(*) FROM media');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      media: result.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total,
        hasMore: (parseInt(offset) + result.rows.length) < total
      }
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch media' 
    });
  }
});

// POST upload un fichier (version corrigée)
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    console.log('📤 Upload request received');
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'Aucun fichier fourni' 
      });
    }

    console.log('📄 File:', {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      userId: req.user.id
    });

    const { entity_type, entity_id } = req.body;
    
    // Pour l'instant, stockage simple (comme media-simple.js)
    const result = await query(
      `INSERT INTO media 
       (filename, original_name, url, mime_type, size, uploader_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        `media-${Date.now()}-${req.file.originalname}`,
        req.file.originalname,
        '#', // URL placeholder
        req.file.mimetype,
        req.file.size,
        req.user.id  // UUID directement
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Fichier uploadé avec succès',
      media: result.rows[0],
      note: 'Le fichier est stocké localement'
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Échec de l\'upload',
      details: error.message
    });
  }
});

// DELETE supprimer un média
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'DELETE FROM media WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Fichier non trouvé' 
      });
    }
    
    res.json({
      success: true,
      message: 'Fichier supprimé avec succès'
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete media' 
    });
  }
});

export default router;
