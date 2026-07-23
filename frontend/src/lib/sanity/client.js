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
  // Next throws DYNAMIC_SERVER_USAGE on no-store during SSG; Sanity treats it as
  // a network error and would otherwise retry 5× and flood the build log.
  maxRetries: 1,
});

function isProductionBuild() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

/**
 * Build: time-based revalidate so sitemap / generateStaticParams do not throw
 * DYNAMIC_SERVER_USAGE (and Sanity does not retry that as a network failure).
 * Runtime on Workers: no-store + root force-dynamic so CMS data is not frozen
 * from an empty/partial SSG snapshot when OpenNext KV is not configured.
 */
export function getSanityFetchOptions(tag) {
  if (isProductionBuild()) {
    const revalidate =
      PAGE_REVALIDATE_SECONDS > 0 ? PAGE_REVALIDATE_SECONDS : 60;
    return {
      next: {
        revalidate,
        ...(tag ? { tags: [tag] } : {}),
      },
    };
  }

  return { cache: 'no-store' };
}

/** Log Sanity failures without dumping request headers (API tokens). */
export function logSanityError(label, error) {
  const digest = error?.digest || error?.cause?.digest;
  const message = error?.message || String(error);
  if (digest) {
    console.error(`[sanity] ${label}: ${message} (${digest})`);
    return;
  }
  console.error(`[sanity] ${label}: ${message}`);
}
