# 🔧 Résolution : Container S'Arrête avec Code 0

## Problème
Le container `azalee-backend` (ou `azalee-frontend`) s'arrête immédiatement après le démarrage avec le code de sortie 0.

## Causes Possibles

1. **Build Next.js manquant ou invalide** - Le dossier `.next` n'existe pas dans le container
2. **Variables d'environnement manquantes** - `.env.production` n'existe pas ou est incomplet
3. **Erreur lors du démarrage de Next.js** - `next start` échoue silencieusement
4. **Dépendances manquantes** - MongoDB n'est pas accessible
5. **Port déjà utilisé** - Le port 3000 ou 80 est déjà occupé

## Solution Automatique

Utilisez le script de diagnostic et correction :

```bash
cd ~/demo
chmod +x fix-container-exit.sh
./fix-container-exit.sh
```

## Solutions Manuelles

### Solution 1: Vérifier les Logs Détaillés

```bash
cd ~/demo

# Voir tous les logs du backend
sudo docker-compose logs backend

# Voir les erreurs spécifiques
sudo docker-compose logs backend 2>&1 | grep -i error

# Démarrer en mode interactif pour voir les erreurs en temps réel
sudo docker-compose up backend
```

### Solution 2: Vérifier que le Build Existe

```bash
# Entrer dans le container (s'il est encore en cours d'exécution)
sudo docker exec -it azalee-backend sh

# Vérifier que .next existe
ls -la /app/.next

# Vérifier package.json
cat /app/package.json | grep serve

# Sortir
exit
```

### Solution 3: Rebuild Complet

```bash
cd ~/demo

# Arrêter tout
sudo docker-compose down

# Supprimer les anciennes images
sudo docker rmi $(sudo docker images | grep azalee | awk '{print $3}') 2>/dev/null || true

# Rebuild SANS cache
sudo docker-compose build --no-cache frontend backend

# Démarrer
sudo docker-compose up -d

# Voir les logs en temps réel
sudo docker-compose logs -f
```

### Solution 4: Vérifier .env.production

```bash
cd ~/demo

# Vérifier que le fichier existe
ls -la .env.production

# Voir son contenu (masquer les valeurs sensibles)
cat .env.production | sed 's/=.*/=***/'

# Si le fichier n'existe pas, le créer
if [ ! -f .env.production ]; then
    cp env.production.template .env.production
    echo "⚠️  Veuillez éditer .env.production avec les bonnes valeurs"
    nano .env.production
fi
```

### Solution 5: Vérifier MongoDB

```bash
# Vérifier que MongoDB est sain
sudo docker-compose ps mongo

# Tester la connexion
sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.runCommand('ping')"

# Si MongoDB n'est pas sain, le redémarrer
sudo docker-compose restart mongo
```

### Solution 6: Démarrer en Mode Interactif

Pour voir exactement ce qui se passe :

```bash
cd ~/demo

# Arrêter les containers
sudo docker-compose down

# Démarrer en mode interactif (non-détaché)
sudo docker-compose up frontend backend
```

Cela affichera toutes les erreurs en temps réel. Appuyez sur `Ctrl+C` pour arrêter.

### Solution 7: Vérifier les Ports

```bash
# Vérifier si le port 3000 est utilisé
sudo netstat -tlnp | grep :3000

# Vérifier si le port 80 est utilisé
sudo netstat -tlnp | grep :80

# Si un port est utilisé, trouver le processus
sudo lsof -i :3000
sudo lsof -i :80

# Arrêter le processus si nécessaire
sudo kill -9 <PID>
```

## Erreurs Communes

### Erreur: "Cannot find module"
```bash
# Rebuild avec installation complète des dépendances
sudo docker-compose build --no-cache frontend backend
```

### Erreur: "MongoDB connection failed"
```bash
# Vérifier que MongoDB est démarré
sudo docker-compose up -d mongo

# Attendre qu'il soit sain
sleep 10
sudo docker-compose ps mongo
```

### Erreur: "Port 3000 already in use"
```bash
# Trouver et arrêter le processus
sudo lsof -i :3000
sudo kill -9 <PID>

# Ou changer le port dans docker-compose.yml
```

## Checklist de Diagnostic

- [ ] Les logs montrent-ils une erreur spécifique ?
- [ ] Le fichier `.env.production` existe-t-il ?
- [ ] Le build Next.js (`.next`) existe-t-il dans le container ?
- [ ] MongoDB est-il sain et accessible ?
- [ ] Les ports 3000 et 80 sont-ils libres ?
- [ ] Les dépendances npm sont-elles installées ?
- [ ] Le script `serve` existe-t-il dans `package.json` ?

## Commandes de Diagnostic Rapide

```bash
cd ~/demo

# Tout en une fois
echo "=== Status ===" && \
sudo docker-compose ps && \
echo "" && \
echo "=== Backend Logs ===" && \
sudo docker-compose logs --tail=50 backend && \
echo "" && \
echo "=== Frontend Logs ===" && \
sudo docker-compose logs --tail=50 frontend && \
echo "" && \
echo "=== Errors ===" && \
sudo docker-compose logs 2>&1 | grep -i error | tail -10 && \
echo "" && \
echo "=== .env.production ===" && \
[ -f .env.production ] && echo "✅ Existe" || echo "❌ N'existe pas"
```

