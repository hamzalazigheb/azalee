#!/bin/bash
# Script pour initialiser la page d'accueil directement sur EC2 (sans Docker)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏠 Initialisation de la Page d'Accueil dans le CMS${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js n'est pas installé. Installation...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Vérifier que le script existe
if [ ! -f "scripts/init-accueil-cms.js" ]; then
    echo -e "${RED}❌ Script scripts/init-accueil-cms.js n'existe pas${NC}"
    exit 1
fi

# Vérifier que .env.production existe
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production n'existe pas${NC}"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installation des dépendances...${NC}"
    npm install
fi

# Exécuter le script
echo -e "${YELLOW}1. Exécution du script d'initialisation...${NC}"
echo -e "${BLUE}   Cela peut prendre quelques secondes...${NC}"

# Utiliser .env.production pour les variables d'environnement
export $(cat .env.production | grep -v '^#' | xargs)
node scripts/init-accueil-cms.js

echo ""
echo -e "${GREEN}✅ Script d'initialisation exécuté${NC}"
echo ""
echo -e "${YELLOW}2. Vérification...${NC}"
echo -e "${BLUE}   Rafraîchissez la page CMS (/admin/cms) pour voir 'Page d'accueil'${NC}"
echo ""
echo -e "${GREEN}✅ Initialisation terminée !${NC}"

