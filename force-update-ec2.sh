#!/bin/bash
# Script pour forcer la mise à jour complète sur EC2 (sans cache)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔄 Mise à Jour Complète (Sans Cache)${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier et pull les dernières modifications
echo -e "${YELLOW}1. Récupération des dernières modifications Git...${NC}"
git fetch origin
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "prod" ]; then
    git checkout prod
fi
git pull origin prod
LAST_COMMIT=$(git log -1 --oneline)
echo -e "${GREEN}   ✅ Dernier commit: $LAST_COMMIT${NC}"
echo ""

# 2. Arrêter tous les containers
echo -e "${YELLOW}2. Arrêt des containers...${NC}"
sudo docker-compose down
echo -e "${GREEN}   ✅ Containers arrêtés${NC}"
echo ""

# 3. Supprimer les anciennes images (force le rebuild complet)
echo -e "${YELLOW}3. Suppression des anciennes images...${NC}"
sudo docker-compose rm -f frontend backend 2>/dev/null || true
sudo docker rmi $(sudo docker images | grep -E 'azalee|demo' | awk '{print $3}') 2>/dev/null || true
echo -e "${GREEN}   ✅ Images supprimées${NC}"
echo ""

# 4. Nettoyer le cache Docker (optionnel mais recommandé)
echo -e "${YELLOW}4. Nettoyage du cache Docker...${NC}"
read -p "   Nettoyer le cache Docker? Cela peut libérer de l'espace (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo docker system prune -f
    echo -e "${GREEN}   ✅ Cache nettoyé${NC}"
else
    echo -e "${YELLOW}   ⏭️  Nettoyage du cache annulé${NC}"
fi
echo ""

# 5. Rebuild COMPLET sans cache
echo -e "${YELLOW}5. Rebuild complet SANS cache (cela peut prendre 5-10 minutes)...${NC}"
echo -e "${BLUE}   ⏳ Veuillez patienter...${NC}"
sudo docker-compose build --no-cache --pull frontend backend
echo -e "${GREEN}   ✅ Build terminé${NC}"
echo ""

# 6. Démarrer les containers
echo -e "${YELLOW}6. Démarrage des containers...${NC}"
sudo docker-compose up -d frontend backend mongo
echo -e "${GREEN}   ✅ Containers démarrés${NC}"
echo ""

# 7. Attendre que les services soient prêts
echo -e "${YELLOW}7. Attente du démarrage des services (30 secondes)...${NC}"
for i in {30..1}; do
    echo -ne "   ${i}... "
    sleep 1
done
echo ""
echo ""

# 8. Vérifier le statut
echo -e "${YELLOW}8. Vérification du statut:${NC}"
sudo docker-compose ps
echo ""

# 9. Voir les logs récents
echo -e "${YELLOW}9. Logs récents (dernières 30 lignes):${NC}"
echo -e "${BLUE}--- Frontend ---${NC}"
sudo docker-compose logs --tail=30 frontend
echo ""
echo -e "${BLUE}--- Backend ---${NC}"
sudo docker-compose logs --tail=30 backend
echo ""

# 10. Vérifier que les containers sont toujours en cours d'exécution
echo -e "${YELLOW}10. Vérification finale:${NC}"
sleep 5
if sudo docker ps | grep -q azalee-frontend; then
    echo -e "   ${GREEN}✅ Container frontend est en cours d'exécution${NC}"
else
    echo -e "   ${RED}❌ Container frontend s'est arrêté${NC}"
    echo -e "${YELLOW}   Logs d'erreur:${NC}"
    sudo docker-compose logs --tail=20 frontend
fi

if sudo docker ps | grep -q azalee-backend; then
    echo -e "   ${GREEN}✅ Container backend est en cours d'exécution${NC}"
else
    echo -e "   ${RED}❌ Container backend s'est arrêté${NC}"
    echo -e "${YELLOW}   Logs d'erreur:${NC}"
    sudo docker-compose logs --tail=20 backend
fi

echo ""
echo -e "${GREEN}✅ Mise à jour terminée !${NC}"
echo ""
echo -e "${BLUE}📋 Résumé:${NC}"
echo -e "   Commit: ${GREEN}$LAST_COMMIT${NC}"
echo -e "   Containers: ${GREEN}$(sudo docker-compose ps -q | wc -l)${NC}"
echo ""
echo -e "${YELLOW}💡 Pour tester:${NC}"
echo -e "   ${BLUE}curl http://localhost/admin${NC}"
echo -e "   ${BLUE}sudo docker-compose logs -f frontend${NC}"

