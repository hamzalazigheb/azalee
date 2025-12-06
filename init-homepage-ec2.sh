#!/bin/bash
# Script pour initialiser la page d'accueil dans le CMS sur EC2

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

# 1. Vérifier que MongoDB est accessible
echo -e "${YELLOW}1. Vérification de MongoDB...${NC}"
if sudo docker ps | grep -q azalee-mongo; then
    echo -e "${GREEN}   ✅ MongoDB est en cours d'exécution${NC}"
else
    echo -e "${RED}   ❌ MongoDB n'est pas en cours d'exécution${NC}"
    echo -e "${YELLOW}   Démarrage de MongoDB...${NC}"
    sudo docker-compose up -d mongo
    sleep 5
fi
echo ""

# 2. Vérifier que le script existe
echo -e "${YELLOW}2. Vérification du script d'initialisation...${NC}"
if [ -f "scripts/init-accueil-cms.js" ]; then
    echo -e "${GREEN}   ✅ Script trouvé${NC}"
else
    echo -e "${RED}   ❌ Script scripts/init-accueil-cms.js n'existe pas${NC}"
    exit 1
fi
echo ""

# 3. Vérifier .env.production
echo -e "${YELLOW}3. Vérification de .env.production...${NC}"
if [ -f ".env.production" ]; then
    echo -e "${GREEN}   ✅ .env.production existe${NC}"
    # Vérifier MONGODB_URI
    if grep -q "MONGODB_URI" .env.production; then
        echo -e "${GREEN}   ✅ MONGODB_URI est défini${NC}"
    else
        echo -e "${YELLOW}   ⚠️  MONGODB_URI n'est pas défini, utilisation de la valeur par défaut${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  .env.production n'existe pas, création depuis le template...${NC}"
    if [ -f "env.production.template" ]; then
        cp env.production.template .env.production
        echo -e "${GREEN}   ✅ .env.production créé${NC}"
    else
        echo -e "${RED}   ❌ env.production.template n'existe pas${NC}"
    fi
fi
echo ""

# 4. Exécuter le script d'initialisation
echo -e "${YELLOW}4. Exécution du script d'initialisation...${NC}"
echo -e "${BLUE}   ⏳ Cela peut prendre quelques secondes...${NC}"

# Exécuter dans le container backend ou directement avec node
if command -v node &> /dev/null; then
    # Node.js est disponible localement
    node scripts/init-accueil-cms.js
elif sudo docker ps | grep -q azalee-backend; then
    # Exécuter dans le container backend
    sudo docker exec azalee-backend node /app/scripts/init-accueil-cms.js
else
    # Essayer avec docker-compose run
    sudo docker-compose run --rm backend node /app/scripts/init-accueil-cms.js
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Script exécuté avec succès${NC}"
else
    echo -e "${RED}   ❌ Erreur lors de l'exécution du script${NC}"
    exit 1
fi
echo ""

# 5. Vérifier que la page a été créée
echo -e "${YELLOW}5. Vérification de la création de la page...${NC}"
# Utiliser l'API pour vérifier
sleep 2
if curl -s http://localhost/api/cms/pages | grep -q "home"; then
    echo -e "${GREEN}   ✅ Page 'home' trouvée dans le CMS${NC}"
else
    echo -e "${YELLOW}   ⚠️  La page 'home' n'a pas été trouvée via l'API${NC}"
    echo -e "${YELLOW}   Vérifiez manuellement dans le CMS: http://localhost/admin/cms${NC}"
fi
echo ""

echo -e "${GREEN}✅ Initialisation terminée !${NC}"
echo ""
echo -e "${YELLOW}💡 Prochaines étapes:${NC}"
echo -e "   1. Accédez au CMS: ${BLUE}http://your-ec2-ip/admin/cms${NC}"
echo -e "   2. La page 'Page d'accueil' devrait apparaître dans la liste"
echo -e "   3. Cliquez dessus pour éditer le contenu"
