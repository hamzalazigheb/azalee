'use client';

import Script from 'next/script';

/**
 * Composant réutilisable pour ajouter des données structurées Schema.org
 * @param {Object} props
 * @param {Object|Array} props.schema - Objet ou tableau d'objets Schema.org
 * @param {string} props.id - ID unique pour le script (optionnel)
 */
export default function SchemaMarkup({ schema, id }) {
  if (!schema) return null;

  const schemas = Array.isArray(schema) ? schema : [schema];
  const scriptId = id || `schema-${Date.now()}`;

  return (
    <>
      {schemas.map((schemaData, index) => (
        <Script
          key={index}
          id={`${scriptId}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      ))}
    </>
  );
}

