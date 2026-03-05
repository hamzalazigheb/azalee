# 🚀 Guide de Déploiement en Production

## ✅ Changements Pushés

**Branch:** `prod`  
**Commit:** `edc90d9`  
**Date:** 2026-01-19

### 📋 Résumé des Changements

1. **Sécurité** ✅
   - Validation JWT secret obligatoire
   - Rate limiting (IP-based)
   - Input validation (Zod schemas)
   - Suppression console.log en production

2. **CMS** ✅
   - Bouton d'upload d'images pour membres d'équipe
   - Upload vers `/public/images/` (max 10MB)
   - Détection automatique des champs images
   - Synchronisation améliorée

3. **Images** ✅
   - Migration vers Next.js `<Image>` component
   - Optimisation automatique (AVIF, WebP)
   - Support base64
   - Qualité haute résolution

4. **SEO** ✅
   - 20 redirections URL (91% couverture CSV)
   - Meta descriptions via CMS
   - Redirections permanentes (301)

5. **Fonctionnalités** ✅
   - Bouton Calendly modifiable via CMS
   - Section équipe gérable
   - Scripts d'administration

---

## 🖥️ Déploiement sur le Serveur

### Option 1 : Serveur avec Docker (Recommandé)

#### 1. Se connecter au serveur
```bash
ssh user@votre-serveur.com
```

#### 2. Aller dans le dossier du projet
```bash
cd /path/to/azalee-patrimoine
```

#### 3. Pull les derniers changements
```bash
git pull origin prod
```

#### 4. Vérifier les variables d'environnement
```bash
# Éditer .env.production
nano .env.production
```

**Variables obligatoires :**
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/azalee-patrimoine

# JWT Secret (IMPORTANT: Changer la valeur par défaut !)
JWT_SECRET=votre-secret-jwt-super-securise-minimum-32-caracteres

# App URL
NEXT_PUBLIC_APP_URL=https://azalee-patrimoine.fr

# Node Environment
NODE_ENV=production

# Stock API (optionnel)
STOCK_API_PROVIDER=yahoo
STOCK_API_KEY=votre-cle-api-si-necessaire
```

#### 5. Rebuild et redémarrer les containers Docker
```bash
# Arrêter les containers actuels
docker-compose down

# Rebuild avec les nouveaux changements
docker-compose build --no-cache

# Démarrer
docker-compose up -d

# Vérifier les logs
docker-compose logs -f --tail=100
```

#### 6. Vérifier le déploiement
```bash
# Vérifier que les containers tournent
docker-compose ps

# Tester l'application
curl -I https://azalee-patrimoine.fr
```

---

### Option 2 : Serveur sans Docker

#### 1. Se connecter au serveur
```bash
ssh user@votre-serveur.com
```

#### 2. Aller dans le dossier du projet
```bash
cd /path/to/azalee-patrimoine
```

#### 3. Pull les derniers changements
```bash
git pull origin prod
```

#### 4. Installer les dépendances
```bash
npm ci --production
```

#### 5. Build le projet
```bash
# Supprimer le cache
rm -rf .next

# Build
npm run build
```

#### 6. Redémarrer le service
```bash
# Avec PM2
pm2 restart azalee-patrimoine
pm2 logs azalee-patrimoine

# Avec systemd
sudo systemctl restart azalee-patrimoine
sudo systemctl status azalee-patrimoine

# Ou manuellement
npm run start
```

---

## 🔐 Configuration Post-Déploiement

### 1. Créer un Utilisateur Admin (Si nécessaire)

```bash
# Sur le serveur, dans le dossier du projet
node scripts/create-admin.js contact@azalee-patrimoine.fr "MotDePasseSecurise123!" "Admin"
```

### 2. Initialiser la Section Équipe (Si nécessaire)

```bash
node scripts/init-team-section.js
```

### 3. Vérifier MongoDB

```bash
# Se connecter à MongoDB
mongo azalee-patrimoine

# Vérifier les collections
show collections

# Vérifier un utilisateur admin
db.users.findOne({ email: "contact@azalee-patrimoine.fr" })

# Vérifier la page home
db.pagecontents.findOne({ path: "home" })
```

---

## 🌐 Configuration Nginx (Si applicable)

### Vérifier la configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/azalee-patrimoine
```

**Configuration recommandée :**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name azalee-patrimoine.fr www.azalee-patrimoine.fr;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name azalee-patrimoine.fr www.azalee-patrimoine.fr;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/azalee-patrimoine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/azalee-patrimoine.fr/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

### Tester et recharger Nginx

