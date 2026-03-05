# 🚀 Déploiement Rapide sur EC2

## Étapes de Déploiement

### 1. Se connecter au serveur EC2
```bash
ssh -i /path/to/your-key.pem ubuntu@your-ec2-ip
```

### 2. Aller dans le répertoire de l'application
```bash
cd ~/demo
```

### 3. Récupérer les dernières modifications
```bash
git pull origin prod
```

### 4. Rebuild et redémarrer les containers
```bash
sudo docker-compose up -d --build frontend backend
```

### 5. Vérifier que tout fonctionne
```bash
# Voir le statut des containers
sudo docker-compose ps

# Voir les logs (optionnel)
sudo docker-compose logs -f frontend
```

## Commandes Utiles

### Voir les logs en temps réel
```bash
sudo docker-compose logs -f
```

### Redémarrer un container spécifique
```bash
sudo docker-compose restart frontend
sudo docker-compose restart backend
```

### Arrêter tous les containers
```bash
sudo docker-compose down
```

### Voir les dernières modifications Git
```bash
git log --oneline -5
```

### Vérifier le statut Git
```bash
git status
```

## En Cas de Problème

### Si le pull échoue (conflits)
```bash
# Sauvegarder les changements locaux
git stash

# Pull à nouveau
git pull origin prod

# Appliquer les changements sauvegardés (si nécessaire)
git stash pop
```

### Si les containers ne démarrent pas
```bash
# Voir les erreurs détaillées
sudo docker-compose logs frontend
sudo docker-compose logs backend

# Rebuild complet
sudo docker-compose down
sudo docker-compose up -d --build
```

### Si MongoDB ne fonctionne pas
```bash
# Vérifier le container MongoDB
sudo docker-compose ps mongo

# Redémarrer MongoDB
sudo docker-compose restart mongo
```

## Notes Importantes

- ⚠️ **Ne pas oublier `sudo`** : Les commandes Docker nécessitent généralement les privilèges root
- ✅ **Toujours pull avant de build** : Assurez-vous d'avoir les dernières modifications
- 🔄 **Rebuild seulement frontend/backend** : MongoDB n'a pas besoin d'être rebuild à chaque fois
- 📝 **Vérifier les logs** : En cas d'erreur, les logs contiennent les informations de débogage

