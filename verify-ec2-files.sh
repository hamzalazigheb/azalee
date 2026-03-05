#!/bin/bash
# Script pour vérifier que tous les fichiers ont été correctement pullés sur EC2

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Vérification des Fichiers sur EC2${NC}"
echo ""

cd ~/demo || { echo -e "${RED}❌ Directory ~/demo not found${NC}"; exit 1; }

# 1. Vérifier le statut Git
echo -e "${YELLOW}1. Statut Git:${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo -e "   Branche actuelle: ${GREEN}$CURRENT_BRANCH${NC}"

# Vérifier s'il y a des modifications non commitées
if ! git diff-index --quiet HEAD --; then
    echo -e "   ${YELLOW}⚠️  Modifications locales non commitées détectées${NC}"
    git status --short | head -10
else
    echo -e "   ${GREEN}✅ Aucune modification locale${NC}"
fi

# Vérifier si on est à jour avec origin
git fetch origin
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "N/A")

if [ "$REMOTE" != "N/A" ]; then
    if [ "$LOCAL" = "$REMOTE" ]; then
        echo -e "   ${GREEN}✅ À jour avec origin/$CURRENT_BRANCH${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Pas à jour avec origin/$CURRENT_BRANCH${NC}"
        echo -e "   Local:  ${BLUE}$(git log -1 --oneline)${NC}"
        echo -e "   Remote: ${BLUE}$(git log -1 --oneline origin/$CURRENT_BRANCH)${NC}"
    fi
fi

LAST_COMMIT=$(git log -1 --oneline)
echo -e "   Dernier commit local: ${GREEN}$LAST_COMMIT${NC}"
echo ""

# 2. Vérifier les fichiers essentiels
echo -e "${YELLOW}2. Vérification des fichiers essentiels:${NC}"

ESSENTIAL_FILES=(
    "package.json"
    "Dockerfile"
    "docker-compose.yml"
    "next.config.mjs"
    ".env.production"
    "src/app/admin/contacts/page.jsx"
    "src/app/admin/settings/page.jsx"
    "src/app/api/contact/submit/route.js"
    "src/lib/models/Contact.js"
    "src/components/admin/Notification.jsx"
    "src/components/admin/TextEditor.jsx"
    "deploy-all-to-ec2.sh"
    "fix-ec2-repo.sh"
)

MISSING_FILES=0
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo -e "   ${GREEN}✅${NC} $file"
    else
        echo -e "   ${RED}❌${NC} $file ${RED}(MANQUANT)${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "\n   ${GREEN}✅ Tous les fichiers essentiels sont présents${NC}"
else
    echo -e "\n   ${RED}❌ $MISSING_FILES fichier(s) essentiel(s) manquant(s)${NC}"
fi
echo ""

# 3. Vérifier les nouveaux dossiers/fichiers
echo -e "${YELLOW}3. Vérification des nouveaux dossiers/fichiers:${NC}"

NEW_DIRS=(
    "src/app/admin/contacts"
    "src/app/admin/settings"
    "src/app/admin/users"
    "src/app/api/contact"
    "src/app/api/auth/change-password"
    "src/app/api/auth/users"
    "src/components/admin"
    "src/lib/utils"
    "scripts"
)

NEW_FILES_COUNT=0
for dir in "${NEW_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        FILE_COUNT=$(find "$dir" -type f 2>/dev/null | wc -l)
        echo -e "   ${GREEN}✅${NC} $dir ($FILE_COUNT fichiers)"
        NEW_FILES_COUNT=$((NEW_FILES_COUNT + FILE_COUNT))
    else
        echo -e "   ${RED}❌${NC} $dir ${RED}(MANQUANT)${NC}"
    fi
done
echo ""

