#!/bin/bash
# Script de déploiement robuste pour EC2
# Nettoie, rebuild et redémarre les containers

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Déploiement Robuste sur EC2${NC}"
echo ""

# Configuration
APP_DIR="${APP_DIR:-$HOME/demo}"
BRANCH="${BRANCH:-prod}"

cd "$APP_DIR" || { echo -e "${RED}❌ Directory $APP_DIR not found${NC}"; exit 1; }

echo -e "${GREEN}📂 Working directory: $APP_DIR${NC}"
echo ""

# 1. Vérifier le statut Git
echo -e "${YELLOW}1. Vérification du statut Git...${NC}"
git fetch origin
CURRENT_BRANCH=$(git branch --show-current)
echo -e "   Branche actuelle: ${GREEN}$CURRENT_BRANCH${NC}"

if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo -e "${YELLOW}   ⚠️  Passage à la branche $BRANCH...${NC}"
    git checkout "$BRANCH"
fi

# Vérifier s'il y a des modifications locales
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}   ⚠️  Modifications locales détectées. Sauvegarde...${NC}"
    git stash
fi

# Pull les dernières modifications
echo -e "${YELLOW}   📥 Pull des dernières modifications...${NC}"
git pull origin "$BRANCH" || { echo -e "${RED}❌ Erreur lors du pull${NC}"; exit 1; }

LAST_COMMIT=$(git log -1 --oneline)
echo -e "   ${GREEN}✅ Dernier commit: $LAST_COMMIT${NC}"
echo ""

# 2. Arrêter les containers
echo -e "${YELLOW}2. Arrêt des containers...${NC}"
sudo docker-compose down
echo -e "${GREEN}✅ Containers arrêtés${NC}"
echo ""

# 3. Nettoyer les images et le cache (optionnel mais recommandé)
echo -e "${YELLOW}3. Nettoyage des images frontend/backend...${NC}"
sudo docker-compose rm -f frontend backend 2>/dev/null || true
sudo docker rmi $(sudo docker images | grep -E 'azalee-(fr|ba)' | awk '{print $3}') 2>/dev/null || true
echo -e "${GREEN}✅ Nettoyage terminé${NC}"
echo ""

# 4. Rebuild sans cache pour forcer la reconstruction complète
echo -e "${YELLOW}4. Rebuild complet (sans cache)...${NC}"
sudo docker-compose build --no-cache frontend backend
echo -e "${GREEN}✅ Build terminé${NC}"
echo ""

# 5. Démarrer les containers
echo -e "${YELLOW}5. Démarrage des containers...${NC}"
sudo docker-compose up -d frontend backend
echo -e "${GREEN}✅ Containers démarrés${NC}"
echo ""

# 6. Attendre que les services soient prêts
echo -e "${YELLOW}6. Attente du démarrage des services (10 secondes)...${NC}"
sleep 10

# 7. Vérifier le statut
echo -e "${YELLOW}7. Vérification du statut...${NC}"
sudo docker-compose ps

echo ""
echo -e "${GREEN}✅ Déploiement terminé !${NC}"
echo ""
echo -e "${BLUE}📋 Informations:${NC}"
echo -e "   Commit: ${GREEN}$LAST_COMMIT${NC}"
echo -e "   Branche: ${GREEN}$CURRENT_BRANCH${NC}"
echo ""
echo -e "${YELLOW}💡 Commandes utiles:${NC}"
echo -e "   Logs frontend: ${BLUE}sudo docker-compose logs -f frontend${NC}"
echo -e "   Logs backend:  ${BLUE}sudo docker-compose logs -f backend${NC}"
echo -e "   Redémarrer:    ${BLUE}sudo docker-compose restart frontend backend${NC}"
echo ""
echo -e "${YELLOW}⚠️  Si vous ne voyez pas les modifications:${NC}"
echo -e "   1. Videz le cache de votre navigateur (Ctrl+Shift+R ou Cmd+Shift+R)"
echo -e "   2. Vérifiez les logs: ${BLUE}sudo docker-compose logs frontend${NC}"
echo -e "   3. Vérifiez que le port 80 est accessible"
echo -e "   4. Attendez quelques secondes pour que Next.js compile"

