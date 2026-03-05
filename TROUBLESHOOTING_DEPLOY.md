# 🔧 Dépannage - Modifications Non Visibles après Déploiement

## Problème
Après `git pull` et `docker-compose up -d --build`, les nouvelles modifications ne sont pas visibles.

## Solutions

### 1. Rebuild Complet (Sans Cache)
Le cache Docker peut empêcher la reconstruction complète :

```bash
cd ~/demo

# Arrêter les containers
sudo docker-compose down

# Supprimer les anciennes images
sudo docker rmi $(sudo docker images | grep -E 'azalee-(fr|ba)' | awk '{print $3}') 2>/dev/null || true

# Rebuild SANS cache
sudo docker-compose build --no-cache frontend backend

# Redémarrer
sudo docker-compose up -d frontend backend
```

### 2. Vérifier que le Pull a Fonctionné
```bash
cd ~/demo
git log --oneline -5
# Vérifiez que le dernier commit contient vos modifications
```

### 3. Vérifier les Logs
```bash
# Voir les logs du frontend
sudo docker-compose logs -f frontend

# Voir les logs du backend
sudo docker-compose logs -f backend

# Chercher des erreurs
sudo docker-compose logs frontend | grep -i error
```

### 4. Vider le Cache du Navigateur
- **Chrome/Edge**: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
- **Firefox**: `Ctrl+F5` ou `Ctrl+Shift+R`
- Ou vider complètement le cache dans les paramètres du navigateur

### 5. Vérifier que les Fichiers sont Bien dans le Container
```bash
# Entrer dans le container frontend
sudo docker exec -it azalee-fr sh

# Vérifier les fichiers
ls -la /app/src/app/admin/contacts/
# ou
cat /app/package.json
```

### 6. Forcer le Redémarrage Complet
```bash
cd ~/demo

# Arrêter tout
sudo docker-compose down

# Supprimer les volumes (⚠️ ATTENTION: supprime les données)
# sudo docker-compose down -v

# Rebuild complet
sudo docker-compose build --no-cache

# Redémarrer
sudo docker-compose up -d

# Attendre 30 secondes
sleep 30

# Vérifier
sudo docker-compose ps
```

### 7. Vérifier les Variables d'Environnement
```bash
# Vérifier que .env.production existe et est à jour
cd ~/demo
cat .env.production

# Si nécessaire, recréer depuis le template
cp env.production.template .env.production
nano .env.production
```

### 8. Script de Déploiement Robuste
Utilisez le script `deploy-ec2-robust.sh` :

```bash
# Copier le script sur EC2
scp deploy-ec2-robust.sh ubuntu@your-ec2-ip:~/

# Sur EC2
chmod +x deploy-ec2-robust.sh
./deploy-ec2-robust.sh
```

### 9. Vérifier le Port et l'Accessibilité
```bash
# Vérifier que le port 80 est ouvert
sudo netstat -tlnp | grep :80

# Vérifier depuis l'extérieur
curl http://localhost/admin
```

### 10. Next.js - Forcer la Recompilation
Si c'est un problème de cache Next.js :

```bash
# Entrer dans le container
sudo docker exec -it azalee-fr sh

# Supprimer le cache Next.js
rm -rf .next

# Redémarrer le container
exit
sudo docker-compose restart frontend
```

## Checklist de Diagnostic

- [ ] Le `git pull` a bien récupéré les modifications ?
- [ ] Les containers sont bien démarrés (`docker-compose ps`) ?
- [ ] Les logs ne montrent pas d'erreurs ?
- [ ] Le cache du navigateur a été vidé ?
- [ ] Les fichiers sont bien dans le container ?
- [ ] Next.js a bien compilé (vérifier les logs) ?
- [ ] Le port 80 est accessible ?

## Commandes de Diagnostic Rapide

```bash
# Tout en une fois
cd ~/demo && \
echo "=== Git Status ===" && \
git log --oneline -3 && \
echo "" && \
echo "=== Docker Status ===" && \
sudo docker-compose ps && \
echo "" && \
echo "=== Frontend Logs (last 20 lines) ===" && \
sudo docker-compose logs --tail=20 frontend
```

