# 🔧 Résolution : Containers Frontend/Backend Ne Démarrant Pas

## Problème Identifié
- ✅ MongoDB (`azalee-mongo`) fonctionne
- ❌ Frontend (`azalee-frontend`) n'est pas démarré
- ❌ Backend (`azalee-backend`) n'est pas démarré

## Solutions Étape par Étape

### Solution 1: Diagnostic Complet

Exécutez ce script sur EC2 pour voir exactement ce qui ne va pas :

```bash
cd ~/demo
chmod +x start-containers.sh
./start-containers.sh
```

### Solution 2: Voir les Logs des Containers Arrêtés

```bash
cd ~/demo

# Voir pourquoi le frontend ne démarre pas
sudo docker-compose logs frontend

# Voir pourquoi le backend ne démarre pas
sudo docker-compose logs backend

# Voir toutes les erreurs
sudo docker-compose logs | grep -i error
```

### Solution 3: Rebuild et Redémarrer

```bash
cd ~/demo

# 1. Arrêter tout
sudo docker-compose down

# 2. Rebuild SANS cache
sudo docker-compose build --no-cache frontend backend

# 3. Démarrer
sudo docker-compose up -d

# 4. Attendre 30 secondes
sleep 30

# 5. Vérifier
sudo docker-compose ps
```

### Solution 4: Vérifier les Variables d'Environnement

```bash
cd ~/demo

# Vérifier que .env.production existe
ls -la .env.production

# Voir son contenu
cat .env.production

# Si nécessaire, le recréer
cp env.production.template .env.production
nano .env.production
```

### Solution 5: Vérifier les Erreurs de Build

```bash
cd ~/demo

# Essayer de build manuellement pour voir les erreurs
sudo docker-compose build frontend 2>&1 | tee build.log

# Chercher les erreurs
grep -i error build.log
```

### Solution 6: Vérifier les Ports

```bash
# Vérifier si le port 80 est déjà utilisé
sudo netstat -tlnp | grep :80

# Vérifier si le port 3000 est déjà utilisé
sudo netstat -tlnp | grep :3000

# Si un port est utilisé, arrêter le processus ou changer le port dans docker-compose.yml
```

### Solution 7: Nettoyer et Recommencer

```bash
cd ~/demo

# Arrêter tout
sudo docker-compose down

# Supprimer les containers arrêtés
sudo docker-compose rm -f

# Supprimer les images (optionnel)
sudo docker rmi $(sudo docker images | grep azalee | awk '{print $3}') 2>/dev/null || true

# Rebuild complet
sudo docker-compose build --no-cache

# Démarrer
sudo docker-compose up -d

# Attendre et vérifier
sleep 30
sudo docker-compose ps
sudo docker-compose logs --tail=30 frontend
```

## Erreurs Communes et Solutions

### Erreur: "Cannot connect to MongoDB"
```bash
# Vérifier que MongoDB est sain
sudo docker-compose ps mongo

# Vérifier la connexion
sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.runCommand('ping')"
```

### Erreur: "Port already in use"
```bash
# Trouver le processus qui utilise le port
sudo lsof -i :80
sudo lsof -i :3000

# Arrêter le processus ou changer le port dans docker-compose.yml
```

### Erreur: "Build failed"
```bash
# Vérifier que tous les fichiers sont présents
ls -la Dockerfile
ls -la package.json

# Vérifier les permissions
sudo chown -R $USER:$USER ~/demo
```

### Erreur: "Environment variable not set"
```bash
# Vérifier .env.production
cat .env.production

# S'assurer que toutes les variables nécessaires sont définies:
# - MONGODB_URI
# - JWT_SECRET
# - NEXT_PUBLIC_APP_URL
# - NEXT_PUBLIC_API_URL
```

## Commandes de Diagnostic Rapide

```bash
cd ~/demo

# Tout en une fois
echo "=== Status ===" && \
sudo docker-compose ps && \
echo "" && \
echo "=== Frontend Logs ===" && \
sudo docker-compose logs --tail=30 frontend && \
echo "" && \
echo "=== Backend Logs ===" && \
sudo docker-compose logs --tail=30 backend && \
echo "" && \
echo "=== Errors ===" && \
sudo docker-compose logs 2>&1 | grep -i error | tail -10
```

## Après Résolution

Une fois les containers démarrés :

1. Vérifier qu'ils sont bien en cours d'exécution :
   ```bash
   sudo docker-compose ps
   ```

2. Tester l'application :
   ```bash
   curl http://localhost/admin
   ```

3. Vider le cache du navigateur et tester dans le navigateur

