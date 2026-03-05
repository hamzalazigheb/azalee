# 🔧 Fix : Persistance des PDFs uploadés

## Problème identifié

Les fichiers PDF uploadés via `/admin/ressources` n'étaient pas persistés après le redémarrage des containers Docker. Les fichiers étaient stockés dans `/app/public/pdfs/` dans le container, mais ce dossier n'était pas monté comme volume, donc les fichiers étaient perdus à chaque redémarrage.

## Solution appliquée

### 1. Modification de `docker-compose.yml`
Ajout d'un volume persistant pour `public/pdfs/` dans les services `backend` et `frontend` :

```yaml
volumes:
  - ./public/pdfs:/app/public/pdfs  # Volume persistant pour les PDFs uploadés
```

### 2. Modification du `Dockerfile`
Ajout de la création du dossier `pdfs` avec les bonnes permissions :

```dockerfile
# Create pdfs directory with correct permissions (will be overridden by volume mount)
RUN mkdir -p /app/public/pdfs && chown -R nextjs:nodejs /app/public/pdfs
```

## 📋 Commandes à exécuter sur le serveur EC2

### 1. Récupérer les dernières modifications

```bash
cd ~/demo
git pull origin prod
```

### 2. Créer le dossier `public/pdfs` sur le serveur

```bash
mkdir -p ~/demo/public/pdfs
chmod 755 ~/demo/public/pdfs
```

### 3. Redémarrer les containers avec les nouveaux volumes

```bash
# Arrêter les containers
sudo docker-compose down

# Rebuild les images (pour inclure les modifications du Dockerfile)
sudo docker-compose build --no-cache frontend backend

# Démarrer les containers avec les nouveaux volumes
sudo docker-compose up -d

# Vérifier que les containers tournent
sudo docker-compose ps
```

### 4. Vérifier que le volume est bien monté

```bash
# Vérifier que le dossier existe dans le container
sudo docker exec azalee-frontend ls -la /app/public/pdfs

# Vérifier que le volume est monté
sudo docker inspect azalee-frontend | grep -A 10 "Mounts"
```

### 5. Tester l'upload d'un PDF

1. Aller sur `/admin/ressources`
2. Uploader un PDF
3. Vérifier que le fichier existe sur le serveur :
   ```bash
   ls -la ~/demo/public/pdfs/
   ```
4. Vérifier que le fichier est accessible via l'URL `/pdfs/nom-du-fichier.pdf`

## ✅ Résultat attendu

- Les PDFs uploadés sont maintenant stockés dans `~/demo/public/pdfs/` sur le serveur
- Les fichiers persistent après le redémarrage des containers
- Les fichiers sont accessibles via l'URL `/pdfs/nom-du-fichier.pdf`
- Les fichiers sont synchronisés entre les containers `backend` et `frontend`

## 🔍 Vérification

Après le déploiement, vérifier :

1. **Upload d'un PDF** : Uploader un PDF via `/admin/ressources`
2. **Vérifier sur le serveur** : `ls -la ~/demo/public/pdfs/` doit montrer le fichier
3. **Vérifier l'URL** : Accéder à `https://azalee-patrimoine.fr/pdfs/nom-du-fichier.pdf` doit télécharger le fichier
4. **Redémarrer les containers** : `sudo docker-compose restart` - Le fichier doit toujours être présent

## ⚠️ Note importante

Les fichiers PDF existants qui ont été uploadés avant cette modification ne seront pas automatiquement copiés. Il faudra les ré-uploader via le CMS ou les copier manuellement dans `~/demo/public/pdfs/` sur le serveur.

