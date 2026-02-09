import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { SchemaOrg, ArticleSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Articles de blog (à terme, ces données viendront du CMS/MongoDB)
const blogArticles = {
  'optimisation-fiscale-2025': {
    id: 1,
    title: 'Optimisation Fiscale 2025 : Les Stratégies Gagnantes',
    metaDescription: 'Découvrez les meilleures stratégies pour réduire votre imposition en 2025. Guide complet sur les dispositifs fiscaux : PER, SCPI, LMNP et plus.',
    category: 'Fiscalité',
    author: 'Équipe Azalée',
    date: '2025-01-15',
    readTime: '8 min',
    image: '/images/azalee-patrimoine-fiscalite.webp',
    content: `
## Introduction

L'année 2025 apporte son lot de changements fiscaux. Que vous soyez salarié, indépendant ou dirigeant d'entreprise, il existe de nombreuses stratégies légales pour optimiser votre fiscalité.

## Les Dispositifs Phares de 2025

### 1. Le Plan d'Épargne Retraite (PER)

Le PER reste l'un des outils les plus efficaces pour réduire son impôt sur le revenu. Les versements sont déductibles du revenu imposable dans la limite des plafonds légaux.

**Avantages clés :**
- Déduction fiscale immédiate
- Capital disponible à la retraite
- Transmission avantageuse

### 2. L'Investissement en SCPI

Les Sociétés Civiles de Placement Immobilier permettent d'investir dans l'immobilier avec des avantages fiscaux significatifs, notamment via le déficit foncier.

### 3. Le Statut LMNP

Le Loueur en Meublé Non Professionnel permet d'amortir le bien et le mobilier, réduisant ainsi l'imposition sur les loyers perçus.

## Stratégies Avancées

Pour les patrimoines plus importants, d'autres stratégies peuvent être envisagées :

- **Holding familiale** : optimisation de la transmission
- **Assurance-vie luxembourgeoise** : protection et flexibilité
- **Démembrement de propriété** : réduction de l'IFI

## Conclusion

L'optimisation fiscale nécessite une approche personnalisée. Chaque situation est unique et mérite une analyse approfondie avec un conseiller en gestion de patrimoine.

**Vous souhaitez optimiser votre fiscalité ?** Contactez nos experts pour un bilan patrimonial personnalisé.
    `,
    relatedArticles: ['preparer-retraite-50-ans', 'scpi-2025-guide-investissement'],
  },
  'preparer-retraite-50-ans': {
    id: 2,
    title: 'Préparer sa Retraite à 50 ans : Le Guide Complet',
    metaDescription: 'À 50 ans, optimisez votre préparation retraite. Découvrez les leviers PER, assurance-vie et immobilier pour sécuriser vos revenus futurs.',
    category: 'Retraite',
    author: 'Équipe Azalée',
    date: '2025-01-10',
    readTime: '12 min',
    image: '/images/azalee-patrimoine-retraite.webp',
    content: `
## Pourquoi 50 ans est l'Âge Clé

À 50 ans, vous disposez encore de 15 à 17 ans pour préparer votre retraite. C'est le moment idéal pour faire le point et ajuster votre stratégie.

## État des Lieux de Votre Situation

### Évaluation de vos Droits

Commencez par récupérer votre relevé de carrière sur info-retraite.fr. Vous y trouverez :
- Le nombre de trimestres validés
- Une estimation de votre future pension
- L'âge de départ possible

### Calcul de vos Besoins

Estimez vos besoins futurs en tenant compte de :
- Votre niveau de vie actuel
- Vos projets de retraite
- Vos charges prévisibles

## Les Leviers à Activer

### 1. Le Plan d'Épargne Retraite (PER)

**Pourquoi c'est incontournable à 50 ans :**
- Déduction fiscale maximale
- 15 ans de capitalisation
- Sortie en capital ou en rente

### 2. L'Assurance-Vie

L'assurance-vie reste le placement préféré des Français :
- Fiscalité avantageuse après 8 ans
- Transmission optimisée
- Disponibilité des fonds

### 3. L'Immobilier Locatif

L'immobilier génère des revenus complémentaires :
- SCPI pour la diversification
- LMNP pour les revenus défiscalisés
- Immobilier direct pour le patrimoine

## Plan d'Action Recommandé

1. **Faites un bilan patrimonial** avec un conseiller
2. **Optimisez votre fiscalité** pour épargner plus
3. **Diversifiez vos placements** pour réduire les risques
4. **Anticipez la transmission** pour protéger vos proches

## Conclusion

À 50 ans, chaque décision compte. Un accompagnement professionnel vous permettra de maximiser vos revenus futurs tout en optimisant votre fiscalité actuelle.
    `,
    relatedArticles: ['optimisation-fiscale-2025', 'transmission-patrimoine-famille'],
  },
  'scpi-2025-guide-investissement': {
    id: 3,
    title: 'SCPI en 2025 : Guide de l\'Investissement Immobilier Pierre-Papier',
    metaDescription: 'Guide complet SCPI 2025 : rendements, risques et meilleures opportunités du marché immobilier pierre-papier. Conseils d\'experts Azalée Patrimoine.',
    category: 'Placements',
    author: 'Équipe Azalée',
    date: '2025-01-05',
    readTime: '10 min',
    image: '/images/azalee-patrimoine-scpi.webp',
    content: `
## Les SCPI en 2025 : État du Marché

Le marché des SCPI continue d'évoluer en 2025. Après une année de normalisation, les opportunités restent nombreuses pour les investisseurs avertis.

## Qu'est-ce qu'une SCPI ?

Une Société Civile de Placement Immobilier permet d'investir dans l'immobilier :
- Sans contrainte de gestion
- Avec une mise de départ accessible
- Pour des revenus réguliers

## Les Différents Types de SCPI

### SCPI de Rendement
Objectif : revenus locatifs réguliers
Rendement moyen : 4% à 6%

### SCPI Fiscales
Objectif : réduction d'impôts
Dispositifs : Pinel, Malraux, Déficit foncier

### SCPI de Plus-Value
Objectif : valorisation du capital
Horizon : long terme

## Comment Choisir sa SCPI ?

Critères essentiels :
1. **Taux d'occupation** : privilégiez > 90%
2. **Diversification** : géographique et sectorielle
3. **Qualité de gestion** : historique de la société
4. **Frais** : comparez souscription et gestion

## Notre Sélection 2025

Nos experts ont analysé le marché pour identifier les meilleures opportunités selon votre profil et vos objectifs.

## Conclusion

Les SCPI restent un excellent outil de diversification patrimoniale. Un conseil personnalisé vous permettra de choisir les supports adaptés à votre situation.
    `,
    relatedArticles: ['optimisation-fiscale-2025', 'assurance-vie-luxembourg-avantages'],
  },
  'transmission-patrimoine-famille': {
    id: 4,
    title: 'Transmission de Patrimoine : Protéger sa Famille',
    metaDescription: 'Comment transmettre son patrimoine dans les meilleures conditions fiscales ? Guide complet sur la succession, donation et protection familiale.',
    category: 'Patrimoine',
    author: 'Équipe Azalée',
    date: '2024-12-28',
    readTime: '15 min',
    image: '/images/azalee-patrimoine-transmission.webp',
    content: `
## L'Importance de la Transmission

Transmettre son patrimoine, c'est protéger ses proches et pérenniser le fruit de toute une vie de travail.

## Les Outils de Transmission

### La Donation

Avantages :
- Abattements renouvelables tous les 15 ans
- Réduction des droits avec l'âge du donateur
- Contrôle possible via donation avec réserve

### L'Assurance-Vie

L'assurance-vie bénéficie d'un régime fiscal privilégié :
- Abattement de 152 500€ par bénéficiaire
- Hors succession pour les primes versées avant 70 ans
- Clause bénéficiaire personnalisable

### Le Démembrement

Le démembrement de propriété permet :
- De transmettre la nue-propriété à moindre coût
- De conserver l'usufruit (revenus/usage)
- D'optimiser la fiscalité successorale

## Stratégies Avancées

### Holding Familiale

Pour les patrimoines importants :
- Transmission progressive des parts
- Pacte Dutreil pour les entreprises
- Gouvernance familiale structurée

### SCI Familiale

La SCI facilite :
- La gestion collective
- La transmission par parts
- L'organisation patrimoniale

## Plan de Transmission

1. Faites l'inventaire de votre patrimoine
2. Définissez vos objectifs de transmission
3. Consultez notaire et conseiller en patrimoine
4. Mettez en place les outils adaptés
5. Révisez régulièrement votre stratégie

## Conclusion

La transmission patrimoniale se prépare. Plus elle est anticipée, plus elle sera optimisée fiscalement et sereine pour vos proches.
    `,
    relatedArticles: ['preparer-retraite-50-ans', 'assurance-vie-luxembourg-avantages'],
  },
  'assurance-vie-luxembourg-avantages': {
    id: 5,
    title: 'Assurance-Vie Luxembourg : Les Avantages pour les Patrimoines Importants',
    metaDescription: 'Découvrez les avantages uniques de l\'assurance-vie luxembourgeoise : super privilège, triangle de sécurité et flexibilité des investissements.',
    category: 'Placements',
    author: 'Équipe Azalée',
    date: '2024-12-20',
    readTime: '9 min',
    image: '/images/azalee-patrimoine-assurance-vie.webp',
    content: `
## Pourquoi le Luxembourg ?

L'assurance-vie luxembourgeoise offre des garanties et une flexibilité supérieures aux contrats français, particulièrement adaptées aux patrimoines importants.

## Les Avantages Clés

### Le Triangle de Sécurité

Protection unique des avoirs :
- Séparation des actifs
- Supervision du Commissariat aux Assurances
- Banque dépositaire indépendante

### Le Super Privilège

En cas de faillite de l'assureur :
- Les souscripteurs sont créanciers de premier rang
- Protection absolue des capitaux
- Supérieur à tout autre créancier

### La Neutralité Fiscale

Le contrat luxembourgeois :
- S'adapte à la fiscalité de résidence
- Facilite la mobilité internationale
- Offre une transparence totale

## Les Options d'Investissement

### Fonds Internes Dédiés (FID)

Pour les patrimoines > 250 000€ :
- Gestion sur-mesure
- Large univers d'investissement
- Accès au private equity

### Fonds d'Assurance Spécialisés (FAS)

Pour les patrimoines > 2 500 000€ :
- Investissements alternatifs
- Non-coté et actifs réels
- Maximum de personnalisation

## Pour Qui ?

L'assurance-vie luxembourgeoise s'adresse aux :
- Patrimoines supérieurs à 250 000€
- Expatriés et futurs expatriés
- Investisseurs recherchant la sécurité maximale

## Conclusion

L'assurance-vie luxembourgeoise représente le nec plus ultra de la protection patrimoniale. Un conseiller spécialisé vous guidera dans sa mise en place.
    `,
    relatedArticles: ['scpi-2025-guide-investissement', 'transmission-patrimoine-famille'],
  },
  'investissement-immobilier-lmnp': {
    id: 6,
    title: 'Investissement LMNP : Optimiser sa Fiscalité Immobilière',
    metaDescription: 'Guide complet du statut LMNP : amortissement, régime fiscal et stratégies pour maximiser vos avantages fiscaux en location meublée.',
    category: 'Immobilier',
    author: 'Équipe Azalée',
    date: '2024-12-15',
    readTime: '11 min',
    image: '/images/azalee-patrimoine-lmnp.webp',
    content: `
## Le Statut LMNP : Définition

Le Loueur en Meublé Non Professionnel (LMNP) permet de louer un bien meublé avec une fiscalité avantageuse sur les revenus locatifs.

## Conditions d'Éligibilité

Pour bénéficier du statut LMNP :
- Revenus locatifs < 23 000€/an OU < 50% des revenus du foyer
- Location d'un logement meublé
- Équipements minimum respectés

## Les Régimes Fiscaux

### Micro-BIC

- Abattement forfaitaire de 50%
- Simplicité de déclaration
- Idéal pour faibles revenus

### Régime Réel

- Déduction des charges réelles
- Amortissement du bien et du mobilier
- Optimisation fiscale maximale

## L'Amortissement : Le Cœur du Dispositif

L'amortissement permet de :
- Déduire la valeur du bien sur 25-30 ans
- Réduire voire annuler l'imposition
- Reporter les déficits

## Stratégie d'Investissement

### Choix du Bien

Critères essentiels :
- Emplacement (ville étudiante, touristique)
- Qualité du bien
- Potentiel locatif

### Types de Locations

- Résidence étudiante
- Résidence tourisme
- Location courte durée
- Location longue durée meublée

## Exemple Chiffré

Pour un investissement de 200 000€ :
- Loyers annuels : 10 000€
- Amortissement + charges : 9 500€
- Imposition réelle : quasi nulle

## Conclusion

Le LMNP reste l'un des dispositifs les plus attractifs pour l'investissement immobilier. Un accompagnement expert maximisera vos avantages fiscaux.
    `,
    relatedArticles: ['optimisation-fiscale-2025', 'scpi-2025-guide-investissement'],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogArticles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = blogArticles[params.slug];
  
  if (!article) {
    return {
      title: 'Article non trouvé - Azalée Patrimoine',
    };
  }

  return {
    title: `${article.title} | Blog Azalée Patrimoine`,
    description: article.metaDescription,
    keywords: `${article.category.toLowerCase()}, gestion patrimoine, conseils financiers, ${article.title.toLowerCase()}`,
    alternates: {
      canonical: `https://www.azalee-patrimoine.fr/blog/${params.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://www.azalee-patrimoine.fr/blog/${params.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogArticlePage({ params }) {
  const article = blogArticles[params.slug];

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://www.azalee-patrimoine.fr' },
    { name: 'Blog', url: 'https://www.azalee-patrimoine.fr/blog' },
    { name: article.title, url: `https://www.azalee-patrimoine.fr/blog/${params.slug}` },
  ];

  // Helper to get correct image URL for display
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // If it starts with /images/, use API route for dynamic serving
    if (imagePath.startsWith('/images/')) {
      return `https://www.azalee-patrimoine.fr/api${imagePath}`;
    }
    // Otherwise use as-is
    return `https://www.azalee-patrimoine.fr${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Schema.org Article */}
      <ArticleSchema
        headline={article.title}
        description={article.metaDescription}
        image={getImageUrl(article.image)}
        datePublished={article.date}
        author={article.author}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-[#253F60]">Accueil</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/blog" className="text-gray-500 hover:text-[#253F60]">Blog</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-[#253F60] font-medium truncate max-w-[200px]">{article.title}</li>
          </ol>
        </div>
      </nav>

      {/* Article Header */}
      <header className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#B99066]/10 text-[#B99066] text-sm font-semibold px-4 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-500 font-inter mb-4">
              <span>{formatDate(article.date)}</span>
              <span>•</span>
              <span>{article.readTime} de lecture</span>
              <span>•</span>
              <span>Par {article.author}</span>
            </div>
            
            {/* Social Links */}
            {article.socialLinks && (article.socialLinks.linkedin || article.socialLinks.facebook || article.socialLinks.twitter || article.socialLinks.instagram) && (
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-gray-500">Partager :</span>
                {article.socialLinks.linkedin && (
                  <button
                    onClick={() => {
                      if (article.socialLinks.linkedin) {
                        window.open(article.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[#0077b5] hover:text-[#005885] transition-colors cursor-pointer"
                    aria-label="Voir sur LinkedIn"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                )}
                {article.socialLinks.facebook && (
                  <button
                    onClick={() => {
                      if (article.socialLinks.facebook) {
                        window.open(article.socialLinks.facebook, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[#1877f2] hover:text-[#1565c0] transition-colors cursor-pointer"
                    aria-label="Voir sur Facebook"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                )}
                {article.socialLinks.twitter && (
                  <button
                    onClick={() => {
                      if (article.socialLinks.twitter) {
                        window.open(article.socialLinks.twitter, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[#1da1f2] hover:text-[#0d8bd9] transition-colors cursor-pointer"
                    aria-label="Voir sur Twitter/X"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                )}
                {article.socialLinks.instagram && (
                  <button
                    onClick={() => {
                      if (article.socialLinks.instagram) {
                        window.open(article.socialLinks.instagram, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-[#e4405f] hover:text-[#c13584] transition-colors cursor-pointer"
                    aria-label="Voir sur Instagram"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none 
              prose-headings:font-cairo prose-headings:text-[#253F60] 
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:font-inter prose-p:text-gray-700 prose-p:leading-relaxed
              prose-strong:text-[#253F60]
              prose-ul:font-inter prose-li:text-gray-700
              prose-a:text-[#B99066] prose-a:no-underline hover:prose-a:underline"
          >
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i}>{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i}>{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
              }
              if (line.startsWith('- ')) {
                return null; // Handle lists separately
              }
              if (line.trim() === '') {
                return null;
              }
              return <p key={i}>{line}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl text-center">
            <h3 className="text-white text-xl font-cairo font-semibold mb-4">
              Besoin d'un Conseil Personnalisé ?
            </h3>
            <p className="text-white/80 font-inter mb-6">
              Nos experts sont à votre disposition pour un bilan patrimonial gratuit.
            </p>
            <a
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#B99066] hover:bg-[#a17d54] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Prendre Rendez-vous
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl font-cairo font-semibold mb-8 text-center">
              Articles Similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {article.relatedArticles.map((slug) => {
                const related = blogArticles[slug];
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300"
                  >
                    <span className="text-[#B99066] text-xs font-semibold uppercase">{related.category}</span>
                    <h3 className="text-[#253F60] text-lg font-cairo font-semibold mt-2 group-hover:text-[#B99066] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">{related.readTime} de lecture</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

