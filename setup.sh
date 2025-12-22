#!/bin/bash

# AGADEV Fullstack - Script d'installation automatique
# Usage: ./setup.sh

set -e

echo "========================================="
echo "🚀 AGADEV Fullstack Setup"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "GUIDE_INSTALLATION.md" ]; then
    echo -e "${RED}❌ Erreur: Veuillez exécuter ce script depuis le dossier agadev-fullstack${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Étape 1: Vérification des prérequis${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez Node.js 18+ depuis https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ requise (version actuelle: v$NODE_VERSION)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v)${NC}"

echo ""
echo -e "${YELLOW}📦 Étape 2: Installation des dépendances Backend${NC}"

cd backend

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Création du fichier .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Veuillez éditer backend/.env avec vos credentials${NC}"
    echo "   - DATABASE_URL (Supabase)"
    echo "   - CLOUDINARY_* (Cloudinary)"
    echo "   - DEEPL_API_KEY (DeepL)"
    echo "   - JWT_SECRET (générez un secret unique)"
    echo ""
    read -p "Appuyez sur Entrée quand vous avez configuré .env..."
fi

echo "Installation des packages npm..."
npm install

echo -e "${GREEN}✅ Backend dependencies installées${NC}"

cd ..

echo ""
echo -e "${YELLOW}📦 Étape 3: Installation des dépendances Frontend${NC}"

cd frontend

if [ ! -f ".env" ]; then
    echo "VITE_API_URL=http://localhost:5000/api" > .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
fi

echo "Installation des packages npm..."
npm install

echo -e "${GREEN}✅ Frontend dependencies installées${NC}"

cd ..

echo ""
echo -e "${YELLOW}📁 Étape 4: Création des dossiers nécessaires${NC}"

sudo mkdir -p /tmp/uploads
sudo chmod 777 /tmp/uploads

echo -e "${GREEN}✅ Dossier uploads créé${NC}"

echo ""
echo "========================================="
echo -e "${GREEN}✅ Installation terminée!${NC}"
echo "========================================="
echo ""
echo "📝 Prochaines étapes:"
echo ""
echo "1. Configurez votre base de données PostgreSQL/Supabase"
echo "   - Exécutez backend/schema.sql dans votre DB"
echo ""
echo "2. Éditez backend/.env avec vos credentials"
echo ""
echo "3. Démarrez le backend:"
echo "   cd backend && npm run dev"
echo ""
echo "4. Dans un autre terminal, démarrez le frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "5. Accédez au site:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo "   Admin:    http://localhost:5173/admin"
echo ""
echo "📖 Consultez GUIDE_INSTALLATION.md pour plus de détails"
echo ""
