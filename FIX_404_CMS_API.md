# 🔧 Fix 404 Error - CMS API Routes

## Problème
Les routes `/api/cms/content` et `/api/cms/pages` retournent 404 sur le serveur `51.44.8.80`.

## Solution Complète

### Étape 1 : Vérifier et Commit Local (si nécessaire)

```bash
# Vérifier que les fichiers existent
ls -la src/app/api/cms/content/route.js
ls -la src/app/api/cms/pages/route.js

# Si modifications non commitées
git add src/app/api/cms/
git commit -m "Fix: Ensure CMS API routes are included"
git push origin prod
```

### Étape 2 : Sur le Serveur EC2

```bash
# 1. Se connecter
ssh ubuntu@51.44.8.80

# 2. Aller dans le répertoire
cd ~/demo

# 3. Vérifier le remote
git remote -v
# Doit afficher: origin https://github.com/hamzalazigheb/demo.git (ou azalee)

# 4. Sauvegarder les changements locaux (si nécessaire)
git stash

# 5. Pull les dernières modifications
git pull origin prod

# 6. Vérifier que les fichiers existent
ls -la src/app/api/cms/content/route.js
ls -la src/app/api/cms/pages/route.js

# Si les fichiers n'existent PAS, forcer la synchronisation:
git reset --hard origin/prod
git pull origin prod

# 7. Vérifier la structure
tree src/app/api/cms/ -L 2
# Doit afficher:
# src/app/api/cms/
# ├── content/
# │   └── route.js
# └── pages/
#     └── route.js
```

### Étape 3 : Rebuild Docker (CRUCIAL)

```bash
# Arrêter les containers
sudo docker-compose down

# Rebuild SANS CACHE (important!)
sudo docker-compose build --no-cache frontend backend

# Redémarrer
sudo docker-compose up -d frontend backend

# Attendre quelques secondes
sleep 10

# Vérifier les logs
sudo docker-compose logs --tail=100 frontend | grep -i "api\|route\|error"
```

### Étape 4 : Vérification

```bash
# Tester les routes directement
curl http://localhost:4028/api/cms/content?path=sara
curl http://localhost:4028/api/cms/pages?path=sara

# Vérifier les logs en temps réel
sudo docker-compose logs -f frontend
```

### Étape 5 : Si le problème persiste

```bash
# Vérifier que Next.js a bien compilé les routes
sudo docker exec -it demo-frontend-1 ls -la /app/.next/server/app/api/cms/

# Vérifier les variables d'environnement
sudo docker exec -it demo-frontend-1 env | grep -i mongo

# Redémarrer complètement
sudo docker-compose restart frontend backend
```

## Script Automatique Complet

```bash
#!/bin/bash
# fix-cms-api-complete.sh

echo "🔍 Fix CMS API Routes - Démarrage..."

cd ~/demo || exit 1

echo "📥 Pull des dernières modifications..."
git pull origin prod

echo "✅ Vérification des fichiers..."
if [ ! -f "src/app/api/cms/content/route.js" ]; then
    echo "❌ Fichier content/route.js manquant - Forcer sync..."
    git reset --hard origin/prod
    git pull origin prod
fi

if [ ! -f "src/app/api/cms/pages/route.js" ]; then
    echo "❌ Fichier pages/route.js manquant - Forcer sync..."
    git reset --hard origin/prod
    git pull origin prod
fi

echo "🔨 Rebuild Docker..."
sudo docker-compose down
sudo docker-compose build --no-cache frontend backend
sudo docker-compose up -d frontend backend

echo "⏳ Attente du démarrage..."
sleep 15

echo "✅ Vérification..."
curl -s http://localhost:4028/api/cms/content?path=sara | head -20

echo ""
echo "✅ Déploiement terminé!"
echo "📋 Logs:"
sudo docker-compose logs --tail=30 frontend
```

## Commandes Rapides (Copy-Paste)

```bash
# Sur le serveur - Exécuter ces commandes dans l'ordre:
cd ~/demo && git pull origin prod && git reset --hard origin/prod && git pull origin prod && sudo docker-compose down && sudo docker-compose build --no-cache frontend backend && sudo docker-compose up -d frontend backend && sleep 15 && curl http://localhost:4028/api/cms/content?path=sara
```

## Vérification Finale

Après le déploiement, tester dans le navigateur:
- ✅ `http://51.44.8.80:4028/api/cms/content?path=sara`
- ✅ `http://51.44.8.80:4028/api/cms/pages?path=sara`
- ✅ `http://51.44.8.80:4028/admin/chatbot`

Les routes doivent retourner du JSON, pas 404.


