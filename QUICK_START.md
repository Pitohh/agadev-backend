# ⚡ QUICK START - 10 MINUTES

## 🎯 Objectif: Site fonctionnel en local en 10 minutes

### Étape 1: Copier le projet (2 min)
```bash
# Dans WSL Ubuntu
cd /home/kayto
# Copier agadev-fullstack ici (voir COPIE_VERS_WSL.md)
cd agadev-fullstack
```

### Étape 2: Configuration rapide (3 min)

**A. Créer compte Supabase**
1. https://supabase.com → Sign up
2. New Project → Nom: AGADEV
3. Settings → Database → Copier "Connection String"

**B. Créer DB**
1. SQL Editor dans Supabase
2. Copier contenu de `backend/schema.sql`
3. Coller et Run

**C. Configurer backend/.env**
```bash
cd backend
cp .env.example .env
nano .env
```

Minimum requis:
```env
DATABASE_URL=votre_connection_string_supabase
JWT_SECRET=changez-moi-secret-123
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
DEEPL_API_KEY=demo
```

### Étape 3: Installation (3 min)
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Étape 4: Lancer (2 min)

**Terminal 1 - Backend:**
```bash
cd backend
sudo mkdir -p /tmp/uploads && sudo chmod 777 /tmp/uploads
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## ✅ PRÊT!

- **Site:** http://localhost:5173
- **Admin:** http://localhost:5173/admin
  - Username: `admin`
  - Password: `Admin@2025`

## 🎨 Test rapide

1. Aller sur /admin
2. Login
3. Créer une actualité en français
4. ✅ Cocher "Auto-translate"
5. Publish
6. Voir sur le site en FR et EN

## ⚠️ Notes

- Sans Cloudinary: upload images ne fonctionnera pas (mais le reste oui)
- Sans DeepL: traduction auto ne fonctionnera pas (mais édition manuelle oui)
- Pour la production complète → voir [GUIDE_INSTALLATION.md](GUIDE_INSTALLATION.md)

## 🚀 Pour déploiement production

Voir **GUIDE_INSTALLATION.md** section "Déploiement Production"
