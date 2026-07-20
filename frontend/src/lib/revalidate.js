const parsed = Number(process.env.SANITY_REVALIDATE_SECONDS);

/** ISR / Sanity fetch interval. Dev defaults to 0 so F5 always shows fresh CMS data. */
export const PAGE_REVALIDATE_SECONDS =
  Number.isFinite(parsed) && parsed >= 0
    ? parsed
    : process.env.NODE_ENV === 'development'
      ? 0
      : 60;

export const SITEMAP_REVALIDATE_SECONDS =
  process.env.NODE_ENV === 'development' ? 0 : 3600;
