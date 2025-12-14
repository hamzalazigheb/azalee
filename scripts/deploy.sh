#!/bin/bash

# Script de déploiement rapide
# Usage: ./scripts/deploy.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Starting deployment..."
echo ""

# 1. Récupérer les changements
echo "1️⃣ Pulling latest changes..."
git pull origin prod
echo "✅ Changes pulled"
echo ""

# 2. Arrêter les containers
echo "2️⃣ Stopping Docker containers..."
sudo docker-compose down
echo "✅ Containers stopped"
echo ""

# 3. Rebuild les images
echo "3️⃣ Building Docker images (this may take a few minutes)..."
sudo docker-compose build --no-cache frontend backend
echo "✅ Images built"
echo ""

# 4. Démarrer les containers
echo "4️⃣ Starting Docker containers..."
sudo docker-compose up -d
echo "✅ Containers started"
echo ""

# 5. Attendre que les containers soient prêts
echo "5️⃣ Waiting for containers to be ready..."
sleep 5

# 6. Vérifier l'état
echo "6️⃣ Checking container status..."
sudo docker-compose ps
echo ""

# 7. Test rapide
echo "7️⃣ Testing website..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://azalee-patrimoine.fr)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ Website is responding (HTTP $HTTP_CODE)"
else
    echo "⚠️  Website returned HTTP $HTTP_CODE"
fi
echo ""

echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   - Check logs: sudo docker-compose logs -f frontend"
echo "   - Test site: https://azalee-patrimoine.fr"
echo ""



