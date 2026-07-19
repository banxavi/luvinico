import { createClient } from '@sanity/client';

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfqhf74q';
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isSanityConfigured = () => Boolean(sanityProjectId && sanityDataset);

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-02-01',
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

/** Revalidate Sanity-backed pages on the Worker (seconds). */
export const SANITY_REVALIDATE_SECONDS = 60;
