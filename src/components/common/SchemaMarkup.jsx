'use client';

import Script from 'next/script';

/**
 * Composant réutilisable pour ajouter des données structurées Schema.org
 * Optimisé : combine tous les schemas en un seul script pour réduire les requêtes
 * @param {Object} props
 * @param {Object|Array} props.schema - Objet ou tableau d'objets Schema.org
 * @param {string} props.id - ID unique pour le script (optionnel)
 */
export default function SchemaMarkup({ schema, id }) {
  if (!schema) return null;

  const schemas = Array.isArray(schema) ? schema : [schema];
  const scriptId = id || `schema-${Date.now()}`;

  // Optimisation : Combiner tous les schemas en un seul script au lieu de plusieurs
  // Cela réduit le nombre de requêtes et améliore les performances
  const combinedSchema = schemas.length === 1 ? schemas[0] : schemas;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}

