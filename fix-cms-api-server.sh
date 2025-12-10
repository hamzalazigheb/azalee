#!/bin/bash

# Script pour corriger les routes API CMS sur le serveur EC2
# À exécuter sur le serveur EC2

echo "🔍 Fix CMS API Routes - Démarrage..."

# Aller dans le répertoire du projet
cd ~/demo || exit 1

echo "📥 Pull des dernières modifications..."
git pull origin prod

echo "✅ Vérification des fichiers API..."

# Vérifier si les fichiers API existent
if [ ! -f "src/app/api/cms/content/route.js" ]; then
    echo "❌ Fichier src/app/api/cms/content/route.js manquant!"
    echo "🔄 Forcer la synchronisation..."
    git reset --hard origin/prod
    git pull origin prod
fi

if [ ! -f "src/app/api/cms/pages/route.js" ]; then
    echo "❌ Fichier src/app/api/cms/pages/route.js manquant!"
    echo "🔄 Forcer la synchronisation..."
    git reset --hard origin/prod
    git pull origin prod
fi

# Vérifier la structure des dossiers
if [ ! -d "src/app/api/cms" ]; then
    echo "❌ Dossier src/app/api/cms manquant!"
    echo "🔄 Forcer la synchronisation..."
    git reset --hard origin/prod
    git pull origin prod
fi

echo "✅ Fichiers vérifiés:"
ls -la src/app/api/cms/content/route.js
ls -la src/app/api/cms/pages/route.js

echo ""
echo "🔨 Reconstruction des containers Docker (sans cache)..."

# Arrêter les containers
sudo docker-compose down

# Rebuild sans cache (CRUCIAL pour inclure les nouvelles routes)
sudo docker-compose build --no-cache frontend backend

# Redémarrer les services
sudo docker-compose up -d frontend backend

echo ""
echo "⏳ Attente du démarrage (15 secondes)..."
sleep 15

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "📋 Test des routes API:"
echo "Testing /api/cms/content?path=sara..."
curl -s http://localhost:4028/api/cms/content?path=sara | head -5

echo ""
echo "📋 Derniers logs frontend:"
sudo docker-compose logs --tail=30 frontend | grep -i "api\|route\|error\|ready" || sudo docker-compose logs --tail=30 frontend

