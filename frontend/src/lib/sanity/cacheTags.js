/** Next.js fetch cache tags — keep in sync with /api/revalidate. */
export const SANITY_CACHE_TAGS = {
  products: 'products',
  catalog: 'catalog',
  articles: 'articles',
};

export const ALL_SANITY_CACHE_TAGS = Object.values(SANITY_CACHE_TAGS);
