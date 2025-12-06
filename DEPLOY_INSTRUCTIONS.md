# 🚀 Instructions de Déploiement sur EC2

## Vérifier la Configuration Git sur le Serveur

### Option 1: Utiliser le script de vérification

1. **Copiez le script sur le serveur EC2:**
   ```bash
   # Depuis votre machine locale, copiez le script
   scp check-ec2-repo.sh ubuntu@votre-ip-ec2:~/
   ```

2. **Connectez-vous au serveur EC2:**
   ```bash
   ssh ubuntu@votre-ip-ec2
   ```

3. **Exécutez le script:**
   ```bash
   chmod +x check-ec2-repo.sh
   ./check-ec2-repo.sh
   ```

### Option 2: Vérification manuelle

Connectez-vous au serveur EC2 et exécutez ces commandes:

```bash
# 1. Naviguez vers le répertoire de l'application
cd ~/demo  # ou le répertoire où se trouve votre app

# 2. Vérifiez le repository distant
git remote -v

# 3. Vérifiez la branche actuelle
git branch --show-current

# 4. Vérifiez le dernier commit
git log -1 --oneline

# 5. Vérifiez si vous êtes à jour
git fetch origin
git status
```

## Déployer les Modifications

### Méthode 1: Script automatique (Recommandé)

1. **Sur votre machine locale, poussez vers GitHub:**
   ```bash
   git add .
   git commit -m "Add contact form CMS integration and notification system"
   git push origin prod
   ```

2. **Sur le serveur EC2, exécutez:**
   ```bash
   cd ~/demo
   git fetch origin
   git checkout prod
   git pull origin prod
   docker-compose up -d --build frontend backend
   ```

### Méthode 2: Utiliser le script de déploiement

1. **Copiez le script sur EC2:**
   ```bash
   scp deploy-on-ec2.sh ubuntu@votre-ip-ec2:~/
   ```

2. **Sur EC2, exécutez:**
   ```bash
   chmod +x deploy-on-ec2.sh
   ./deploy-on-ec2.sh
   ```

### Méthode 3: Utiliser le script existant

Si vous avez déjà `update-ec2-frontend.sh` sur le serveur:

```bash
cd ~/demo
./update-ec2-frontend.sh
```

## Vérifier le Déploiement

Après le déploiement, vérifiez que tout fonctionne:

```bash
# Vérifier les containers
docker-compose ps

# Vérifier les logs
docker-compose logs -f frontend

# Tester l'application
curl http://localhost/admin
```

## Nouveautés Déployées

Les fonctionnalités suivantes seront disponibles après le déploiement:

1. ✅ **Formulaire de contact** - Les données sont sauvegardées dans MongoDB
2. ✅ **Page CMS Contacts** - `/admin/contacts` pour gérer les demandes
3. ✅ **Icône de notification** - Badge dans le header admin pour nouveaux contacts
4. ✅ **Section Stats éditable** - Dans le CMS pour la page d'accueil
5. ✅ **Section Investment éditable** - Avec accordéon dans le CMS
6. ✅ **Toutes les sections de la page d'accueil** - Entièrement éditables via CMS

## Dépannage

### Si le repository est incorrect:

```bash
cd ~/demo
git remote set-url origin https://github.com/hamzaakrsmartconsulting-droid/azaleee.git
git fetch origin
git checkout prod
git pull origin prod
```

### Si les containers ne démarrent pas:

```bash
# Voir les logs d'erreur
docker-compose logs frontend
docker-compose logs backend

# Redémarrer les containers
docker-compose restart

# Rebuild complet
docker-compose down
docker-compose up -d --build
```

### Si MongoDB a des problèmes:

```bash
# Vérifier le statut
docker-compose ps mongo

# Voir les logs
docker-compose logs mongo

# Redémarrer MongoDB
docker-compose restart mongo
```

