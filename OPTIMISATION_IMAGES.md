# Optimisation des Images - Rapport

## Images > 300KB identifiées

### Images WebP à compresser
1. **architecte.webp** - 336.11 KB
   - Action: Compresser avec sharp ou Squoosh.app
   - Objectif: < 200 KB

2. **calc.webp** - 412.77 KB
   - Action: Compresser avec sharp ou Squoosh.app
   - Objectif: < 250 KB

### Images à remplacer
3. **reunion.jpg** - 414.65 KB
   - ✅ Solution: Utiliser `reunion.webp` (119.74 KB) qui existe déjà
   - Action: Vérifier toutes les références et remplacer `.jpg` par `.webp`

4. **hero_vector_1-432706.svg** - 612.43 KB
   - Action: Optimiser avec SVGO (https://jakearchibald.github.io/svgomg/)
   - Objectif: Réduire de 50-70%

## Fichiers avec espaces (à renommer)

Les fichiers suivants contiennent des espaces et doivent être renommés pour le SEO:

1. `Azalée Patrimoine - energie degressive.pdf` → `azalee-patrimoine-energie-degressive.pdf`
2. `Azalée Patrimoine - Gestion de patrimoine et conseil financier22.pdf` → `azalee-patrimoine-gestion-patrimoine-conseil-financier.pdf`
3. `Azalée Patrimoine - placements.pdf` → `azalee-patrimoine-placements.pdf`
4. `fisc v1.pdf` → `azalee-patrimoine-fisc-v1.pdf`

⚠️ **Important**: Après renommage, mettre à jour toutes les références dans le code.

## Statut actuel

- ✅ La plupart des images sont déjà en WebP
- ✅ Les images principales sont déjà optimisées (< 300KB)
- ⚠️ 4 images nécessitent une optimisation
- ⚠️ 4 fichiers PDF ont des espaces dans le nom

## Outils recommandés

1. **Compression WebP**: https://squoosh.app/
2. **Optimisation SVG**: https://jakearchibald.github.io/svgomg/
3. **Script automatique**: Installer `sharp` et créer un script de compression batch

## Notes

- Les fichiers PDF ne sont pas des images mais des documents. Leur optimisation n'est pas prioritaire pour le SEO des images.
- Le SVG `hero_vector_1-432706.svg` est très volumineux pour un SVG. Il devrait être optimisé ou converti en WebP si possible.

