import { cache } from 'react';

import { BRAND } from '../../data/brand';
import { FOOTER } from '../../data/footer';
import {
  isSanityConfigured,
  sanityClient,
  getSanityFetchOptions,
  logSanityError,
  SANITY_CACHE_TAGS,
} from './client';
import { SITE_SETTINGS_QUERY } from './queries';
import { withSanityMemoryCache } from './memoryCache';

function pickText(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

/**
 * Merge CMS singleton with static defaults (`FOOTER` / `BRAND`).
 * Policies stay static. Missing fields/images → site defaults.
 */
export function mapSiteSettings(doc) {
  return {
    brandName: pickText(doc?.brandName, BRAND.name),
    address: pickText(doc?.address, FOOTER.address),
    hotline: pickText(doc?.hotline, BRAND.hotline),
    facebookUrl: pickText(doc?.facebookUrl, BRAND.facebook),
    facebookLabel: pickText(doc?.facebookLabel, FOOTER.facebookLabel),
    disclaimer: pickText(doc?.disclaimer, FOOTER.disclaimer),
    regulatoryNote: pickText(doc?.regulatoryNote, FOOTER.regulatoryNote),
    warning: pickText(doc?.warning, FOOTER.warning),
    faviconUrl: pickText(doc?.faviconUrl, FOOTER.faviconUrl),
    warningImageUrl: pickText(doc?.warningImageUrl, FOOTER.warningImageUrl),
    warningImageAlt: pickText(doc?.warningImageAlt, FOOTER.warningImageAlt),
  };
}

const DEFAULT_SITE_SETTINGS = mapSiteSettings(null);

async function fetchSiteSettingsFromSanity() {
  return withSanityMemoryCache('siteSettings', async () => {
    const doc = await sanityClient.fetch(
      SITE_SETTINGS_QUERY,
      {},
      getSanityFetchOptions(SANITY_CACHE_TAGS.siteSettings),
    );
    return mapSiteSettings(doc);
  });
}

export const getSiteSettings = cache(async () => {
  if (!isSanityConfigured()) return DEFAULT_SITE_SETTINGS;

  try {
    return await fetchSiteSettingsFromSanity();
  } catch (error) {
    logSanityError('fetchSiteSettings failed', error);
    return DEFAULT_SITE_SETTINGS;
  }
});
