# 🚀 GUIDE COMPLET DE MISE À JOUR AGADEV
## Deadline: 14h00 - Installation complète en 2h30

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Installation Backend (45 min)](#installation-backend)
3. [Configuration Frontend (30 min)](#configuration-frontend)
4. [Dashboard Admin (Design identique!)](#dashboard-admin)
5. [Déploiement Production](#déploiement)
6. [Tests finaux](#tests)

---

## 🎯 VUE D'ENSEMBLE

### Qu'est-ce qui a été ajouté?

✅ **Backend API Node.js/Express**
- CRUD News/Actualités (FR + EN)
- CRUD Projects/Projets (FR + EN)
- Upload fichiers (images + documents)
- Traduction automatique DeepL
- Authentification admin JWT

✅ **Admin Dashboard** (même design AGADEV!)
- Interface cohérente avec le site
- Éditeur WYSIWYG
- Gestion News + Projects
- Upload de fichiers multiples
- Preview avant publication

✅ **i18n FR/EN**
- Switch langue dans navbar
- Traduction auto des contenus
- Même expérience visuelle en FR et EN

### Architecture

```
Frontend (Netlify)
  ↓
Backend API (Render.com - GRATUIT)
  ↓
PostgreSQL (Supabase - GRATUIT)
  ↓
Media Storage (Cloudinary - GRATUIT)
```

---

## ⚡ INSTALLATION RAPIDE

### ÉTAPE 1: Copier le projet (5 min)

```bash
# Sur votre machine WSL Ubuntu
cd /home/kayto

# Extraire le zip que je vous fournis
unzip agadev-fullstack.zip

cd agadev-fullstack
```

---

## 🔧 INSTALLATION BACKEND (45 min)

### 1.1 Créer compte Supabase (10 min)

1. Aller sur https://supabase.com
2. Sign up (gratuit)
3. Create New Project
   - **Name:** AGADEV
   - **Database Password:** (notez-le!)
   - **Region:** Europe West (closest)
4. Attendre création (~2 min)
5. Aller dans **Settings → Database**
6. Copier **Connection String** (URI mode)

### 1.2 Créer le schéma DB (5 min)

1. Dans Supabase, aller dans **SQL Editor**
2. Ouvrir `backend/schema.sql`
3. Copier tout le contenu
4. Coller dans SQL Editor
5. Cliquer **Run**

✅ Vous avez maintenant toutes les tables!

### 1.3 Configuration Cloudinary (5 min)

1. Aller sur https://cloudinary.com
2. Sign up (gratuit)
3. Dashboard → copier:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 1.4 Configuration DeepL (5 min)

1. Aller sur https://www.deepl.com/pro-api
2. Sign up (gratuit - 500k chars/mois)
3. Account → **API Keys**
4. Copier votre clé

### 1.5 Configuration Backend locale (10 min)

```bash
cd backend

# Créer .env
cp .env.example .env

# Éditer .env avec vos valeurs
nano .env
```

Remplir:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
JWT_SECRET=votre-super-secret-unique-generer-ici
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
DEEPL_API_KEY=votre_deepl_key
FRONTEND_URL=http://localhost:5173
```

### 1.6 Installer et tester (10 min)

```bash
# Installer dépendances
npm install

# Créer dossier uploads
sudo mkdir -p /tmp/uploads
sudo chmod 777 /tmp/uploads

# Démarrer serveur
npm run dev
```

✅ Si vous voyez "🚀 AGADEV API Server running on port 5000" → **SUCCÈS!**

### 1.7 Tester l'API

```bash
# Test health check
curl http://localhost:5000/api/health

# Devrait retourner: {"status":"ok", ...}
```

---

## 💻 CONFIGURATION FRONTEND (30 min)

### 2.1 Configuration API (5 min)

```bash
cd ../frontend

# Créer fichier config
nano src/config/api.js
```

Contenu:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 2.2 Créer .env (2 min)

```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 2.3 Installer dépendances (5 min)

```bash
npm install
```

### 2.4 Traduire les textes statiques (15 min)

Je fournis les fichiers de traduction dans `frontend/src/locales/`:
- `fr.json` (français)
- `en.json` (anglais)

Ces fichiers contiennent TOUTES les traductions du site.

### 2.5 Lancer le frontend (3 min)

```bash
npm run dev
```

✅ Site accessible sur http://localhost:5173

---

## 🎨 DASHBOARD ADMIN - ACCÈS

### Login Admin

1. Ouvrir http://localhost:5173/admin
2. **Username:** `admin`
3. **Password:** `Admin@2025`

⚠️ **IMPORTANT:** Changer ce mot de passe immédiatement!

### Interface Admin (MÊME DESIGN!)

L'admin dashboard utilise **exactement** les mêmes composants que le site:
- Mêmes couleurs (vert forêt, copper, etc.)
- Mêmes cards
- Mêmes buttons
- Même navbar (avec "Admin" ajouté)
- Même footer

**Aucun changement visuel = Cohérence totale!**

---

## 📝 UTILISATION ADMIN

### Créer une actualité

1. Admin → News → New Article
2. Remplir:
   - **Titre (FR):** "Votre titre"
   - **Contenu (FR):** Utiliser l'éditeur WYSIWYG
   - **Excerpt:** Court résumé
3. Upload image de couverture
4. ✅ Cocher "**Auto-translate to English**"
5. Cliquer "**Publish**"

→ L'article est automatiquement traduit en anglais!

### Créer un projet

Même processus:
1. Admin → Projects → New Project
2. Remplir infos (FR)
3. Upload documents/images
4. Auto-translate
5. Publish

---

## 🚀 DÉPLOIEMENT PRODUCTION (30 min)

### Déployer Backend sur Render.com

1. Créer compte sur https://render.com
2. **New → Web Service**
3. **Connect repository** (votre GitHub)
4. Configuration:
   ```
   Name: agadev-api
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. **Environment Variables** → Add from .env:
   - NODE_ENV = production
   - DATABASE_URL = (votre Supabase)
   - JWT_SECRET = (nouveau secret sécurisé)
   - CLOUDINARY_... (vos clés)
   - DEEPL_API_KEY = (votre clé)
   - FRONTEND_URL = https://votre-site.netlify.app

6. **Create Web Service**

⏳ Attendre déploiement (~3 min)

✅ URL API: `https://agadev-api.onrender.com`

### Déployer Frontend sur Netlify

1. Aller sur https://app.netlify.com
2. **Sites → Add new site → Import existing project**
3. Connect GitHub
4. Configuration:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
5. **Environment variables:**
   ```
   VITE_API_URL = https://agadev-api.onrender.com/api
   ```
6. **Deploy site**

✅ Site en production!

### Mettre à jour le FRONTEND_URL

Retourner sur Render.com → Environment:
```
FRONTEND_URL = https://votre-site.netlify.app
```

**Restart service**

---

## ✅ TESTS FINAUX (10 min)

### Checklist

- [ ] Site principal charge en FR
- [ ] Switch EN fonctionne
- [ ] /admin accessible
- [ ] Login admin OK
- [ ] Créer actualité → auto-translate → publiée
- [ ] Upload image fonctionne
- [ ] Créer projet → auto-translate → publié
- [ ] Page /actualites affiche les news
- [ ] Page /projets-programmes affiche les projets
- [ ] Version EN affiche contenus traduits

---

## 🔐 SÉCURITÉ POST-DÉPLOIEMENT

### IMMÉDIATEMENT:

1. **Changer mot de passe admin**
   ```bash
   curl -X POST https://votre-api.onrender.com/api/auth/change-password \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "current_password": "Admin@2025",
       "new_password": "VotreNouveauMotDePasseTresSecurise123!"
     }'
   ```

2. **Générer nouveau JWT_SECRET**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Mettre dans Render Environment Variables

---

## 📁 STRUCTURE FINALE

```
agadev-fullstack/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── news.js
│   │   ├── projects.js
│   │   └── media.js
│   ├── services/
│   │   └── translation.js
│   ├── middleware/
│   │   └── auth.js
│   ├── schema.sql
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── NewsManager.jsx
    │   │   │   ├── ProjectsManager.jsx
    │   │   │   └── Login.jsx
    │   │   ├── Home.jsx (avec API)
    │   │   ├── News.jsx (avec API)
    │   │   └── Projects.jsx (avec API)
    │   ├── components/
    │   │   └── LanguageSwitcher.jsx
    │   ├── locales/
    │   │   ├── fr.json
    │   │   └── en.json
    │   ├── services/
    │   │   └── api.js
    │   ├── i18n.js
    │   └── App.jsx
    ├── package.json
    └── .env
```

---

## 🆘 DÉPANNAGE

### Problème: Backend ne démarre pas

```bash
# Vérifier PostgreSQL
psql $DATABASE_URL -c "SELECT 1"

# Vérifier ports
lsof -i :5000

# Logs détaillés
npm run dev
```

### Problème: Frontend ne se connecte pas

1. Vérifier CORS dans backend
2. Vérifier VITE_API_URL dans .env
3. Vérifier Network tab dans DevTools

### Problème: Upload échoue

1. Vérifier credentials Cloudinary
2. Vérifier dossier /tmp/uploads existe
3. Vérifier taille fichier < 10MB

---

## 📞 COMMANDES UTILES

```bash
# Backend
cd backend
npm run dev          # Développement
npm start            # Production
npm run migrate      # Migrations DB

# Frontend
cd frontend
npm run dev          # Développement
npm run build        # Build production
npm run preview      # Preview build

# Base de données
psql $DATABASE_URL   # Se connecter à DB
```

---

## ✨ FONCTIONNALITÉS CLÉS

### Traduction automatique
- DeepL API (meilleure qualité)
- 500k caractères/mois gratuit
- Préserve formatage HTML
- Qualité professionnelle

### Upload de fichiers
- Images: JPG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- Limite: 10MB par fichier
- Stockage Cloudinary (25GB gratuit)

### Admin Dashboard
- Authentification sécurisée JWT
- Interface WYSIWYG (Rich Text Editor)
- Preview avant publication
- Gestion versions FR/EN
- Upload multiple

---

## 🎉 VOUS AVEZ TERMINÉ!

Votre site AGADEV est maintenant:
- ✅ Bilingue FR/EN
- ✅ Avec admin CMS complet
- ✅ Upload de fichiers
- ✅ Traduction automatique
- ✅ En production

**Bravo! 🚀**

---

## 📧 NOTES FINALES

- Backup DB régulier (Supabase auto-backup)
- Monitoring: Render.com dashboard
- Logs: Render.com → Logs
- Analytics: Ajouter Google Analytics si besoin

**Design intact ✅**
**Fonctionnalités avancées ✅**
**Production ready ✅**
