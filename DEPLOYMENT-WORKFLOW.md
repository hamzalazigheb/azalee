# 🚀 Workflow de déploiement - Guide rapide

## Workflow simple pour les modifications

### 1️⃣ Sur votre machine locale (développement)

```bash
# 1. Faire vos modifications dans le code
# ... modifier les fichiers ...

# 2. Vérifier que tout fonctionne localement
npm run dev

# 3. Commiter et pousser les changements
git add .
git commit -m "Description de vos modifications"
git push demo prod
```

### 2️⃣ Sur le serveur (déploiement)

```bash
# 1. Se connecter au serveur
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo

# 2. Récupérer les nouveaux changements
git pull origin prod

# 3. Rebuild et redémarrer Docker
sudo docker-compose down
sudo docker-compose build --no-cache frontend backend
sudo docker-compose up -d

# 4. Vérifier que tout fonctionne
sudo docker-compose ps
curl -I https://azalee-patrimoine.fr
```

## ⚡ Script de déploiement rapide

J'ai créé un script pour automatiser tout ça !

### Sur le serveur :

```bash
cd ~/demo
git pull origin prod
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 📝 Commandes essentielles

### Voir les logs en temps réel
```bash
sudo docker-compose logs -f frontend
```

### Redémarrer seulement un service
```bash
sudo docker-compose restart frontend
```

### Voir l'état des containers
```bash
sudo docker-compose ps
```

### Vérifier que le site fonctionne
```bash
curl -I https://azalee-patrimoine.fr
```

## 🔄 Workflow complet (copier-coller)

### Local :
```bash
git add .
git commit -m "Votre message"
git push demo prod
```

### Serveur :
```bash
cd ~/demo
git pull origin prod
sudo docker-compose down
sudo docker-compose build --no-cache frontend backend
sudo docker-compose up -d
```

## ⚠️ Notes importantes

- **Toujours tester localement** avant de pousser
- **Utiliser `--no-cache`** pour un build propre
- **Vérifier les logs** si quelque chose ne fonctionne pas
- **Le certificat SSL** se renouvelle automatiquement, pas besoin de le toucher

## 🆘 En cas de problème

```bash
# Voir les logs d'erreur
sudo docker-compose logs frontend | tail -50

# Vérifier Nginx
sudo systemctl status nginx
sudo tail -20 /var/log/nginx/error.log

# Redémarrer tout
sudo docker-compose restart
sudo systemctl restart nginx
```



