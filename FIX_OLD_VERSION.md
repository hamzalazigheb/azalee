# 🔧 Résolution : Ancienne Version sur le Serveur

## Problème
Les fichiers ont été pullés mais le serveur affiche toujours l'ancienne version.

## Cause
Les containers Docker utilisent encore l'ancienne version en cache. Il faut forcer un rebuild complet.

## Solution Rapide

### Option 1: Script Automatique (Recommandé)

```bash
cd ~/demo
chmod +x force-update-ec2.sh
./force-update-ec2.sh
```

### Option 2: Commandes Manuelles

```bash
cd ~/demo

# 1. Pull les dernières modifications
git pull origin prod

# 2. Arrêter les containers
sudo docker-compose down

# 3. Supprimer les anciennes images
sudo docker rmi $(sudo docker images | grep -E 'azalee|demo' | awk '{print $3}') 2>/dev/null || true

# 4. Rebuild SANS cache (IMPORTANT: --no-cache)
sudo docker-compose build --no-cache frontend backend

# 5. Démarrer
sudo docker-compose up -d frontend backend

# 6. Attendre 30 secondes
sleep 30

# 7. Vérifier
sudo docker-compose ps
sudo docker-compose logs --tail=30 frontend
```

## Pourquoi --no-cache est Important

Sans `--no-cache`, Docker réutilise les couches en cache, ce qui signifie :
- Les anciens fichiers peuvent être utilisés
- Les nouvelles dépendances ne sont pas installées
- Les modifications de code ne sont pas prises en compte

Avec `--no-cache`, Docker :
- Reconstruit tout depuis le début
- Installe toutes les dépendances à nouveau
- Utilise les nouveaux fichiers pullés

## Vérification que la Nouvelle Version est Déployée

### 1. Vérifier le Commit dans le Container

```bash
# Entrer dans le container
sudo docker exec -it azalee-frontend sh

# Vérifier la date de modification des fichiers
ls -la /app/src/app/admin/contacts/page.jsx
stat /app/src/app/admin/contacts/page.jsx

# Sortir
exit
```

### 2. Vérifier les Logs de Build

```bash
# Voir les logs de build (doit montrer les nouveaux fichiers)
sudo docker-compose logs frontend | grep -i "admin/contacts"
```

### 3. Tester l'Application

```bash
# Tester l'endpoint admin
curl http://localhost/admin

# Tester l'endpoint contacts
curl http://localhost/admin/contacts
```

## Si Ça Ne Fonctionne Toujours Pas

### Solution 1: Nettoyer Complètement Docker

```bash
cd ~/demo

# Arrêter tout
sudo docker-compose down

# Supprimer toutes les images
sudo docker rmi $(sudo docker images -q) 2>/dev/null || true

# Nettoyer le système
sudo docker system prune -af

# Rebuild complet
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

### Solution 2: Vérifier les Fichiers dans le Container

```bash
# Vérifier que les nouveaux fichiers sont dans le container
sudo docker exec azalee-frontend ls -la /app/src/app/admin/contacts/
sudo docker exec azalee-frontend ls -la /app/src/app/api/contact/
sudo docker exec azalee-frontend cat /app/src/lib/models/Contact.js | head -10
```

### Solution 3: Vérifier le Cache Next.js

```bash
# Entrer dans le container
sudo docker exec -it azalee-frontend sh

# Supprimer le cache Next.js
rm -rf /app/.next

# Redémarrer le container
exit
sudo docker-compose restart frontend
```

## Checklist de Vérification

- [ ] `git pull origin prod` a été exécuté
- [ ] Les fichiers sont présents sur le serveur (`ls -la src/app/admin/contacts/`)
- [ ] `docker-compose build --no-cache` a été utilisé
- [ ] Les containers ont été redémarrés
- [ ] Les logs ne montrent pas d'erreurs
- [ ] L'application répond avec la nouvelle version

## Commandes de Diagnostic

```bash
cd ~/demo

# Vérification complète
echo "=== Git ===" && \
git log -1 --oneline && \
echo "" && \
echo "=== Docker Images ===" && \
sudo docker images | grep azalee && \
echo "" && \
echo "=== Containers ===" && \
sudo docker-compose ps && \
echo "" && \
echo "=== Fichiers dans Container ===" && \
sudo docker exec azalee-frontend ls -la /app/src/app/admin/contacts/ 2>/dev/null || echo "Container non démarré"
```

## Important

**Toujours utiliser `--no-cache` lors du rebuild** pour s'assurer que les nouvelles modifications sont prises en compte :

```bash
sudo docker-compose build --no-cache frontend backend
```

Sans `--no-cache`, Docker peut utiliser des couches en cache qui contiennent l'ancienne version.