```bash
# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

---

## ✅ Checklist de Vérification Post-Déploiement

### 1. Accès Frontend
- [ ] Page d'accueil charge : https://azalee-patrimoine.fr
- [ ] Images s'affichent correctement
- [ ] Section équipe visible
- [ ] Bouton Calendly fonctionne
- [ ] Navigation fonctionne

### 2. Accès CMS
- [ ] Login admin fonctionne : https://azalee-patrimoine.fr/admin
- [ ] Dashboard charge
- [ ] Édition de contenu fonctionne
- [ ] Upload d'images fonctionne (champ Photo dans Members)
- [ ] Sauvegarde fonctionne

### 3. SEO
- [ ] Redirections fonctionnent (tester `/investissement-immobilier/sci` → `/immobilier/sci`)
- [ ] Meta descriptions présentes (View Source)
- [ ] Sitemap accessible : https://azalee-patrimoine.fr/sitemap.xml

### 4. Performance
- [ ] Images optimisées (WebP/AVIF)
- [ ] Page Speed acceptable (PageSpeed Insights)
- [ ] Temps de réponse < 2s

### 5. Sécurité
- [ ] HTTPS actif (cadenas vert)
- [ ] Rate limiting fonctionne (tester 6 login attempts rapides)
- [ ] JWT_SECRET n'est pas la valeur par défaut
- [ ] Console.log supprimés (vérifier avec DevTools)

---

## 📊 Monitoring

### Logs à Surveiller

```bash
# Docker
docker-compose logs -f --tail=100

# PM2
pm2 logs azalee-patrimoine --lines 100

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Systemd (si applicable)
sudo journalctl -u azalee-patrimoine -f
```

### Métriques Importantes

- **Uptime**: Doit être > 99.9%
- **Temps de réponse**: < 2 secondes
- **Erreurs 5xx**: Doit être 0
- **Taux d'erreur login**: Surveiller les attaques brute-force

---

## 🐛 Dépannage

### Problème 1 : L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs
# ou
pm2 logs azalee-patrimoine

# Vérifier les variables d'environnement
docker-compose exec app env | grep -E "MONGODB|JWT|NODE_ENV"

# Vérifier MongoDB
docker-compose exec mongodb mongo --eval "db.adminCommand('ping')"
```

### Problème 2 : Images ne s'affichent pas

```bash
# Vérifier les permissions
ls -la public/images/

# Donner les bonnes permissions
chmod -R 755 public/images/
chown -R www-data:www-data public/images/  # ou le user de votre serveur
```

### Problème 3 : Upload d'images échoue

```bash
# Vérifier l'espace disque
df -h

# Vérifier les permissions
ls -la public/images/

# Vérifier les logs
docker-compose logs app | grep -i upload
```

### Problème 4 : Rate limiting trop strict

```bash
# Modifier src/lib/rateLimit.js
# Ajuster les valeurs de limite

# Rebuild et redémarrer
docker-compose build app --no-cache
docker-compose restart app
```

---

## 🔄 Rollback (Si Problème)

En cas de problème critique, revenir à la version précédente :

```bash
# Sur le serveur
cd /path/to/azalee-patrimoine

# Revenir au commit précédent
git revert HEAD
git push origin prod

# Ou checkout le commit précédent
git checkout 53a3d38  # remplacer par le bon commit

# Rebuild et redémarrer
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📞 Support

En cas de problème :

1. **Consulter les logs** (voir section Monitoring)
2. **Vérifier les variables d'environnement**
3. **Tester en local** pour isoler le problème
4. **Vérifier MongoDB** (connexion, données)

---

## 📝 Fichiers Modifiés (Résumé)

### Code Source (29 fichiers)
- ✅ `next.config.mjs` - Redirections SEO, optimisation images
- ✅ `src/app/page.jsx` - Next.js Image, Calendly button
- ✅ `src/app/admin/cms/page.jsx` - Bouton upload images
- ✅ `src/components/admin/CloudinaryUpload.jsx` - Upload vers /public/images/
- ✅ `src/lib/auth.js` - JWT validation (nouveau)
- ✅ `src/lib/rateLimit.js` - Rate limiting (nouveau)
- ✅ `src/lib/validations/` - Zod schemas (nouveau)
- ✅ `scripts/create-admin.js` - Script admin (nouveau)

### Nouvelles Fonctionnalités
- 🔐 Sécurité renforcée (JWT, rate limiting, validation)
- 🖼️ Upload d'images CMS fonctionnel
- 📊 SEO optimisé (20 redirections)
- 🎨 Images haute qualité (Next.js Image)
- 📅 Intégration Calendly
- 👥 Gestion équipe via CMS

---

**Date de déploiement:** 2026-01-19  
**Version:** 1.0.0-prod  
**Statut:** ✅ Prêt pour production





