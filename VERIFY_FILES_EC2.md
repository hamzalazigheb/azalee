# 🔍 Vérification des Fichiers sur EC2

## Script de Vérification Automatique

Exécutez ce script sur EC2 pour vérifier que tous les fichiers ont été correctement pullés :

```bash
cd ~/demo
chmod +x verify-ec2-files.sh
./verify-ec2-files.sh
```

## Vérifications Manuelles

### 1. Vérifier le Statut Git

```bash
cd ~/demo

# Voir la branche actuelle
git branch --show-current

# Voir le dernier commit
git log -1 --oneline

# Vérifier si on est à jour
git fetch origin
git status

# Voir les différences avec origin
git log HEAD..origin/prod --oneline
```

### 2. Vérifier les Fichiers Essentiels

```bash
cd ~/demo

# Fichiers de configuration
ls -la package.json Dockerfile docker-compose.yml .env.production

# Nouveaux dossiers
ls -la src/app/admin/contacts/
ls -la src/app/admin/settings/
ls -la src/app/api/contact/
ls -la src/components/admin/
ls -la src/lib/models/Contact.js

# Scripts de déploiement
ls -la deploy-all-to-ec2.sh fix-ec2-repo.sh
```

### 3. Vérifier les Nouveaux Fichiers Spécifiques

```bash
cd ~/demo

# Système de contact
echo "=== Contact System ==="
ls -la src/app/admin/contacts/
ls -la src/app/api/contact/
ls -la src/lib/models/Contact.js

# Composants admin
echo "=== Admin Components ==="
ls -la src/components/admin/

# Utilitaires
echo "=== Utils ==="
ls -la src/lib/utils/

# Scripts
echo "=== Scripts ==="
ls -la scripts/
```

### 4. Compter les Fichiers

```bash
cd ~/demo

# Compter les fichiers dans les nouveaux dossiers
echo "Contacts: $(find src/app/admin/contacts -type f 2>/dev/null | wc -l)"
echo "API Contact: $(find src/app/api/contact -type f 2>/dev/null | wc -l)"
echo "Admin Components: $(find src/components/admin -type f 2>/dev/null | wc -l)"
echo "Scripts: $(find scripts -type f 2>/dev/null | wc -l)"
```

### 5. Vérifier le Contenu d'un Fichier Spécifique

```bash
cd ~/demo

# Vérifier que le fichier contient le bon code
head -20 src/app/admin/contacts/page.jsx
head -20 src/app/api/contact/submit/route.js
head -20 src/lib/models/Contact.js
```

### 6. Comparer avec le Repository

```bash
cd ~/demo

# Voir les fichiers qui diffèrent
git diff origin/prod --name-only

# Voir les fichiers non trackés
git status --short

# Voir les fichiers manquants (si pull incomplet)
git ls-files --others --exclude-standard
```

## Si des Fichiers Manquent

### Solution 1: Pull Complet

```bash
cd ~/demo

# Sauvegarder les modifications locales
git stash

# Pull complet
git pull origin prod

# Appliquer les modifications sauvegardées (si nécessaire)
git stash pop
```

### Solution 2: Reset et Pull

```bash
cd ~/demo

# ⚠️ ATTENTION: Cela supprime les modifications locales
git reset --hard origin/prod
git pull origin prod
```

### Solution 3: Vérifier les Fichiers Spécifiques

```bash
cd ~/demo

# Vérifier un fichier spécifique
git checkout origin/prod -- src/app/admin/contacts/page.jsx

# Ou pour un dossier entier
git checkout origin/prod -- src/app/admin/contacts/
```

## Checklist de Vérification

- [ ] `package.json` existe et contient les nouvelles dépendances
- [ ] `docker-compose.yml` existe
- [ ] `.env.production` existe (ou `env.production.template`)
- [ ] `src/app/admin/contacts/page.jsx` existe
- [ ] `src/app/admin/settings/page.jsx` existe
- [ ] `src/app/api/contact/submit/route.js` existe
- [ ] `src/lib/models/Contact.js` existe
- [ ] `src/components/admin/Notification.jsx` existe
- [ ] `src/components/admin/TextEditor.jsx` existe
- [ ] `deploy-all-to-ec2.sh` existe
- [ ] `fix-ec2-repo.sh` existe
- [ ] Le dernier commit correspond à celui du repository

## Commandes Rapides

```bash
cd ~/demo

# Vérification complète en une commande
echo "=== Git Status ===" && \
git status && \
echo "" && \
echo "=== Last Commit ===" && \
git log -1 --oneline && \
echo "" && \
echo "=== Essential Files ===" && \
ls -1 package.json Dockerfile docker-compose.yml .env.production 2>/dev/null | wc -l && \
echo "" && \
echo "=== New Directories ===" && \
[ -d src/app/admin/contacts ] && echo "✅ contacts" || echo "❌ contacts" && \
[ -d src/app/api/contact ] && echo "✅ api/contact" || echo "❌ api/contact" && \
[ -f src/lib/models/Contact.js ] && echo "✅ Contact.js" || echo "❌ Contact.js"
```

