import { getSiteUrl } from '../lib/site';

export default function robots() {
  const baseUrl = getSiteUrl().replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
