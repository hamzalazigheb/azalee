#!/bin/bash
# Script pour forcer le pull complet de tous les fichiers sur EC2

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📥 Pull Complet de Tous les Fichiers sur EC2${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier le remote
echo -e "${YELLOW}1. Vérification du remote:${NC}"
git remote -v
echo ""

# 2. Vérifier la branche actuelle
echo -e "${YELLOW}2. Branche actuelle:${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo -e "   ${GREEN}$CURRENT_BRANCH${NC}"

# S'assurer qu'on est sur prod
if [ "$CURRENT_BRANCH" != "prod" ]; then
    echo -e "${YELLOW}   ⚠️  Passage à la branche prod...${NC}"
    git checkout prod || git checkout -b prod origin/prod
fi
echo ""

# 3. Sauvegarder les modifications locales (si présentes)
echo -e "${YELLOW}3. Sauvegarde des modifications locales:${NC}"
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}   Modifications locales détectées, sauvegarde...${NC}"
    git stash
    echo -e "${GREEN}   ✅ Modifications sauvegardées${NC}"
else
    echo -e "${GREEN}   ✅ Aucune modification locale${NC}"
fi
echo ""

# 4. Fetch depuis tous les remotes
echo -e "${YELLOW}4. Récupération depuis les remotes:${NC}"
git fetch --all
echo -e "${GREEN}   ✅ Fetch terminé${NC}"
echo ""

# 5. Vérifier les différences avec origin/prod
echo -e "${YELLOW}5. Vérification des différences avec origin/prod:${NC}"
COMMITS_AHEAD=$(git rev-list HEAD..origin/prod --count 2>/dev/null || echo "0")
COMMITS_BEHIND=$(git rev-list origin/prod..HEAD --count 2>/dev/null || echo "0")

if [ "$COMMITS_AHEAD" != "0" ]; then
    echo -e "   ${YELLOW}⚠️  $COMMITS_AHEAD commit(s) en avance sur origin/prod${NC}"
    git log HEAD..origin/prod --oneline | head -5
fi

if [ "$COMMITS_BEHIND" != "0" ]; then
    echo -e "   ${YELLOW}⚠️  $COMMITS_BEHIND commit(s) en retard sur origin/prod${NC}"
    git log origin/prod..HEAD --oneline | head -5
fi

if [ "$COMMITS_AHEAD" = "0" ] && [ "$COMMITS_BEHIND" = "0" ]; then
    echo -e "   ${GREEN}✅ À jour avec origin/prod${NC}"
fi
echo ""

# 6. Reset hard vers origin/prod pour forcer la synchronisation
echo -e "${YELLOW}6. Synchronisation complète avec origin/prod:${NC}"
echo -e "${YELLOW}   ⚠️  Cela va écraser les modifications locales...${NC}"
read -p "   Continuer? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git reset --hard origin/prod
    echo -e "${GREEN}   ✅ Reset terminé${NC}"
else
    echo -e "${YELLOW}   ⏭️  Reset annulé, pull normal...${NC}"
    git pull origin prod
fi
echo ""

# 7. Nettoyer les fichiers non trackés (optionnel)
echo -e "${YELLOW}7. Nettoyage des fichiers non trackés:${NC}"
UNTRACKED=$(git ls-files --others --exclude-standard | wc -l)
if [ "$UNTRACKED" != "0" ]; then
    echo -e "   ${YELLOW}⚠️  $UNTRACKED fichier(s) non tracké(s) trouvé(s)${NC}"
    read -p "   Supprimer les fichiers non trackés? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git clean -fd
        echo -e "${GREEN}   ✅ Nettoyage terminé${NC}"
    else
        echo -e "${YELLOW}   ⏭️  Nettoyage annulé${NC}"
    fi
else
    echo -e "${GREEN}   ✅ Aucun fichier non tracké${NC}"
fi
echo ""

# 8. Vérifier les fichiers essentiels
echo -e "${YELLOW}8. Vérification des fichiers essentiels:${NC}"

ESSENTIAL_FILES=(
    "src/app/admin/contacts/page.jsx"
    "src/app/admin/settings/page.jsx"
    "src/app/api/contact/submit/route.js"
    "src/lib/models/Contact.js"
    "src/components/admin/Notification.jsx"
    "src/components/admin/TextEditor.jsx"
)

MISSING=0
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        SIZE=$(wc -l < "$file" 2>/dev/null || echo "0")
        echo -e "   ${GREEN}✅${NC} $file ($SIZE lignes)"
    else
        echo -e "   ${RED}❌${NC} $file ${RED}(MANQUANT)${NC}"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    echo -e "\n   ${GREEN}✅ Tous les fichiers essentiels sont présents !${NC}"
else
    echo -e "\n   ${RED}❌ $MISSING fichier(s) manquant(s)${NC}"
    echo -e "${YELLOW}   Tentative de checkout spécifique...${NC}"
    for file in "${ESSENTIAL_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            git checkout origin/prod -- "$file" 2>/dev/null && \
            echo -e "   ${GREEN}✅ Récupéré: $file${NC}" || \
            echo -e "   ${RED}❌ Impossible de récupérer: $file${NC}"
        fi
    done
fi
echo ""

# 9. Afficher le dernier commit
echo -e "${YELLOW}9. Dernier commit:${NC}"
git log -1 --oneline
echo ""

# 10. Résumé
echo -e "${BLUE}📋 Résumé:${NC}"
echo -e "   Branche: ${GREEN}$(git branch --show-current)${NC}"
echo -e "   Dernier commit: ${GREEN}$(git log -1 --oneline)${NC}"
echo -e "   Fichiers manquants: ${RED}$MISSING${NC}"
echo ""

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ Pull réussi ! Tous les fichiers sont présents.${NC}"
    echo ""
    echo -e "${YELLOW}💡 Prochaines étapes:${NC}"
    echo -e "   1. Vérifier .env.production: ${BLUE}cat .env.production${NC}"
    echo -e "   2. Rebuild: ${BLUE}sudo docker-compose build --no-cache frontend backend${NC}"
    echo -e "   3. Démarrer: ${BLUE}sudo docker-compose up -d frontend backend${NC}"
else
    echo -e "${RED}❌ Certains fichiers sont toujours manquants.${NC}"
    echo -e "${YELLOW}   Vérifiez que les fichiers sont bien dans le repository:${NC}"
    echo -e "   ${BLUE}git ls-tree -r origin/prod --name-only | grep contacts${NC}"
fi

