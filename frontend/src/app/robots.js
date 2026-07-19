export const dynamic = "force-static";

import { getSiteUrl, isIndexableSite } from '../lib/site';

export default function robots() {
  const baseUrl = getSiteUrl().replace(/\/$/, '');

  if (!isIndexableSite()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
