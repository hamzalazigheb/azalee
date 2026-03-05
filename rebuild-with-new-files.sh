#!/bin/bash
# Script pour rebuild le container avec les nouveaux fichiers

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔨 Rebuild Complet avec les Nouveaux Fichiers${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier que les fichiers sont sur le serveur
echo -e "${YELLOW}1. Vérification des fichiers sur le serveur:${NC}"
if [ -f "src/app/admin/contacts/page.jsx" ]; then
    FILE_SIZE=$(wc -l < src/app/admin/contacts/page.jsx)
    echo -e "   ${GREEN}✅ src/app/admin/contacts/page.jsx existe ($FILE_SIZE lignes)${NC}"
else
    echo -e "   ${RED}❌ src/app/admin/contacts/page.jsx N'EXISTE PAS${NC}"
    echo -e "${YELLOW}   Récupération depuis Git...${NC}"
    git checkout origin/prod -- src/app/admin/contacts/ || {
        echo -e "${RED}   ❌ Impossible de récupérer les fichiers${NC}"
        exit 1
    }
fi

if [ -f "src/app/api/contact/submit/route.js" ]; then
    echo -e "   ${GREEN}✅ src/app/api/contact/submit/route.js existe${NC}"
else
    echo -e "   ${RED}❌ src/app/api/contact/submit/route.js N'EXISTE PAS${NC}"
    git checkout origin/prod -- src/app/api/contact/ || {
        echo -e "${RED}   ❌ Impossible de récupérer les fichiers${NC}"
        exit 1
    }
fi

if [ -f "src/lib/models/Contact.js" ]; then
    echo -e "   ${GREEN}✅ src/lib/models/Contact.js existe${NC}"
else
    echo -e "   ${RED}❌ src/lib/models/Contact.js N'EXISTE PAS${NC}"
    git checkout origin/prod -- src/lib/models/Contact.js || {
        echo -e "${RED}   ❌ Impossible de récupérer les fichiers${NC}"
        exit 1
    }
fi
echo ""

# 2. Arrêter les containers
echo -e "${YELLOW}2. Arrêt des containers...${NC}"
sudo docker-compose down
echo -e "${GREEN}   ✅ Containers arrêtés${NC}"
echo ""

# 3. Supprimer les images existantes
echo -e "${YELLOW}3. Suppression des anciennes images...${NC}"
sudo docker-compose rm -f frontend backend 2>/dev/null || true
sudo docker rmi $(sudo docker images | grep -E 'azalee|demo' | awk '{print $3}') 2>/dev/null || true
echo -e "${GREEN}   ✅ Images supprimées${NC}"
echo ""

# 4. Vérifier le Dockerfile
echo -e "${YELLOW}4. Vérification du Dockerfile:${NC}"
if [ -f "Dockerfile" ]; then
    echo -e "   ${GREEN}✅ Dockerfile existe${NC}"
    # Vérifier que COPY . . est présent
    if grep -q "COPY \. \." Dockerfile || grep -q "COPY --from=builder" Dockerfile; then
        echo -e "   ${GREEN}✅ Dockerfile copie les fichiers${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Vérifiez que Dockerfile copie tous les fichiers${NC}"
    fi
else
    echo -e "   ${RED}❌ Dockerfile n'existe pas${NC}"
    exit 1
fi
echo ""

# 5. Rebuild COMPLET sans cache
echo -e "${YELLOW}5. Rebuild COMPLET sans cache (cela peut prendre 5-10 minutes)...${NC}"
echo -e "${BLUE}   ⏳ Veuillez patienter...${NC}"
echo -e "${YELLOW}   Cette étape va copier TOUS les fichiers dans le container${NC}"
sudo docker-compose build --no-cache --pull frontend backend 2>&1 | tee build.log
echo -e "${GREEN}   ✅ Build terminé${NC}"
echo ""

# 6. Vérifier que les fichiers sont maintenant dans l'image
echo -e "${YELLOW}6. Vérification des fichiers dans l'image Docker...${NC}"
# Créer un container temporaire pour vérifier
TEMP_CONTAINER=$(sudo docker create azalee-frontend:latest 2>/dev/null || echo "")
if [ -n "$TEMP_CONTAINER" ]; then
    if sudo docker cp "$TEMP_CONTAINER:/app/src/app/admin/contacts/page.jsx" /tmp/test_contacts.jsx 2>/dev/null; then
        echo -e "   ${GREEN}✅ admin/contacts/page.jsx est dans l'image${NC}"
        rm -f /tmp/test_contacts.jsx
    else
        echo -e "   ${RED}❌ admin/contacts/page.jsx N'EST PAS dans l'image${NC}"
    fi
    
    if sudo docker cp "$TEMP_CONTAINER:/app/src/app/api/contact/submit/route.js" /tmp/test_submit.js 2>/dev/null; then
        echo -e "   ${GREEN}✅ api/contact/submit/route.js est dans l'image${NC}"
        rm -f /tmp/test_submit.js
    else
        echo -e "   ${RED}❌ api/contact/submit/route.js N'EST PAS dans l'image${NC}"
    fi
    
    sudo docker rm "$TEMP_CONTAINER" 2>/dev/null || true
else
    echo -e "   ${YELLOW}⚠️  Impossible de créer un container temporaire pour vérifier${NC}"
fi
echo ""

# 7. Démarrer les containers
echo -e "${YELLOW}7. Démarrage des containers...${NC}"
sudo docker-compose up -d frontend backend mongo
echo -e "${GREEN}   ✅ Containers démarrés${NC}"
echo ""

# 8. Attendre le démarrage
echo -e "${YELLOW}8. Attente du démarrage (30 secondes)...${NC}"
sleep 30
echo ""

# 9. Vérifier que les fichiers sont dans le container en cours d'exécution
echo -e "${YELLOW}9. Vérification dans le container en cours d'exécution:${NC}"
if sudo docker exec azalee-frontend ls -la /app/src/app/admin/contacts/ 2>/dev/null; then
    echo -e "   ${GREEN}✅ Les fichiers sont dans le container${NC}"
else
    echo -e "   ${RED}❌ Les fichiers NE SONT PAS dans le container${NC}"
    echo -e "${YELLOW}   Vérification du contenu du container:${NC}"
    sudo docker exec azalee-frontend ls -la /app/src/app/admin/ 2>/dev/null || echo "   Dossier admin n'existe pas"
fi
echo ""

# 10. Vérifier le statut
echo -e "${YELLOW}10. Statut des containers:${NC}"
sudo docker-compose ps
echo ""

# 11. Tester l'application
echo -e "${YELLOW}11. Test de l'application:${NC}"
if curl -s http://localhost/admin/contacts | grep -q "404\|not found"; then
    echo -e "   ${RED}❌ La page retourne 404${NC}"
    echo -e "${YELLOW}   Vérifiez les logs:${NC}"
    sudo docker-compose logs --tail=20 frontend | grep -i error || echo "   Aucune erreur dans les logs"
else
    echo -e "   ${GREEN}✅ L'application répond${NC}"
fi
echo ""

echo -e "${GREEN}✅ Rebuild terminé !${NC}"
echo ""
echo -e "${YELLOW}💡 Si les fichiers ne sont toujours pas là:${NC}"
echo -e "   1. Vérifiez le Dockerfile: ${BLUE}cat Dockerfile${NC}"
echo -e "   2. Vérifiez les logs de build: ${BLUE}cat build.log | grep -i error${NC}"
echo -e "   3. Vérifiez .dockerignore: ${BLUE}cat .dockerignore${NC}"

