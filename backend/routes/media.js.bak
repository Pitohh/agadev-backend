import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { query } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|xls|xlsx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed: images, PDF, Office documents'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: fileFilter
});

/**
 * POST /api/media/upload - Upload file to Cloudinary (protected)
 */
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { entity_type, entity_id } = req.body;

    // Determine resource type
    let resourceType = 'auto';
    if (req.file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else {
      resourceType = 'raw';
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      req.file.path,
      `agadev/${entity_type || 'general'}`,
      resourceType
    );

    // Save to database
    const result = await query(
      `INSERT INTO media (filename, original_name, file_url, file_type, file_size, entity_type, entity_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        cloudinaryResult.publicId,
        req.file.originalname,
        cloudinaryResult.url,
        req.file.mimetype,
        cloudinaryResult.bytes,
        entity_type,
        entity_id
      ]
    );

    // Clean up temp file
    const fs = await import('fs/promises');
    await fs.unlink(req.file.path);

    res.status(201).json({
      message: 'File uploaded successfully',
      media: result.rows[0]
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

/**
 * POST /api/media/upload-multiple - Upload multiple files (protected)
 */
router.post('/upload-multiple', authenticate, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const { entity_type, entity_id } = req.body;
    const uploadedFiles = [];

    for (const file of req.files) {
      try {
        // Determine resource type
        let resourceType = 'auto';
        if (file.mimetype.startsWith('image/')) {
          resourceType = 'image';
        } else {
          resourceType = 'raw';
        }

        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(
          file.path,
          `agadev/${entity_type || 'general'}`,
          resourceType
        );

        // Save to database
        const result = await query(
          `INSERT INTO media (filename, original_name, file_url, file_type, file_size, entity_type, entity_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *`,
          [
            cloudinaryResult.publicId,
            file.originalname,
            cloudinaryResult.url,
            file.mimetype,
            cloudinaryResult.bytes,
            entity_type,
            entity_id
          ]
        );

        uploadedFiles.push(result.rows[0]);

        // Clean up temp file
        const fs = await import('fs/promises');
        await fs.unlink(file.path);
      } catch (error) {
        console.error('Error uploading file:', file.originalname, error);
        // Continue with other files
      }
    }

    res.status(201).json({
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      media: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

/**
 * GET /api/media - Get media files (protected)
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { entity_type, entity_id, limit = 50, offset = 0 } = req.query;

    let queryText = 'SELECT * FROM media WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (entity_type) {
      queryText += ` AND entity_type = $${paramCount}`;
      params.push(entity_type);
      paramCount++;
    }

    if (entity_id) {
      queryText += ` AND entity_id = $${paramCount}`;
      params.push(entity_id);
      paramCount++;
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    res.json({
      media: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media files' });
  }
});

/**
 * DELETE /api/media/:id - Delete media file (protected)
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Get media info
    const mediaResult = await query('SELECT * FROM media WHERE id = $1', [id]);

    if (mediaResult.rows.length === 0) {
      return res.status(404).json({ error: 'Media file not found' });
    }

    const media = mediaResult.rows[0];

    // Delete from Cloudinary
    try {
      const resourceType = media.file_type.startsWith('image/') ? 'image' : 'raw';
      await deleteFromCloudinary(media.filename, resourceType);
    } catch (error) {
      console.error('Cloudinary deletion error:', error);
      // Continue with database deletion even if Cloudinary fails
    }

    // Delete from database
    await query('DELETE FROM media WHERE id = $1', [id]);

    res.json({ message: 'Media file deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media file' });
  }
});

export default router;
