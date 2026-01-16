/**
 * SEO Schema.org Components for structured data
 * Supports: FAQ, Service, BreadcrumbList, Article
 */

import Script from 'next/script';

/**
 * FAQ Schema - Pour les pages avec questions/réponses
 * @param {Array} faqs - Array of {question, answer} objects
 */
export function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="schema-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema - Pour les pages de services
 * @param {Object} service - {name, description, provider, areaServed, url}
 */
export function ServiceSchema({ service }) {
  if (!service) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Azalée Patrimoine",
      "url": "https://azalee-patrimoine.fr"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "url": service.url || "https://azalee-patrimoine.fr"
  };

  return (
    <Script
      id="schema-service"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Schema - Pour la navigation fil d'ariane
 * @param {Array} items - Array of {name, url} objects in order
 */
export function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article Schema - Pour les articles de blog
 * @param {Object} article - {headline, description, author, datePublished, dateModified, image}
 */
export function ArticleSchema({ article }) {
  if (!article) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author || "Azalée Patrimoine"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Azalée Patrimoine",
      "logo": {
        "@type": "ImageObject",
        "url": "https://azalee-patrimoine.fr/images/azalee-patrimoine3.webp"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image || "https://azalee-patrimoine.fr/images/og-image.jpg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };

  return (
    <Script
      id="schema-article"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Combined Schema Component - Renders multiple schemas
 * @param {Object} props - { faq, service, breadcrumbs, article }
 */
export default function SchemaOrg({ faq, service, breadcrumbs, article }) {
  return (
    <>
      {faq && <FAQSchema faqs={faq} />}
      {service && <ServiceSchema service={service} />}
      {breadcrumbs && <BreadcrumbSchema items={breadcrumbs} />}
      {article && <ArticleSchema article={article} />}
    </>
  );
}

