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
 * Sanity fetch cache options aligned with route `export const revalidate = 60`.
 * `cache: 'no-store'` opts out of static generation and breaks `next build` for those routes.
 * Tag-based `revalidateTag` stays disabled in /api/revalidate until OpenNext KV/D1 tag cache is configured.
 */
export function getSanityFetchOptions(tag) {
  const revalidate = SANITY_REVALIDATE_SECONDS;

  if (revalidate === 0) {
    return { cache: 'no-store' };
  }

  return {
    next: {
      revalidate,
      ...(tag ? { tags: [tag] } : {}),
    },
  };
}
