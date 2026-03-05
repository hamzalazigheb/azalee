#!/bin/bash
# Script pour démarrer et diagnostiquer les containers

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Diagnostic et Démarrage des Containers${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier le statut actuel
echo -e "${YELLOW}1. Statut actuel des containers:${NC}"
sudo docker-compose ps
echo ""

# 2. Voir les logs des containers arrêtés
echo -e "${YELLOW}2. Logs des containers (dernières 50 lignes):${NC}"
echo -e "${BLUE}--- Frontend ---${NC}"
sudo docker-compose logs --tail=50 frontend 2>&1 || echo "Aucun log disponible"
echo ""
echo -e "${BLUE}--- Backend ---${NC}"
sudo docker-compose logs --tail=50 backend 2>&1 || echo "Aucun log disponible"
echo ""

# 3. Vérifier les images
echo -e "${YELLOW}3. Images Docker disponibles:${NC}"
sudo docker images | grep -E 'azalee|REPOSITORY' || echo "Aucune image azalee trouvée"
echo ""

# 4. Essayer de démarrer les containers
echo -e "${YELLOW}4. Tentative de démarrage des containers...${NC}"
sudo docker-compose up -d frontend backend

# Attendre 10 secondes
sleep 10

# 5. Vérifier le statut après démarrage
echo ""
echo -e "${YELLOW}5. Statut après démarrage:${NC}"
sudo docker-compose ps
echo ""

# 6. Voir les logs récents
echo -e "${YELLOW}6. Logs récents (dernières 20 lignes):${NC}"
echo -e "${BLUE}--- Frontend ---${NC}"
sudo docker-compose logs --tail=20 frontend
echo ""
echo -e "${BLUE}--- Backend ---${NC}"
sudo docker-compose logs --tail=20 backend
echo ""

# 7. Vérifier les erreurs
echo -e "${YELLOW}7. Recherche d'erreurs dans les logs:${NC}"
ERRORS_FRONTEND=$(sudo docker-compose logs frontend 2>&1 | grep -i error | tail -5)
ERRORS_BACKEND=$(sudo docker-compose logs backend 2>&1 | grep -i error | tail -5)

if [ -n "$ERRORS_FRONTEND" ]; then
    echo -e "${RED}❌ Erreurs Frontend:${NC}"
    echo "$ERRORS_FRONTEND"
else
    echo -e "${GREEN}✅ Aucune erreur dans les logs frontend${NC}"
fi

if [ -n "$ERRORS_BACKEND" ]; then
    echo -e "${RED}❌ Erreurs Backend:${NC}"
    echo "$ERRORS_BACKEND"
else
    echo -e "${GREEN}✅ Aucune erreur dans les logs backend${NC}"
fi

echo ""
echo -e "${GREEN}✅ Diagnostic terminé${NC}"
echo ""
echo -e "${YELLOW}💡 Si les containers ne démarrent pas:${NC}"
echo -e "   1. Rebuild complet: ${BLUE}sudo docker-compose build --no-cache frontend backend${NC}"
echo -e "   2. Vérifier .env.production: ${BLUE}cat .env.production${NC}"
echo -e "   3. Vérifier les logs détaillés: ${BLUE}sudo docker-compose logs -f${NC}"

