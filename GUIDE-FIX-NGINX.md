# 🔧 Guide de correction - Nginx et SSL

## Problème : Nginx ne démarre pas

Le certificat SSL n'a pas été généré car le port 80 était occupé par Docker.

## Solution étape par étape

### 1. Résoudre le conflit Git

```bash
# Option 1 : Sauvegarder vos modifications locales
git stash

# Option 2 : Écraser les modifications locales (si vous n'avez pas fait de changements importants)
git checkout -- scripts/setup-domain.sh

# Puis récupérer les nouveaux fichiers
git pull origin prod
```

### 2. Arrêter Docker pour libérer le port 80

```bash
cd ~/demo
sudo docker-compose down
```

### 3. Vérifier que le port 80 est libre

```bash
sudo lsof -i :80
# Si rien ne s'affiche, le port est libre ✅
```

### 4. Générer le certificat SSL

```bash
sudo certbot certonly --standalone -d azalee-patrimoine.fr -d www.azalee-patrimoine.fr
```

**Important :** Assurez-vous que :
- Les DNS pointent vers votre serveur (vérifiez avec `dig azalee-patrimoine.fr`)
- Le port 80 est accessible depuis l'extérieur

### 5. Configurer Nginx

```bash
# Copier la configuration
sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr

# Activer le site
sudo ln -sf /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/

# Supprimer le site par défaut
sudo rm -f /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t
```

### 6. Redémarrer Docker

```bash
sudo docker-compose up -d
```

### 7. Démarrer Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 8. Vérifier que tout fonctionne

```bash
# Vérifier le statut de Nginx
sudo systemctl status nginx

# Vérifier les containers Docker
sudo docker-compose ps

# Tester le site
curl -I https://azalee-patrimoine.fr
```

## Dépannage

### Si Nginx ne démarre toujours pas

```bash
# Voir les erreurs détaillées
sudo journalctl -xeu nginx.service

# Vérifier la configuration
sudo nginx -t

# Vérifier que le certificat existe
sudo ls -la /etc/letsencrypt/live/azalee-patrimoine.fr/
```

### Si le certificat n'existe pas

Le certificat doit être généré AVANT de démarrer Nginx. Si Nginx démarre sans certificat, il échouera.

### Si le port 80 est toujours occupé

```bash
# Trouver ce qui utilise le port 80
sudo lsof -i :80
sudo netstat -tlnp | grep :80

# Arrêter le processus (remplacez PID par le numéro du processus)
sudo kill -9 PID
```

## Commandes complètes (copier-coller)

```bash
# 1. Résoudre Git
git stash
git pull origin prod

# 2. Arrêter Docker
cd ~/demo
sudo docker-compose down

# 3. Générer le certificat SSL
sudo certbot certonly --standalone -d azalee-patrimoine.fr -d www.azalee-patrimoine.fr

# 4. Configurer Nginx
sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr
sudo ln -sf /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t

# 5. Redémarrer tout
sudo docker-compose up -d
sudo systemctl start nginx
sudo systemctl enable nginx

# 6. Vérifier
sudo systemctl status nginx
curl -I https://azalee-patrimoine.fr
```

