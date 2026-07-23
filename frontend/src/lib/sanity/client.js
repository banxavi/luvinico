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

const readToken = process.env.SANITY_API_READ_TOKEN || undefined;

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  !readToken &&
  !process.env.NEXT_PHASE
) {
  console.warn(
    '[sanity] SANITY_API_READ_TOKEN missing — catalog/header may be incomplete vs Studio. Set the Viewer secret on Cloudflare Workers.',
  );
}

/**
 * CMS collections used by the site: category, product, article.
 * Always prefer authenticated API when a read token exists so production
 * matches Studio (anonymous CDN can omit some published category docs).
 */
export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-02-01',
  token: readToken,
  useCdn: readToken ? false : process.env.SANITY_USE_CDN !== 'false',
  perspective: 'published',
  fetch: sanityFetch,
  maxRetries: 1,
});

function isProductionBuild() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

/**
 * Build: time-based revalidate (avoid DYNAMIC_SERVER_USAGE on sitemap/SSG).
 * Runtime: no-store + root force-dynamic for live CMS data without OpenNext KV.
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
