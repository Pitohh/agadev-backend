import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import newsRoutes from './routes/news.js';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import mediaSimpleRoutes from './routes/media-simple.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();

// ⚠️ CRITIQUE pour Render : PORT doit être 10000 ou process.env.PORT
const PORT = process.env.PORT || 10000;

// ============ CONFIGURATION CORS ROBUSTE ============
const corsOptions = {
  origin: function (origin, callback) {
    // 1. Liste complète des origines autorisées
    const allowedOrigins = [
      'https://agadev-gabon.com',
      'https://www.agadev-gabon.com',
      'http://localhost:5173',      // Dev frontend Vite
      'http://localhost:3000',      // Dev frontend Create React App
      'http://localhost:5000'       // Dev backend
    ];
    
    // 2. Ajoute FRONTEND_URL si défini dans les variables d'environnement
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    
    // 3. Logs de débogage (visibles dans Render logs)
    console.log('🔍 CORS Check:');
    console.log('   Origin:', origin);
    console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'Non défini');
    console.log('   Allowed origins:', allowedOrigins);
    
    // 4. Règles d'autorisation
    // - Autorise les requêtes sans origin (Postman, curl, etc.)
    // - Vérifie si l'origine est dans la liste
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('🚫 CORS bloqué pour:', origin);
      callback(new Error(`CORS non autorisé. Origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
};

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));  // Utilise la configuration CORS robuste
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============ ROUTES ============

// Health check spécifique pour Render (nécessaire pour le free tier)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'agadev-backend',
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'Non configuré'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/media-simple', mediaSimpleRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { 
      stack: err.stack,
      details: err.details 
    })
  });
});

// ============ DÉMARRAGE SERVEUR ============
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 AGADEV API Server lancé avec succès`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'Non configuré - utilise localhost:5173'}`);
  console.log(`📡 URL Render: https://agadev-backend.onrender.com`);
  console.log('='.repeat(50));
  
  // Log supplémentaire pour vérifier les variables
  console.log('📋 Variables d\'environnement chargées:');
  console.log('   NODE_ENV:', process.env.NODE_ENV);
  console.log('   FRONTEND_URL:', process.env.FRONTEND_URL || 'NON DÉFINI ⚠️');
  console.log('   PORT:', process.env.PORT);
});

export default app;