// routes/admin.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { query } from '../config/database.js';

const router = express.Router();

// ===== ROUTE PROFIL ADMIN =====
router.get('/profile', authenticate, async (req, res) => {
  try {
    console.log('📡 Requête profil admin reçue pour user ID:', req.user.id);
    
    const result = await query(
      `SELECT id, username, email, full_name, role, 
              active, last_login, created_at 
       FROM admin_users 
       WHERE id = $1`,
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    const user = result.rows[0];
    
    res.json({
      message: 'Profil administrateur récupéré',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        active: user.active,
        last_login: user.last_login,
        created_at: user.created_at
      },
      permissions: ['admin:read', 'admin:write', 'users:manage']
    });
    
  } catch (error) {
    console.error('❌ Erreur route /profile:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ===== ROUTE TABLEAU DE BORD (exemple) =====
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    res.json({
      message: 'Tableau de bord admin',
      stats: {
        total_users: 1,
        active_sessions: 1,
        last_activity: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
