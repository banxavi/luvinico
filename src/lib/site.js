/**
 * Base URL cho metadata (OG, sitemap, canonical).
 * Khi đổi port dev (vd. 3001), set NEXT_PUBLIC_SITE_URL khớp port đó
 * hoặc chạy `npm run dev:3001`.
 */
export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export function absoluteUrl(path) {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
