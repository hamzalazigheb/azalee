# 🚀 Exécuter le script de suppression d'emoji sur le serveur

## Méthode 1 : Utiliser le script automatique (Recommandé)

### Sur le serveur :

```bash
# 1. Se connecter au serveur
ssh ubuntu@VOTRE_IP_SERVEUR

# 2. Aller dans le répertoire du projet
cd ~/demo

# 3. Récupérer les dernières modifications (si le script n'est pas encore sur le serveur)
git pull origin prod

# 4. Rendre le script exécutable
chmod +x scripts/run-remove-emoji-server.sh

# 5. Exécuter le script
./scripts/run-remove-emoji-server.sh
```

## Méthode 2 : Exécution manuelle dans un container Docker

### Option A : Dans le container backend

```bash
# 1. Se connecter au serveur
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo

# 2. Vérifier que les containers sont en cours d'exécution
sudo docker-compose ps

# 3. Copier le script dans le container
sudo docker cp scripts/remove-pointing-hand-emoji.js azalee-backend:/app/scripts/

# 4. Installer les dépendances (si nécessaire)
sudo docker exec azalee-backend npm install dotenv mongoose --save

# 5. Exécuter le script
sudo docker exec -e MONGODB_URI="mongodb://mongo:27017/azalee_db" azalee-backend node scripts/remove-pointing-hand-emoji.js
```

### Option B : Dans le container frontend

```bash
# 1. Se connecter au serveur
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo

# 2. Copier le script dans le container
sudo docker cp scripts/remove-pointing-hand-emoji.js azalee-frontend:/app/scripts/

# 3. Installer les dépendances (si nécessaire)
sudo docker exec azalee-frontend npm install dotenv mongoose --save

# 4. Exécuter le script
sudo docker exec -e MONGODB_URI="mongodb://mongo:27017/azalee_db" azalee-frontend node scripts/remove-pointing-hand-emoji.js
```

## Méthode 3 : Exécution directe sur le serveur (si Node.js est installé)

```bash
# 1. Se connecter au serveur
ssh ubuntu@VOTRE_IP_SERVEUR
cd ~/demo

# 2. Installer les dépendances (si nécessaire)
npm install dotenv mongoose --save

# 3. Exécuter le script
MONGODB_URI="mongodb://localhost:27017/azalee_db" node scripts/remove-pointing-hand-emoji.js
```

## Vérification

Après l'exécution, vous devriez voir un rapport indiquant :
- Nombre de documents mis à jour dans chaque collection
- Total de documents modifiés

## Commandes utiles

### Vérifier que MongoDB est accessible
```bash
sudo docker exec azalee-mongo mongosh azalee_db --eval "db.stats()"
```

### Vérifier les containers en cours d'exécution
```bash
sudo docker-compose ps
```

### Voir les logs du container
```bash
sudo docker-compose logs -f backend
```

## Notes importantes

- ⚠️ **Sauvegarde recommandée** : Faites une sauvegarde de votre base de données avant d'exécuter le script
- ✅ **Le script est sûr** : Il ne supprime que les emojis "👉", pas d'autres données
- 🔄 **Idempotent** : Vous pouvez exécuter le script plusieurs fois sans problème
- 📊 **Rapport détaillé** : Le script affiche un rapport de tous les documents modifiés

## En cas de problème

### Le script ne trouve pas le container
```bash
# Vérifier les noms des containers
sudo docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Erreur de connexion MongoDB
```bash
# Vérifier que MongoDB est en cours d'exécution
sudo docker-compose ps mongo

# Redémarrer MongoDB si nécessaire
sudo docker-compose restart mongo
```

### Le script n'existe pas sur le serveur
```bash
# Récupérer les dernières modifications
cd ~/demo
git pull origin prod

# Vérifier que le script existe
ls -la scripts/remove-pointing-hand-emoji.js
```

