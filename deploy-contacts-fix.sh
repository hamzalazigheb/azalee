#!/bin/bash
# Script pour déployer la correction du lag des contacts

set -e

echo "🚀 Déploiement de la correction du lag des contacts..."

# Push vers le repo
echo "📤 Push vers GitHub..."
git add .
git commit -m "Fix: Optimisation changement statut contacts (mise à jour optimiste)" || echo "Aucun changement à committer"
git push demo prod

echo ""
echo "✅ Code poussé vers GitHub"
echo ""
echo "📋 Prochaines étapes sur EC2:"
echo "1. cd ~/demo"
echo "2. git pull demo prod"
echo "3. sudo docker-compose down"
echo "4. sudo docker-compose build --no-cache frontend backend"
echo "5. sudo docker-compose up -d"
echo ""
echo "Ou exécutez directement sur EC2:"
echo "cd ~/demo && git pull demo prod && sudo docker-compose down && sudo docker-compose build --no-cache frontend backend && sudo docker-compose up -d"

