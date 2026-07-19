/**
 * Base URL cho metadata (OG, sitemap, canonical).
 * Khi đổi port dev (vd. 3001), set NEXT_PUBLIC_SITE_URL khớp port đó
 * hoặc chạy `npm run dev:3001`.
 * Production (Vercel): set NEXT_PUBLIC_SITE_URL=https://your-domain.com
 */
export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

/** Chỉ cho phép index khi không chạy trên localhost */
export function isIndexableSite() {
  try {
    const { hostname } = new URL(getSiteUrl());
    return hostname !== 'localhost' && hostname !== '127.0.0.1';
  } catch {
    return false;
  }
}

export function absoluteUrl(path) {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
