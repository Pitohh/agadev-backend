# 🌿 AGADEV - Agence Gabonaise pour le Développement de l'Économie Verte

Site web institutionnel fullstack avec système de gestion de contenu bilingue (FR/EN).

## 📸 Aperçu

Site vitrine pour l'AGADEV avec:
- ✅ Interface moderne et responsive (design intact)
- ✅ Gestion de contenu News/Projects via dashboard admin
- ✅ Traduction automatique FR→EN (DeepL)
- ✅ Upload de fichiers (images + documents)
- ✅ API REST sécurisée
- ✅ Multilingue (FR/EN)

## 🏗️ Architecture

```
Frontend (React + Vite)
    ↓
Backend API (Node.js + Express)
    ↓
Database (PostgreSQL)
    ↓
Storage (Cloudinary)
```

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+
- PostgreSQL ou compte Supabase
- Compte Cloudinary (gratuit)
- Compte DeepL API (gratuit)

### Installation automatique

```bash
cd agadev-fullstack
chmod +x setup.sh
./setup.sh
```

Le script installera automatiquement toutes les dépendances.

### Installation manuelle

Voir **[GUIDE_INSTALLATION.md](GUIDE_INSTALLATION.md)** pour le guide complet étape par étape.

## 📁 Structure du projet

```
agadev-fullstack/
├── backend/              # API Node.js/Express
│   ├── config/          # DB, Cloudinary config
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Auth, validation
│   ├── schema.sql       # Database schema
│   └── server.js        # Entry point
│
├── frontend/            # React application
│   ├── src/
│   │   ├── pages/      # Pages (Home, News, Projects, Admin)
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API calls
│   │   ├── locales/    # Translations (fr.json, en.json)
│   │   └── i18n.js     # i18n configuration
│   └── public/         # Static assets
│
├── GUIDE_INSTALLATION.md  # Guide complet
├── setup.sh               # Script d'installation
└── README.md             # Ce fichier
```

## 🎯 Fonctionnalités

### Public
- ✅ Site vitrine multilingue (FR/EN)
- ✅ Actualités/News dynamiques
- ✅ Projets/Projects avec détails
- ✅ Téléchargement de documents
- ✅ Design responsive

### Admin
- ✅ Dashboard d'administration
- ✅ CRUD News/Actualités
- ✅ CRUD Projects/Projets
- ✅ Éditeur WYSIWYG
- ✅ Upload de fichiers multiples
- ✅ Traduction automatique
- ✅ Preview avant publication
- ✅ Gestion des médias

## 🔐 Accès Admin

**URL:** `/admin`

**Identifiants par défaut:**
- Username: `admin`
- Password: `Admin@2025`

⚠️ **Changez immédiatement en production!**

## 💻 Développement

### Backend

```bash
cd backend
npm install
npm run dev  # Port 5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev  # Port 5173
```

## 🌐 Déploiement

### Backend → Render.com
- Gratuit
- Déploiement automatique depuis GitHub
- Voir guide installation pour config complète

### Frontend → Netlify
- Gratuit
- Déploiement automatique
- CDN global

### Base de données → Supabase
- Gratuit (500 MB)
- PostgreSQL managé
- Backups automatiques

## 📚 Documentation

- **[GUIDE_INSTALLATION.md](GUIDE_INSTALLATION.md)** - Guide complet d'installation et déploiement
- **[backend/README.md](backend/README.md)** - Documentation API backend
- **API Endpoints** - Voir backend/README.md

## 🛠️ Technologies

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- i18next (multilingue)
- Axios
- React Quill (éditeur)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (authentification)
- Cloudinary (stockage fichiers)
- DeepL (traduction)
- Multer (upload)

## 🎨 Design System

Le design respecte 100% la charte graphique AGADEV:

**Couleurs:**
- Vert forêt: `#1C5137`
- Vert médium: `#00A859`
- Bleu noir: `#004B97`
- Cuivre: `#FFD200`
- Beige clair: `#e6e0db`

**Composants:**
- Cards cohérents
- Buttons harmonisés
- Navbar identique
- Footer inchangé

## 📄 License

Copyright © 2025 AGADEV - Tous droits réservés

## 🆘 Support

Pour toute assistance:
1. Consulter [GUIDE_INSTALLATION.md](GUIDE_INSTALLATION.md)
2. Vérifier les logs backend/frontend
3. Consulter la documentation des services (Supabase, Cloudinary, DeepL)

## ✅ Checklist de déploiement

- [ ] Backend déployé sur Render.com
- [ ] Frontend déployé sur Netlify
- [ ] Base de données configurée (Supabase)
- [ ] Variables d'environnement configurées
- [ ] Cloudinary configuré
- [ ] DeepL API configuré
- [ ] Mot de passe admin changé
- [ ] Test création News
- [ ] Test création Project
- [ ] Test upload fichiers
- [ ] Test traduction automatique
- [ ] Test version EN du site

## 🎉 Résultat final

Un site AGADEV professionnel avec:
- Interface identique (design intact)
- CMS complet et intuitif
- Gestion bilingue automatique
- Upload de médias
- Production ready

---

**Développé pour AGADEV - Décembre 2025**
