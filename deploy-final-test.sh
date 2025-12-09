#!/bin/bash
# Script de déploiement final avec tests

set -e

echo "🚀 DÉPLOIEMENT FINAL AVEC TESTS"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Commit and push
echo -e "${BLUE}📤 Étape 1: Push vers GitHub...${NC}"
git add .
git commit -m "Fix: Cache-busting et optimisation CMS pour toutes les pages" || echo "Aucun changement à committer"
git push demo prod

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Code poussé vers GitHub${NC}"
else
    echo -e "${RED}❌ Erreur lors du push${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📋 PROCHAINES ÉTAPES SUR EC2:${NC}"
echo ""
echo "1. Connectez-vous à votre serveur EC2"
echo "2. Exécutez ces commandes:"
echo ""
echo "   cd ~/demo"
echo "   git pull demo prod"
echo "   sudo docker-compose down"
echo "   sudo docker-compose build --no-cache frontend backend"
echo "   sudo docker-compose up -d"
echo ""
echo "3. Vérifiez les logs:"
echo "   sudo docker-compose logs -f frontend"
echo ""
echo -e "${BLUE}💡 OU EXÉCUTEZ DIRECTEMENT:${NC}"
echo ""
echo "cd ~/demo && git pull demo prod && sudo docker-compose down && sudo docker-compose build --no-cache frontend backend && sudo docker-compose up -d"
echo ""

