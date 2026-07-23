import { createClient } from '@sanity/client';
import { PAGE_REVALIDATE_SECONDS } from '../revalidate';
import { SANITY_CACHE_TAGS } from './cacheTags';

export { SANITY_CACHE_TAGS, ALL_SANITY_CACHE_TAGS } from './cacheTags';

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfqhf74q';
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isSanityConfigured = () => Boolean(sanityProjectId && sanityDataset);

export const SANITY_REVALIDATE_SECONDS = PAGE_REVALIDATE_SECONDS;

/** Abort hung Sanity API calls (wall time; does not burn CPU while waiting). */
const FETCH_TIMEOUT_MS = Number(process.env.SANITY_FETCH_TIMEOUT_MS) || 8_000;

function sanityFetch(url, init) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timer);
  });
}

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-02-01',
  // CDN is fine for published docs; override with SANITY_USE_CDN=false if needed.
  useCdn: process.env.SANITY_USE_CDN !== 'false',
  token: process.env.SANITY_API_READ_TOKEN,
  fetch: sanityFetch,
});

/**
 * Avoid Next Data Cache on OpenNext CF without KV (stale SSG).
 * Freshness comes from short isolate memory TTL in productStore/catalogStore.
 */
export function getSanityFetchOptions(_tag) {
  return { cache: 'no-store' };
}
