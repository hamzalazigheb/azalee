#!/bin/bash
# Script pour forcer le rechargement du contenu CMS sur EC2
# Ce script redémarre les containers et vide le cache Next.js

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔄 Forcer le rechargement du contenu CMS${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Arrêter les containers
echo -e "${YELLOW}1. Arrêt des containers...${NC}"
sudo docker-compose down
echo -e "${GREEN}   ✅ Containers arrêtés${NC}"
echo ""

# 2. Nettoyer le cache Next.js
echo -e "${YELLOW}2. Nettoyage du cache Next.js...${NC}"
if [ -d ".next" ]; then
    sudo rm -rf .next
    echo -e "${GREEN}   ✅ Cache .next supprimé${NC}"
else
    echo -e "${YELLOW}   ⚠️  Dossier .next n'existe pas${NC}"
fi
echo ""

# 3. Reconstruire les containers (sans cache)
echo -e "${YELLOW}3. Reconstruction des containers (sans cache)...${NC}"
sudo docker-compose build --no-cache frontend backend
echo -e "${GREEN}   ✅ Containers reconstruits${NC}"
echo ""

# 4. Redémarrer les containers
echo -e "${YELLOW}4. Redémarrage des containers...${NC}"
sudo docker-compose up -d
echo -e "${GREEN}   ✅ Containers redémarrés${NC}"
echo ""

# 5. Attendre que les services soient prêts
echo -e "${YELLOW}5. Attente du démarrage des services...${NC}"
sleep 10

# Vérifier que MongoDB est accessible
if sudo docker ps | grep -q azalee-mongo; then
    echo -e "${GREEN}   ✅ MongoDB est en cours d'exécution${NC}"
else
    echo -e "${RED}   ❌ MongoDB n'est pas en cours d'exécution${NC}"
fi

# Vérifier que les containers frontend/backend sont en cours d'exécution
if sudo docker ps | grep -q azalee-frontend; then
    echo -e "${GREEN}   ✅ Frontend est en cours d'exécution${NC}"
else
    echo -e "${RED}   ❌ Frontend n'est pas en cours d'exécution${NC}"
fi

if sudo docker ps | grep -q azalee-backend; then
    echo -e "${GREEN}   ✅ Backend est en cours d'exécution${NC}"
else
    echo -e "${YELLOW}   ⚠️  Backend n'est pas en cours d'exécution (peut être normal)${NC}"
fi

echo ""
echo -e "${GREEN}✅ Rechargement terminé !${NC}"
echo ""
echo -e "${YELLOW}💡 Prochaines étapes:${NC}"
echo -e "   1. Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)"
echo -e "   2. Accédez à la page officielle: ${BLUE}http://your-ec2-ip${NC}"
echo -e "   3. Les modifications du CMS devraient maintenant être visibles"
echo ""
echo -e "${YELLOW}📝 Note:${NC}"
echo -e "   Si les modifications ne sont toujours pas visibles, vérifiez:"
echo -e "   - Que les données sont bien sauvegardées dans MongoDB"
echo -e "   - Que la page est marquée comme 'published: true'"
echo -e "   - Les logs des containers: ${BLUE}sudo docker-compose logs -f frontend${NC}"

