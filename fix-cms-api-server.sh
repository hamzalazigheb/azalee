#!/bin/bash

# Script pour corriger les routes API CMS sur le serveur EC2
# À exécuter sur le serveur EC2

echo "🔍 Vérification des routes API CMS..."

# Aller dans le répertoire du projet
cd ~/demo || exit 1

# Vérifier si les fichiers API existent
if [ ! -f "src/app/api/cms/content/route.js" ]; then
    echo "❌ Fichier src/app/api/cms/content/route.js manquant!"
    echo "📥 Pull des dernières modifications..."
    git pull origin prod
fi

if [ ! -f "src/app/api/cms/pages/route.js" ]; then
    echo "❌ Fichier src/app/api/cms/pages/route.js manquant!"
    echo "📥 Pull des dernières modifications..."
    git pull origin prod
fi

# Vérifier la structure des dossiers
if [ ! -d "src/app/api/cms" ]; then
    echo "❌ Dossier src/app/api/cms manquant!"
    echo "📥 Pull des dernières modifications..."
    git pull origin prod
fi

echo "✅ Vérification terminée"
echo ""
echo "🔨 Reconstruction des containers Docker..."

# Arrêter les containers
sudo docker-compose down

# Rebuild sans cache
sudo docker-compose build --no-cache frontend backend

# Redémarrer les services
sudo docker-compose up -d frontend backend

echo ""
echo "✅ Déploiement terminé!"
echo "📋 Vérification des logs..."
sudo docker-compose logs --tail=50 frontend

