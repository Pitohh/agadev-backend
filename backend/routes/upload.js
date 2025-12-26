import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = '/tmp/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  }
});

router.post('/', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    console.log('📤 Uploading:', req.file.originalname);
    const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';
    const result = await uploadToCloudinary(req.file.path, 'agadev', resourceType);
    fs.unlinkSync(req.file.path);

    console.log('✅ Upload successful:', result.url);
    res.json({ success: true, url: result.url, publicId: result.publicId });

  } catch (error) {
    console.error('❌ Upload error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/multiple', authenticate, upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    const uploadPromises = req.files.map(async (file) => {
      const resourceType = file.mimetype === 'application/pdf' ? 'raw' : 'image';
      const result = await uploadToCloudinary(file.path, 'agadev', resourceType);
      fs.unlinkSync(file.path);
      return result;
    });

    const results = await Promise.all(uploadPromises);
    res.json({ success: true, files: results });

  } catch (error) {
    console.error('❌ Multiple upload error:', error);
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
