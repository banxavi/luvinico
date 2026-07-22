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

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-02-01',
  useCdn:
    process.env.NODE_ENV === 'production' &&
    process.env.SANITY_USE_CDN !== 'false',
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Sanity fetch cache options.
 * Always no-store: OpenNext on Cloudflare has no KV/D1 incrementalCache + tagCache yet,
 * so Next.js Data Cache (`next: { revalidate, tags }`) misbehaves on Workers and can hang requests after CMS saves.
 * Restore ISR tags here once KV/D1 is configured in open-next.config.ts.
 */
export function getSanityFetchOptions(_tag) {
  return { cache: 'no-store' };
}
