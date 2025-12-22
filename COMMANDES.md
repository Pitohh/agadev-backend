# 📋 AGADEV - COMMANDES ESSENTIELLES

## 🚀 Installation initiale

```bash
# Copier le projet dans WSL
cd /home/kayto
# [copier agadev-fullstack ici]

# Installation automatique
cd agadev-fullstack
chmod +x setup.sh
./setup.sh
```

## ⚙️ Configuration

### Backend .env
```bash
cd backend
nano .env
```

Contenu minimum:
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=votre-secret-unique-ici
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
DEEPL_API_KEY=your_key
FRONTEND_URL=http://localhost:5173
```

### Frontend .env
```bash
cd frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## 💾 Base de données

### Créer schéma (Supabase)
1. SQL Editor dans Supabase
2. Copier `backend/schema.sql`
3. Run

### Créer schéma (PostgreSQL local)
```bash
psql -U agadev_user -d agadev -f backend/schema.sql
```

## 🏃 Développement local

### Démarrer backend (Terminal 1)
```bash
cd backend
npm run dev
# Serveur sur http://localhost:5000
```

### Démarrer frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Site sur http://localhost:5173
```

## 🧪 Tests API

### Health check
```bash
curl http://localhost:5000/api/health
```

### Login admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@2025"}'
```

### Créer actualité
```bash
TOKEN="votre_token_jwt"

curl -X POST http://localhost:5000/api/news \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title_fr": "Nouvelle actualité",
    "content_fr": "Contenu en français...",
    "auto_translate": true,
    "published": true
  }'
```

### Lister actualités
```bash
curl http://localhost:5000/api/news?lang=fr
curl http://localhost:5000/api/news?lang=en
```

## 🔐 Sécurité

### Changer mot de passe admin
```bash
cd backend
node generate-password.js "VotreNouveauMotDePasse"
# Copier le hash et exécuter la query SQL
```

### Générer JWT secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📦 Build production

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Fichiers dans dist/
```

## 🌐 Déploiement

### Push sur GitHub
```bash
git init
git add .
git commit -m "Initial commit - AGADEV fullstack"
git branch -M main
git remote add origin https://github.com/votre-username/agadev.git
git push -u origin main
```

### Render.com (Backend)
1. New Web Service
2. Connect GitHub repo
3. Settings:
   ```
   Build: npm install
   Start: npm start
   Root: backend
   ```
4. Add Environment Variables
5. Deploy

### Netlify (Frontend)
1. New site from Git
2. Settings:
   ```
   Base: frontend
   Build: npm run build
   Publish: frontend/dist
   ```
3. Add Environment Variables:
   ```
   VITE_API_URL=https://votre-api.onrender.com/api
   ```
4. Deploy

## 🔍 Debugging

### Vérifier logs backend
```bash
cd backend
npm run dev
# Logs en temps réel
```

### Vérifier connexion DB
```bash
psql $DATABASE_URL -c "SELECT COUNT(*) FROM news;"
```

### Tester Cloudinary
```bash
cd backend
node -e "
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log('Cloudinary config:', cloudinary.config());
"
```

## 📊 Maintenance

### Backup DB (Supabase)
- Automatic dans Supabase dashboard

### Backup DB (Local)
```bash
pg_dump -U agadev_user agadev > backup.sql
```

### Restore DB
```bash
psql -U agadev_user agadev < backup.sql
```

### Voir logs production (Render)
- Dashboard Render.com → Logs

### Nettoyer uploads temporaires
```bash
sudo rm -rf /tmp/uploads/*
sudo mkdir -p /tmp/uploads
sudo chmod 777 /tmp/uploads
```

## 🛠️ Utilitaires

### Installer nouvelle dépendance backend
```bash
cd backend
npm install nom-package
```

### Installer nouvelle dépendance frontend
```bash
cd frontend
npm install nom-package
```

### Mettre à jour dépendances
```bash
npm update
```

### Vérifier versions
```bash
node -v
npm -v
psql --version
```

## 🔄 Workflow typique

### Développement
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Tester sur http://localhost:5173
```

### Ajout fonctionnalité
```bash
# 1. Créer nouvelle branche
git checkout -b feature/nom-fonctionnalite

# 2. Développer...

# 3. Tester localement

# 4. Commit
git add .
git commit -m "Add: description"

# 5. Push
git push origin feature/nom-fonctionnalite

# 6. Merge sur main après review
```

### Déploiement
```bash
# 1. Merge sur main
git checkout main
git merge feature/nom-fonctionnalite

# 2. Push
git push origin main

# 3. Auto-deploy sur Render/Netlify
```

## 📱 URLs importantes

- **Local Frontend:** http://localhost:5173
- **Local Backend:** http://localhost:5000
- **Local Admin:** http://localhost:5173/admin
- **API Health:** http://localhost:5000/api/health
- **Supabase Dashboard:** https://app.supabase.com
- **Cloudinary Dashboard:** https://cloudinary.com/console
- **Render Dashboard:** https://dashboard.render.com
- **Netlify Dashboard:** https://app.netlify.com

## 🆘 Problèmes courants

### Port déjà utilisé
```bash
# Trouver process sur port 5000
lsof -i :5000
# Tuer le process
kill -9 PID
```

### Permission denied /tmp/uploads
```bash
sudo mkdir -p /tmp/uploads
sudo chmod 777 /tmp/uploads
```

### Cannot connect to database
```bash
# Vérifier connection string
echo $DATABASE_URL
# Tester connexion
psql $DATABASE_URL -c "SELECT 1"
```

### CORS error
- Vérifier FRONTEND_URL dans backend/.env
- Vérifier VITE_API_URL dans frontend/.env

### Module not found
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

---

**💡 Tip:** Gardez ce fichier sous la main pendant le développement!
