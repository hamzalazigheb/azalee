# 🔧 CORRECTIONS NÉCESSAIRES - PAGE PLACEMENTS CMS

## ❌ PROBLÈME IDENTIFIÉ

Les sections 4, 5, 6, 7, 8 et la FAQ sont **hardcodées** dans la page au lieu d'utiliser les données du CMS. Les modifications dans le CMS n'apparaissent donc pas sur la page réelle.

## ✅ CORRECTIONS APPLIQUÉES

### Section 4 (SCPI) - EN COURS
- ✅ H2 dynamique : `pageContent.section4?.h2`
- ✅ Intro dynamique : `pageContent.section4?.intro` (array)
- ✅ H3_taux dynamique : `pageContent.section4?.h3_taux`
- ✅ H3_reglementation dynamique : `pageContent.section4?.h3_reglementation`
- ⏳ H3_revente : À remplacer
- ⏳ H3_reinvestir : À remplacer
- ⏳ Cycle SCPI : À remplacer
- ⏳ Conclusion : À remplacer
- ⏳ CTAs : À remplacer

### Sections restantes - À FAIRE
- ⏳ Section 5 (Assurance-vie luxembourgeoise)
- ⏳ Section 6 (Or et métaux précieux)
- ⏳ Section 7 (Produits structurés)
- ⏳ Section 8 (Enveloppes et supports)
- ⏳ FAQ

## 📋 STRUCTURE CMS ATTENDUE

D'après l'API CMS, les sections ont la structure suivante :

### section4
- `h2`: string
- `intro`: array of strings
- `h3_taux`: object avec `title`, `explanation`, `points`, `conclusion`, `note`
- `h3_reglementation`: object avec `title`, `intro`, `subtitle`, `points`, `highlight`
- `h3_revente`: object
- `h3_reinvestir`: object
- `cycle`: object
- `conclusion`: object
- `ctas`: array

### section5
- `h2`: string
- `intro`: array of strings
- `pourquoi`: object avec `title`, `items` (array)
- `limites`: object avec `items` (array)
- `regard`: object
- `retenir`: object
- `ctas`: array

### section6
- `h2`: string
- `intro`: array of strings
- `pourquoi_flambe`: object
- `trop_tard`: object
- `autres_metaux`: object
- `strategie`: object
- `conclusion`: object

### section7
- `h2`: string
- `intro`: array of strings
- `mi_chemin`: object
- `assureurs`: object
- `brokers`: object
- `cgp`: object
- `clients`: object
- `resume`: object
- `consensus`: object
- `conclusion`: object

### section8
- `enveloppes`: object
- `supports`: object
- `expertise`: object
- `pourquoi`: object

### faq
- `h2`: string
- `items`: array of objects avec `question`, `answer`, `link`

## 🎯 PROCHAINES ÉTAPES

1. ✅ Corriger la structure JSX de la section 4
2. ⏳ Remplacer toutes les sections hardcodées par des références CMS
3. ⏳ Tester chaque section après modification
4. ⏳ Vérifier que les modifications dans le CMS apparaissent sur la page

