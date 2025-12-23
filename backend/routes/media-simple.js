import express from 'express';
import multer from 'multer';
import { query } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/test', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Media router is working',
    timestamp: new Date().toISOString(),
    user: {
      id: req.user.id,
      username: req.user.username
    }
  });
});

// Upload simplifié - UTILISE LE VRAI UUID
router.post('/upload-simple', authenticate, upload.single('file'), async (req, res) => {
  try {
    console.log('📤 Upload simple request');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file provided'
      });
    }

    console.log('👤 User ID:', {
      value: req.user.id,
      type: typeof req.user.id,
      length: req.user.id?.length
    });

    // Utilise le VRAI user.id (UUID)
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
        req.user.id  // UUID directement
      ]
    );

    res.status(201).json({
      success: true,
      message: 'File metadata saved successfully',
      file: result.rows[0],
      user_id_used: req.user.id
    });

  } catch (error) {
    console.error('❌ Simple upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: error.message,
      user_id: req.user?.id,
      query: 'INSERT INTO media (..., uploader_id) VALUES (..., $6)'
    });
  }
});

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
