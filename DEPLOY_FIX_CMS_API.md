# Fix CMS API Routes sur le Serveur

## Problème
Les routes `/api/cms/content` et `/api/cms/pages` retournent 404 sur le serveur.

## Solution

### Option 1 : Script automatique (recommandé)

1. **Copier le script sur le serveur :**
```bash
# Depuis votre machine locale
scp fix-cms-api-server.sh ubuntu@VOTRE_IP_EC2:~/demo/
```

2. **Sur le serveur EC2 :**
```bash
ssh ubuntu@VOTRE_IP_EC2
cd ~/demo
chmod +x fix-cms-api-server.sh
./fix-cms-api-server.sh
```

### Option 2 : Commandes manuelles

```bash
# Se connecter au serveur
ssh ubuntu@VOTRE_IP_EC2

# Aller dans le répertoire
cd ~/demo

# Vérifier le remote
git remote -v

# Pull les dernières modifications
git pull origin prod

# Vérifier que les fichiers existent
ls -la src/app/api/cms/content/route.js
ls -la src/app/api/cms/pages/route.js

# Si les fichiers n'existent pas, forcer le pull
git reset --hard origin/prod
git pull origin prod

# Rebuild Docker
sudo docker-compose down
sudo docker-compose build --no-cache frontend backend
sudo docker-compose up -d frontend backend

# Vérifier les logs
sudo docker-compose logs -f frontend
```

### Option 3 : Vérification rapide

```bash
# Sur le serveur
cd ~/demo
git status
git log -1
ls -la src/app/api/cms/
```

## Vérification

Après le déploiement, tester :
- `http://VOTRE_IP:4028/api/cms/content?path=sara`
- `http://VOTRE_IP:4028/api/cms/pages?path=sara`
- `http://VOTRE_IP:4028/admin/chatbot`

## Notes

- Les fichiers API doivent être dans `src/app/api/cms/content/route.js` et `src/app/api/cms/pages/route.js`
- Next.js 14 utilise le système de routing basé sur les dossiers
- Le rebuild Docker est nécessaire pour que les nouvelles routes soient prises en compte


