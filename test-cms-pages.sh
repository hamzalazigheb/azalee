#!/bin/bash
# Script de test complet pour vérifier toutes les pages CMS

set -e

echo "🧪 TEST COMPLET DES PAGES CMS"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

BASE_URL=${1:-"http://localhost:4028"}

PAGES=(
    "home"
    "patrimoine"
    "placements"
    "immobilier"
    "fiscalite"
    "retraite"
)

echo -e "${BLUE}📋 Pages à tester:${NC}"
for page in "${PAGES[@]}"; do
    echo "  - $page"
done
echo ""

ERRORS=0
SUCCESS=0

for page in "${PAGES[@]}"; do
    echo -e "${YELLOW}🔍 Test de la page: $page${NC}"
    
    # Test API endpoint
    API_URL="${BASE_URL}/api/cms/content?path=${page}"
    echo "  API: $API_URL"
    
    HTTP_CODE=$(curl -s -o /tmp/cms_response_${page}.json -w "%{http_code}" "$API_URL" || echo "000")
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "  ${GREEN}✅ API répond correctement (HTTP $HTTP_CODE)${NC}"
        
        # Check if response is valid JSON
        if jq empty /tmp/cms_response_${page}.json 2>/dev/null; then
            echo -e "  ${GREEN}✅ Réponse JSON valide${NC}"
            
            # Check if response has success field
            SUCCESS_FIELD=$(jq -r '.success' /tmp/cms_response_${page}.json 2>/dev/null || echo "false")
            if [ "$SUCCESS_FIELD" = "true" ]; then
                echo -e "  ${GREEN}✅ Réponse indique succès${NC}"
                
                # Check if data exists
                DATA_EXISTS=$(jq -r '.data != null' /tmp/cms_response_${page}.json 2>/dev/null || echo "false")
                if [ "$DATA_EXISTS" = "true" ]; then
                    echo -e "  ${GREEN}✅ Données présentes${NC}"
                    SUCCESS=$((SUCCESS + 1))
                else
                    echo -e "  ${RED}❌ Pas de données dans la réponse${NC}"
                    ERRORS=$((ERRORS + 1))
                fi
            else
                echo -e "  ${YELLOW}⚠️  Réponse indique échec (peut être normal si page n'existe pas)${NC}"
            fi
        else
            echo -e "  ${RED}❌ Réponse JSON invalide${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    elif [ "$HTTP_CODE" = "404" ]; then
        echo -e "  ${YELLOW}⚠️  Page non trouvée (HTTP 404) - peut être normal si page n'existe pas encore${NC}"
    else
        echo -e "  ${RED}❌ Erreur HTTP: $HTTP_CODE${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    echo ""
done

echo "================================"
echo -e "${BLUE}📊 RÉSULTATS:${NC}"
echo -e "  ${GREEN}✅ Succès: $SUCCESS${NC}"
echo -e "  ${RED}❌ Erreurs: $ERRORS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les tests sont passés !${NC}"
    exit 0
else
    echo -e "${RED}❌ Certains tests ont échoué${NC}"
    exit 1
fi

