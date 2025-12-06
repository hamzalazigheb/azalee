#!/bin/bash
# Script pour diagnostiquer et corriger le problème de container qui s'arrête

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Diagnostic et Correction du Container qui S'Arrête${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier les logs du container backend
echo -e "${YELLOW}1. Logs du container backend (dernières 50 lignes):${NC}"
sudo docker-compose logs --tail=50 backend
echo ""

# 2. Vérifier si le build existe dans le container
echo -e "${YELLOW}2. Vérification du build dans le container backend:${NC}"
if sudo docker ps -a | grep -q azalee-backend; then
    echo -e "${BLUE}   Vérification de l'existence de .next...${NC}"
    sudo docker exec azalee-backend ls -la /app/.next 2>&1 || echo -e "${RED}   ❌ Le dossier .next n'existe pas dans le container${NC}"
    
    echo -e "${BLUE}   Vérification de package.json...${NC}"
    sudo docker exec azalee-backend cat /app/package.json | grep -A 5 '"serve"' || echo -e "${RED}   ❌ Script serve non trouvé${NC}"
else
    echo -e "${RED}   ❌ Container azalee-backend n'existe pas${NC}"
fi
echo ""

# 3. Vérifier les variables d'environnement
echo -e "${YELLOW}3. Vérification de .env.production:${NC}"
if [ -f .env.production ]; then
    echo -e "${GREEN}   ✅ .env.production existe${NC}"
    echo -e "${BLUE}   Variables importantes:${NC}"
    grep -E "MONGODB_URI|JWT_SECRET|NEXT_PUBLIC" .env.production | sed 's/=.*/=***/' || echo "   Aucune variable trouvée"
else
    echo -e "${RED}   ❌ .env.production n'existe pas${NC}"
    echo -e "${YELLOW}   Création depuis le template...${NC}"
    if [ -f env.production.template ]; then
        cp env.production.template .env.production
        echo -e "${GREEN}   ✅ .env.production créé${NC}"
        echo -e "${YELLOW}   ⚠️  Veuillez éditer .env.production avec les bonnes valeurs${NC}"
    fi
fi
echo ""

# 4. Arrêter les containers
echo -e "${YELLOW}4. Arrêt des containers...${NC}"
sudo docker-compose down
echo ""

# 5. Rebuild complet SANS cache
echo -e "${YELLOW}5. Rebuild complet (sans cache)...${NC}"
echo -e "${BLUE}   Cela peut prendre plusieurs minutes...${NC}"
sudo docker-compose build --no-cache frontend backend
echo -e "${GREEN}   ✅ Build terminé${NC}"
echo ""

# 6. Démarrer les containers
echo -e "${YELLOW}6. Démarrage des containers...${NC}"
sudo docker-compose up -d frontend backend

# Attendre 15 secondes
echo -e "${YELLOW}   Attente de 15 secondes...${NC}"
sleep 15

# 7. Vérifier le statut
echo ""
echo -e "${YELLOW}7. Statut des containers:${NC}"
sudo docker-compose ps
echo ""

# 8. Voir les logs récents
echo -e "${YELLOW}8. Logs récents (dernières 30 lignes):${NC}"
echo -e "${BLUE}--- Backend ---${NC}"
sudo docker-compose logs --tail=30 backend
echo ""
echo -e "${BLUE}--- Frontend ---${NC}"
sudo docker-compose logs --tail=30 frontend
echo ""

# 9. Vérifier si les containers sont toujours en cours d'exécution
echo -e "${YELLOW}9. Vérification finale:${NC}"
sleep 5
if sudo docker ps | grep -q azalee-backend; then
    echo -e "${GREEN}   ✅ Container backend est en cours d'exécution${NC}"
else
    echo -e "${RED}   ❌ Container backend s'est arrêté${NC}"
    echo -e "${YELLOW}   Logs d'erreur:${NC}"
    sudo docker-compose logs backend | tail -20
fi

if sudo docker ps | grep -q azalee-frontend; then
    echo -e "${GREEN}   ✅ Container frontend est en cours d'exécution${NC}"
else
    echo -e "${RED}   ❌ Container frontend s'est arrêté${NC}"
    echo -e "${YELLOW}   Logs d'erreur:${NC}"
    sudo docker-compose logs frontend | tail -20
fi

echo ""
echo -e "${GREEN}✅ Diagnostic terminé${NC}"
echo ""
echo -e "${YELLOW}💡 Si les containers s'arrêtent encore:${NC}"
echo -e "   1. Vérifier les logs: ${BLUE}sudo docker-compose logs -f${NC}"
echo -e "   2. Vérifier .env.production: ${BLUE}cat .env.production${NC}"
echo -e "   3. Vérifier que MongoDB est sain: ${BLUE}sudo docker-compose ps mongo${NC}"
echo -e "   4. Essayer de démarrer manuellement: ${BLUE}sudo docker-compose up frontend backend${NC}"

