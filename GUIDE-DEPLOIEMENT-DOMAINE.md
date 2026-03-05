# 🚀 Guide de déploiement - azalee-patrimoine.fr

## 📋 Étapes rapides

### 1️⃣ Configuration DNS sur 2switch

1. Connectez-vous à votre panneau 2switch
2. Allez dans la gestion DNS de votre domaine `azalee-patrimoine.fr`
3. Ajoutez/modifiez ces enregistrements :

```
Type: A
Nom: @
Valeur: VOTRE_IP_SERVEUR (ex: 51.xxx.xxx.xxx)
TTL: 3600

Type: A
Nom: www
Valeur: VOTRE_IP_SERVEUR (même IP)
TTL: 3600
```

**⚠️ Important :** Attendez 5-10 minutes après la modification DNS avant de continuer.

### 2️⃣ Sur votre serveur (51.xxx.xxx.xxx)

#### A. Connectez-vous au serveur
```bash
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo
```

#### B. Récupérez les nouveaux fichiers
```bash
git pull origin prod
```

#### C. Rendez le script exécutable
```bash
chmod +x scripts/setup-domain.sh
```

#### D. Modifiez l'email dans le script (optionnel)
```bash
nano scripts/setup-domain.sh
# Changez la ligne : EMAIL="contact@azalee-patrimoine.fr"
```

#### E. Exécutez le script automatique
```bash
./scripts/setup-domain.sh
```

Le script va automatiquement :
- ✅ Installer Nginx
- ✅ Installer Certbot (Let's Encrypt)
- ✅ Générer le certificat SSL gratuit
- ✅ Configurer Nginx comme reverse proxy
- ✅ Configurer le renouvellement automatique du SSL

### 3️⃣ Configuration manuelle (si le script ne fonctionne pas)

Si le script automatique ne fonctionne pas, suivez ces étapes :

```bash
# 1. Installer Nginx
sudo apt update
sudo apt install -y nginx

# 2. Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# 3. Arrêter Nginx temporairement
sudo systemctl stop nginx

# 4. Générer le certificat SSL
sudo certbot certonly --standalone -d azalee-patrimoine.fr -d www.azalee-patrimoine.fr

# 5. Copier la configuration Nginx
sudo cp nginx/azalee-patrimoine.conf /etc/nginx/sites-available/azalee-patrimoine.fr

# 6. Activer le site
sudo ln -s /etc/nginx/sites-available/azalee-patrimoine.fr /etc/nginx/sites-enabled/

# 7. Supprimer le site par défaut
sudo rm /etc/nginx/sites-enabled/default

# 8. Tester la configuration
sudo nginx -t

# 9. Démarrer Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 10. Configurer le renouvellement automatique
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 4️⃣ Mettre à jour les variables d'environnement

```bash
# Créer le fichier .env.production
nano .env.production
```

Ajoutez ces lignes :
```
NEXT_PUBLIC_APP_URL=https://azalee-patrimoine.fr
NEXT_PUBLIC_API_URL=https://azalee-patrimoine.fr/api
JWT_SECRET=votre-secret-jwt-securise-ici
```

### 5️⃣ Redémarrer les containers Docker

```bash
sudo docker-compose down
sudo docker-compose up -d
```

### 6️⃣ Vérifier que tout fonctionne

```bash
# Vérifier Nginx
sudo systemctl status nginx

# Vérifier les containers
sudo docker-compose ps

# Tester le site
curl -I https://azalee-patrimoine.fr
```

### 7️⃣ Ouvrir dans le navigateur

Visitez :
- ✅ https://azalee-patrimoine.fr
- ✅ https://www.azalee-patrimoine.fr

## 🔧 Dépannage

### Le certificat SSL ne se génère pas

1. Vérifiez que les DNS sont bien propagés :
```bash
dig azalee-patrimoine.fr
# ou
nslookup azalee-patrimoine.fr
```

2. Vérifiez que les ports 80 et 443 sont ouverts :
```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Nginx ne démarre pas

```bash
# Vérifier la configuration
sudo nginx -t

# Voir les erreurs
sudo tail -f /var/log/nginx/error.log
```

### Le site ne charge pas

```bash
# Vérifier que le container écoute sur le port 80
sudo docker-compose ps
sudo netstat -tlnp | grep 80

# Voir les logs
sudo docker-compose logs frontend
```

## 📝 Notes importantes

- Le certificat SSL se renouvelle automatiquement tous les 90 jours
- Nginx fait le reverse proxy vers votre container Docker sur le port 80
- Toutes les requêtes HTTP sont automatiquement redirigées vers HTTPS
- Le domaine `www.azalee-patrimoine.fr` redirige vers `azalee-patrimoine.fr`

## ✅ Checklist finale

- [ ] DNS configuré sur 2switch
- [ ] Nginx installé et configuré
- [ ] Certificat SSL généré
- [ ] Variables d'environnement mises à jour
- [ ] Containers Docker redémarrés
- [ ] Site accessible en HTTPS
- [ ] Redirection HTTP → HTTPS fonctionne

---

**Besoin d'aide ?** Consultez le fichier `README-DEPLOYMENT.md` pour plus de détails.

