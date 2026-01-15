export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://azalee-patrimoine.fr/sitemap.xml',
  };
}


