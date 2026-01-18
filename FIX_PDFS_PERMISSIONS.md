# 🔧 Fix : Permissions pour l'upload de PDFs

## Problème

Erreur `EACCES: permission denied` lors de l'upload de PDFs via `/admin/ressources`.

## Solution

### 1. Sur le serveur EC2, exécuter ces commandes :

```bash
cd ~/demo

# Créer le dossier s'il n'existe pas
mkdir -p public/pdfs

# Donner les permissions d'écriture
chmod 755 public/pdfs

# S'assurer que l'utilisateur peut écrire (remplacer 'ubuntu' par votre utilisateur si différent)
sudo chown -R ubuntu:ubuntu public/pdfs

# Vérifier les permissions
ls -ld public/pdfs
# Devrait afficher: drwxr-xr-x ... ubuntu ubuntu ... public/pdfs
```

### 2. Redémarrer les containers Docker

```bash
sudo docker-compose restart frontend backend
```

### 3. Vérifier dans le container

```bash
# Vérifier les permissions dans le container
sudo docker exec azalee-frontend ls -ld /app/public/pdfs

# Si nécessaire, corriger les permissions dans le container
sudo docker exec azalee-frontend chmod 777 /app/public/pdfs
```

## Alternative : Script automatique

Un script `fix-pdfs-permissions.sh` a été créé. Pour l'utiliser :

```bash
cd ~/demo
chmod +x fix-pdfs-permissions.sh
./fix-pdfs-permissions.sh
```

## Vérification

1. Aller sur `/admin/ressources`
2. Essayer d'uploader un PDF
3. Vérifier que le fichier est créé :
   ```bash
   ls -la ~/demo/public/pdfs/
   ```

## Notes importantes

- Le volume Docker monte `./public/pdfs` depuis l'hôte vers `/app/public/pdfs` dans le container
- Les permissions sur l'hôte doivent permettre l'écriture
- L'utilisateur qui exécute Docker doit avoir les droits sur le dossier

