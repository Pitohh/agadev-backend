import express from 'express';
import multer from 'multer';
import { query } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const router = express.Router();

// Configuration multer - accepte tous les fichiers
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
});

// GET tous les médias
router.get('/', authenticate, async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const result = await query(
      `SELECT m.*, u.username as uploader_name
       FROM media m
       LEFT JOIN users u ON m.uploader_id = u.id::text
       ORDER BY m.created_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    res.json({
      success: true,
      media: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch media',
      details: error.message
    });
  }
});

// POST upload avec Cloudinary
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    console.log('📤 Upload vers Cloudinary...');
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'Aucun fichier fourni' 
      });
    }

    console.log('📄 File info:', {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });

    // Vérifie si Cloudinary est configuré
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.warn('⚠️ Cloudinary non configuré, stockage local simulé');
      
      // Stockage simulé (pour tests)
      const dbResult = await query(
        `INSERT INTO media 
         (filename, original_name, url, mime_type, size, uploader_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING *`,
        [
          `local-${Date.now()}-${req.file.originalname}`,
          req.file.originalname,
          `/uploads/${req.file.originalname}`,
          req.file.mimetype,
          req.file.size,
          String(req.user.id)
        ]
      );

      return res.status(201).json({
        success: true,
        message: 'Fichier enregistré (Cloudinary non configuré)',
        media: dbResult.rows[0],
        warning: 'Configure Cloudinary pour un stockage permanent'
      });
    }

    // Upload vers Cloudinary (configuration réelle)
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'agadev',
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary success:', result.secure_url);
            resolve(result);
          }
        }
      );
      
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Sauvegarde en base de données
    const dbResult = await query(
      `INSERT INTO media 
       (filename, original_name, url, mime_type, size, uploader_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [
        cloudinaryResult.public_id,
        req.file.originalname,
        cloudinaryResult.secure_url,
        req.file.mimetype,
        req.file.size,
        String(req.user.id)
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Fichier uploadé avec succès sur Cloudinary',
      media: dbResult.rows[0],
      cloudinary: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        format: cloudinaryResult.format
      }
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
    
    // Récupère le média
    const media = await query(
      'SELECT filename, url FROM media WHERE id = $1',
      [id]
    );
    
    if (media.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Fichier non trouvé' 
      });
    }
    
    const { filename, url } = media.rows[0];
    
    // Supprime de Cloudinary si c'est un fichier Cloudinary
    if (url.includes('cloudinary.com') && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        await cloudinary.uploader.destroy(filename);
        console.log('✅ Supprimé de Cloudinary:', filename);
      } catch (cloudinaryError) {
        console.warn('⚠️ Impossible de supprimer de Cloudinary:', cloudinaryError.message);
      }
    }
    
    // Supprime de la base de données
    await query('DELETE FROM media WHERE id = $1', [id]);
    
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
