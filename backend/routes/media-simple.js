import express from 'express';
import multer from 'multer';
import { query } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Configuration multer la plus simple possible
const upload = multer({
  storage: multer.memoryStorage(), // Stockage mémoire seulement
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// Route test - vérifie que le routeur fonctionne
router.get('/test', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Media router is working',
    timestamp: new Date().toISOString()
  });
});

// Upload simplifié - sans Cloudinary pour commencer
router.post('/upload-simple', authenticate, upload.single('file'), async (req, res) => {
  try {
    console.log('📤 Upload simple request');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file provided'
      });
    }

    console.log('File received:', {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });

    // Pour l'instant, on stocke juste les métadonnées
    const result = await query(
      `INSERT INTO media 
       (filename, original_name, url, mime_type, size, uploader_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        `simple-${Date.now()}-${req.file.originalname}`,
        req.file.originalname,
        '#placeholder',
        req.file.mimetype,
        req.file.size,
        req.user.id
      ]
    );

    res.status(201).json({
      success: true,
      message: 'File metadata saved successfully',
      file: result.rows[0],
      note: 'File stored in memory only'
    });

  } catch (error) {
    console.error('❌ Simple upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: error.message
    });
  }
});

// Liste des fichiers
router.get('/list', authenticate, async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM media ORDER BY created_at DESC LIMIT 20'
    );

    res.json({
      success: true,
      files: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list files'
    });
  }
});

export default router;
