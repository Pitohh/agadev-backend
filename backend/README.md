# AGADEV Backend API

API Node.js/Express pour le site web AGADEV avec gestion de contenu bilingue (FR/EN).

## 🚀 Fonctionnalités

- ✅ CRUD complet pour News/Actualités
- ✅ CRUD complet pour Projects/Projets
- ✅ Upload de fichiers (images, documents) via Cloudinary
- ✅ Traduction automatique FR→EN via DeepL API
- ✅ Authentification JWT pour admin
- ✅ Base de données PostgreSQL
- ✅ API RESTful avec validation
- ✅ Gestion multilingue (FR/EN)

## 📋 Prérequis

- Node.js 18+ 
- PostgreSQL 14+ (ou compte Supabase)
- Compte Cloudinary (gratuit)
- Compte DeepL API (gratuit jusqu'à 500k caractères/mois)

## 🛠️ Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer les variables d'environnement

Copier `.env.example` vers `.env` et remplir les valeurs:

```bash
cp .env.example .env
```

Éditer `.env`:
```env
DATABASE_URL=postgresql://user:pass@host:5432/agadev
JWT_SECRET=votre-secret-jwt-tres-securise
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
DEEPL_API_KEY=votre_deepl_key
FRONTEND_URL=http://localhost:5173
```

### 3. Configuration PostgreSQL

#### Option A: Supabase (recommandé - gratuit)

1. Créer un compte sur https://supabase.com
2. Créer un nouveau projet
3. Aller dans Settings → Database
4. Copier la "Connection string" (mode "URI")
5. Coller dans `DATABASE_URL` dans `.env`

#### Option B: PostgreSQL local

```bash
# Installer PostgreSQL (Ubuntu)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Créer la base de données
sudo -u postgres createdb agadev
sudo -u postgres psql
postgres=# CREATE USER agadev_user WITH PASSWORD 'votre_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE agadev TO agadev_user;
postgres=# \q
```

### 4. Créer le schéma de base de données

```bash
# Si PostgreSQL local
psql -U agadev_user -d agadev -f schema.sql

# Si Supabase
# Copier le contenu de schema.sql
# Aller dans SQL Editor dans Supabase
# Coller et exécuter
```

### 5. Créer le dossier uploads temporaire

```bash
mkdir -p /tmp/uploads
```

### 6. Démarrer le serveur

```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarrera sur `http://localhost:5000`

## 📡 Routes API

### Authentification

```
POST   /api/auth/login           - Connexion admin
GET    /api/auth/me              - Info utilisateur actuel
POST   /api/auth/change-password - Changer mot de passe
POST   /api/auth/register        - Créer admin (admin seulement)
```

### News/Actualités

```
GET    /api/news                 - Liste news publiées (public)
GET    /api/news/:slug           - Détail news (public)
GET    /api/news/admin/all       - Toutes les news (admin)
POST   /api/news                 - Créer news (admin)
PUT    /api/news/:id             - Modifier news (admin)
DELETE /api/news/:id             - Supprimer news (admin)
PATCH  /api/news/:id/publish     - Publier/dépublier (admin)
```

### Projects/Projets

```
GET    /api/projects             - Liste projets publiés (public)
GET    /api/projects/:slug       - Détail projet (public)
GET    /api/projects/admin/all   - Tous les projets (admin)
POST   /api/projects             - Créer projet (admin)
PUT    /api/projects/:id         - Modifier projet (admin)
DELETE /api/projects/:id         - Supprimer projet (admin)
PATCH  /api/projects/:id/publish - Publier/dépublier (admin)
```

### Media/Fichiers

```
GET    /api/media                - Liste fichiers (admin)
POST   /api/media/upload         - Upload fichier (admin)
POST   /api/media/upload-multiple- Upload multiple (admin)
DELETE /api/media/:id             - Supprimer fichier (admin)
```

## 🔐 Authentification

Toutes les routes admin nécessitent un token JWT dans le header:

```
Authorization: Bearer <votre_token_jwt>
```

### Identifiants par défaut

**Username:** `admin`  
**Password:** `Admin@2025`  

⚠️ **CHANGER IMMÉDIATEMENT EN PRODUCTION !**

## 💡 Exemples d'utilisation

### Créer une news avec traduction automatique

```bash
curl -X POST http://localhost:5000/api/news \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title_fr": "Nouvelle initiative verte",
    "content_fr": "Le Gabon lance un nouveau programme...",
    "excerpt_fr": "Un programme ambitieux pour la forêt",
    "auto_translate": true,
    "published": true,
    "cover_image_url": "https://..."
  }'
```

La réponse inclura automatiquement les champs `title_en`, `content_en`, `excerpt_en` traduits.

### Upload d'image

```bash
curl -X POST http://localhost:5000/api/media/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "entity_type=news" \
  -F "entity_id=uuid-here"
```

## 🚀 Déploiement

### Render.com (recommandé - gratuit)

1. Créer compte sur https://render.com
2. New → Web Service
3. Connecter votre repo GitHub
4. Configuration:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Add all variables from `.env`
5. Deploy!

L'URL sera: `https://votre-app.onrender.com`

### Variables d'environnement Render

Ajouter dans Environment:
- `NODE_ENV=production`
- `DATABASE_URL=` (votre Supabase URL)
- `JWT_SECRET=` (générer un secret fort)
- `CLOUDINARY_CLOUD_NAME=`
- `CLOUDINARY_API_KEY=`
- `CLOUDINARY_API_SECRET=`
- `DEEPL_API_KEY=`
- `FRONTEND_URL=` (votre URL Netlify)

## 📊 Structure de la base de données

```sql
news
├── id (UUID)
├── title_fr, title_en
├── content_fr, content_en
├── excerpt_fr, excerpt_en
├── slug
├── cover_image_url
├── published
└── publish_date

projects
├── id (UUID)
├── title_fr, title_en
├── description_fr, description_en
├── content_fr, content_en
├── slug
├── status (active/completed/planned)
├── start_date, end_date
└── partners[]

media
├── id (UUID)
├── filename
├── file_url
├── file_type
├── entity_type (news/project)
└── entity_id

admin_users
├── id (UUID)
├── username
├── password_hash
└── role (admin/editor)
```

## 🔧 Scripts disponibles

```bash
npm start       # Démarrer serveur production
npm run dev     # Démarrer avec nodemon (dev)
npm run migrate # Exécuter migrations DB
```

## 📝 Notes importantes

- Les traductions DeepL sont limitées à 500k caractères/mois en gratuit
- Cloudinary gratuit: 25 GB stockage, 25 GB bande passante/mois
- Render.com gratuit: apps go to sleep après 15min inactivité
- PostgreSQL Supabase gratuit: 500 MB, 2 GB transfert/mois

## 🛟 Support

Pour toute question technique, consulter la documentation:
- Express: https://expressjs.com/
- PostgreSQL: https://www.postgresql.org/docs/
- Cloudinary: https://cloudinary.com/documentation
- DeepL: https://www.deepl.com/docs-api