# 4. Vérifier package.json pour les nouvelles dépendances
echo -e "${YELLOW}4. Vérification des dépendances dans package.json:${NC}"
if [ -f "package.json" ]; then
    if grep -q "@dnd-kit/core" package.json; then
        echo -e "   ${GREEN}✅${NC} @dnd-kit/core"
    else
        echo -e "   ${RED}❌${NC} @dnd-kit/core manquant"
    fi
    
    if grep -q "bcryptjs" package.json; then
        echo -e "   ${GREEN}✅${NC} bcryptjs"
    else
        echo -e "   ${RED}❌${NC} bcryptjs manquant"
    fi
    
    if grep -q "jsonwebtoken" package.json; then
        echo -e "   ${GREEN}✅${NC} jsonwebtoken"
    else
        echo -e "   ${RED}❌${NC} jsonwebtoken manquant"
    fi
    
    if grep -q "mongoose" package.json; then
        echo -e "   ${GREEN}✅${NC} mongoose"
    else
        echo -e "   ${RED}❌${NC} mongoose manquant"
    fi
else
    echo -e "   ${RED}❌ package.json n'existe pas${NC}"
fi
echo ""

# 5. Vérifier .env.production
echo -e "${YELLOW}5. Vérification de .env.production:${NC}"
if [ -f ".env.production" ]; then
    echo -e "   ${GREEN}✅${NC} .env.production existe"
    
    # Vérifier les variables importantes (sans afficher les valeurs)
    REQUIRED_VARS=("MONGODB_URI" "JWT_SECRET" "NEXT_PUBLIC_APP_URL" "NEXT_PUBLIC_API_URL")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env.production; then
            echo -e "   ${GREEN}✅${NC} $var est défini"
        else
            echo -e "   ${RED}❌${NC} $var n'est pas défini"
        fi
    done
else
    echo -e "   ${RED}❌${NC} .env.production n'existe pas"
    echo -e "   ${YELLOW}   Création depuis le template...${NC}"
    if [ -f "env.production.template" ]; then
        cp env.production.template .env.production
        echo -e "   ${GREEN}✅${NC} .env.production créé (veuillez l'éditer)"
    else
        echo -e "   ${RED}❌${NC} env.production.template n'existe pas"
    fi
fi
echo ""

# 6. Compter les fichiers dans src/app/admin/contacts
echo -e "${YELLOW}6. Détails du système de contact:${NC}"
if [ -d "src/app/admin/contacts" ]; then
    CONTACT_FILES=$(find src/app/admin/contacts -type f | wc -l)
    echo -e "   ${GREEN}✅${NC} src/app/admin/contacts ($CONTACT_FILES fichiers)"
    
    if [ -f "src/app/admin/contacts/page.jsx" ]; then
        FILE_SIZE=$(wc -l < src/app/admin/contacts/page.jsx)
        echo -e "   ${GREEN}✅${NC} page.jsx ($FILE_SIZE lignes)"
    fi
else
    echo -e "   ${RED}❌${NC} src/app/admin/contacts n'existe pas"
fi

if [ -d "src/app/api/contact" ]; then
    API_FILES=$(find src/app/api/contact -type f | wc -l)
    echo -e "   ${GREEN}✅${NC} src/app/api/contact ($API_FILES fichiers)"
else
    echo -e "   ${RED}❌${NC} src/app/api/contact n'existe pas"
fi

if [ -f "src/lib/models/Contact.js" ]; then
    echo -e "   ${GREEN}✅${NC} Contact.js model"
else
    echo -e "   ${RED}❌${NC} Contact.js model manquant"
fi
echo ""

# 7. Résumé
echo -e "${BLUE}📋 Résumé:${NC}"
echo -e "   Dernier commit: ${GREEN}$LAST_COMMIT${NC}"
echo -e "   Fichiers essentiels manquants: ${RED}$MISSING_FILES${NC}"
echo -e "   Nouveaux fichiers trouvés: ${GREEN}$NEW_FILES_COUNT${NC}"
echo ""

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les fichiers semblent être présents !${NC}"
    echo ""
    echo -e "${YELLOW}💡 Prochaines étapes:${NC}"
    echo -e "   1. Vérifier .env.production: ${BLUE}cat .env.production${NC}"
    echo -e "   2. Rebuild les containers: ${BLUE}sudo docker-compose build --no-cache frontend backend${NC}"
    echo -e "   3. Démarrer: ${BLUE}sudo docker-compose up -d frontend backend${NC}"
else
    echo -e "${RED}❌ Certains fichiers sont manquants. Faites un pull:${NC}"
    echo -e "   ${BLUE}git pull origin prod${NC}"
fi

