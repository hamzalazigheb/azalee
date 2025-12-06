# 🚀 Déploiement Rapide sur EC2

## Problème Détecté

Votre serveur EC2 pointe vers le mauvais repository:
- ❌ Actuel: `https://github.com/hamzalazigheb/demo.git`
- ✅ Correct: `https://github.com/hamzaakrsmartconsulting-droid/azaleee.git`

## Solution Rapide

### Option 1: Script Automatique (Recommandé)

1. **Copiez le script sur EC2:**
   ```bash
   scp fix-ec2-repo.sh ubuntu@votre-ip-ec2:~/
   ```

2. **Sur EC2, exécutez:**
   ```bash
   chmod +x fix-ec2-repo.sh
   ./fix-ec2-repo.sh
   ```

3. **Déployez les modifications:**
   ```bash
   cd ~/demo
   docker-compose up -d --build frontend backend
   ```

### Option 2: Commandes Manuelles

Connectez-vous au serveur EC2 et exécutez:

```bash
# 1. Aller dans le répertoire
cd ~/demo

# 2. Corriger le repository
git remote set-url origin https://github.com/hamzaakrsmartconsulting-droid/azaleee.git

# 3. Vérifier que c'est correct
git remote -v

# 4. Récupérer les dernières modifications
git fetch origin

# 5. Passer sur la branche prod
git checkout prod

# 6. Télécharger les dernières modifications
git pull origin prod

# 7. Rebuild et redémarrer les containers
docker-compose up -d --build frontend backend

# 8. Vérifier le statut
docker-compose ps
```

## Vérification

Après le déploiement, vérifiez que tout fonctionne:

```bash
# Voir les logs
docker-compose logs -f frontend

# Tester l'application
curl http://localhost/admin
```

## Nouvelles Fonctionnalités Déployées

✅ Formulaire de contact avec sauvegarde en base  
✅ Page CMS `/admin/contacts` pour gérer les demandes  
✅ Icône de notification dans le header admin  
✅ Section Stats entièrement éditable  
✅ Section Investment avec accordéon éditable  
✅ Toutes les sections de la page d'accueil éditables

