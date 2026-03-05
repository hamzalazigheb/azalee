#!/bin/bash
# Script pour corriger les permissions du dossier public/pdfs

echo "🔧 Correction des permissions pour public/pdfs..."

# Créer le dossier s'il n'existe pas
mkdir -p public/pdfs

# Donner les permissions d'écriture (755 pour le dossier, 644 pour les fichiers)
chmod 755 public/pdfs

# S'assurer que le propriétaire peut écrire
chown -R $USER:$USER public/pdfs 2>/dev/null || sudo chown -R $USER:$USER public/pdfs

echo "✅ Permissions corrigées pour public/pdfs"
echo "   Dossier: $(pwd)/public/pdfs"
echo "   Permissions: $(ls -ld public/pdfs | awk '{print $1}')"

