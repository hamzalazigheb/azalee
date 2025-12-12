# Guide de déploiement - azalee-patrimoine.fr

## Prérequis

1. Serveur avec IP publique (ex: 51.x.x.x)
2. Domaine `azalee-patrimoine.fr` configuré sur 2switch
3. Accès SSH au serveur
4. Docker et Docker Compose installés

## Étapes de déploiement

### 1. Configuration DNS sur 2switch

Connectez-vous à votre panneau 2switch et configurez les enregistrements DNS :

```
Type: A
Nom: @
Valeur: VOTRE_IP_SERVEUR (ex: 51.x.x.x)
TTL: 3600

Type: A
Nom: www
Valeur: VOTRE_IP_SERVEUR (ex: 51.x.x.x)
TTL: 3600
```

### 2. Sur le serveur

#### A. Connectez-vous au serveur
```bash
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo
```

#### B. Récupérez les fichiers de configuration
```bash
git pull origin prod
```

#### C. Rendez le script exécutable
```bash
chmod +x scripts/setup-domain.sh
```

#### D. Exécutez le script de configuration
```bash
# Modifiez l'email dans le script si nécessaire
nano scripts/setup-domain.sh  # Changez EMAIL="contact@azalee-patrimoine.fr"

# Exécutez le script
./scripts/setup-domain.sh
```

Le script va :
- Installer Nginx
- Installer Certbot (Let's Encrypt)
- Générer le certificat SSL
- Configurer Nginx comme reverse proxy
- Configurer le renouvellement automatique du certificat SSL

### 3. Configuration manuelle (si le script ne fonctionne pas)

#### A. Installer Nginx
```bash
sudo apt update
sudo apt install -y nginx
```

#### B. Installer Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### C. Générer le certificat SSL
```bash
# Arrêter Nginx temporairement
sudo systemctl stop nginx

# Générer le certificat
sudo certbot certonly --standalone -d azalee-patrimoine.fr -d www.azalee-patrimoine.fr
```

#### D. Configurer Nginx
```bash
# Copier la configuration
sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr

# Activer le site
sudo ln -s /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/

# Supprimer le site par défaut
sudo rm /etc/nginx/sites-enabled/default

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

#### E. Configurer le renouvellement automatique
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 4. Mettre à jour les variables d'environnement

```bash
# Créer ou modifier .env.production
nano .env.production
```

Ajoutez/modifiez :
```
NEXT_PUBLIC_APP_URL=https://azalee-patrimoine.fr
NEXT_PUBLIC_API_URL=https://azalee-patrimoine.fr/api
```

### 5. Redémarrer les containers Docker

```bash
sudo docker-compose down
sudo docker-compose up -d
```

### 6. Vérifier le déploiement

1. Vérifiez que Nginx fonctionne :
```bash
sudo systemctl status nginx
```

2. Vérifiez que les containers Docker fonctionnent :
```bash
sudo docker-compose ps
```

3. Testez le site :
```bash
curl -I https://azalee-patrimoine.fr
```

4. Ouvrez dans un navigateur :
   - https://azalee-patrimoine.fr
   - https://www.azalee-patrimoine.fr

## Dépannage

### Le certificat SSL ne se génère pas

1. Vérifiez que les DNS pointent correctement :
```bash
dig azalee-patrimoine.fr
nslookup azalee-patrimoine.fr
```

2. Vérifiez que le port 80 est ouvert :
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Nginx ne démarre pas

1. Vérifiez la configuration :
```bash
sudo nginx -t
```

2. Vérifiez les logs :
```bash
sudo tail -f /var/log/nginx/error.log
```

### Le site ne charge pas

1. Vérifiez que le container Docker écoute sur le port 80 :
```bash
sudo docker-compose ps
sudo netstat -tlnp | grep 80
```

2. Vérifiez les logs du container :
```bash
sudo docker-compose logs frontend
```

## Maintenance

### Renouveler manuellement le certificat SSL
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Vérifier le renouvellement automatique
```bash
sudo certbot renew --dry-run
```

### Redémarrer les services
```bash
sudo systemctl restart nginx
sudo docker-compose restart
```

