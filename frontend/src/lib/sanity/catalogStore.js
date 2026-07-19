import { cache } from 'react';
import { isSanityConfigured, sanityClient, SANITY_REVALIDATE_SECONDS } from './client';
import { ALL_CATEGORIES_QUERY } from './queries';
import { buildCatalogFromDocs, mapCategoryDoc } from './mapCategory';

const fetchOptions = {
  next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ['catalog'] },
};

export const EMPTY_CATALOG = {
  categories: {},
  categoryNavMenus: {},
  productTypes: {},
};

async function fetchCatalogFromSanity() {
  const categoryDocs = await sanityClient.fetch(ALL_CATEGORIES_QUERY, {}, fetchOptions);
  const categories = (categoryDocs ?? []).map(mapCategoryDoc).filter(Boolean);

  if (!categories.length) return null;

  return buildCatalogFromDocs(categories);
}

/** Request-scoped catalog cache — categories embed menus + product type slugs. */
export const getCatalog = cache(async () => {
  if (!isSanityConfigured()) return EMPTY_CATALOG;

  try {
    const catalog = await fetchCatalogFromSanity();
    return catalog ?? EMPTY_CATALOG;
  } catch (error) {
    console.error('[sanity] fetchCatalog failed', error);
    return EMPTY_CATALOG;
  }
});

export async function getCategoryByKey(categoryKey) {
  const catalog = await getCatalog();
  return catalog.categories[categoryKey] ?? null;
}

export async function getAllCategoryKeys() {
  const catalog = await getCatalog();
  return Object.keys(catalog.categories);
}

export function getTypeMetaFromCatalog(catalog, typeSlug) {
  return catalog?.productTypes?.[typeSlug] ?? null;
}

export function getTypesByCategoryFromCatalog(catalog, categoryKey) {
  return Object.values(catalog?.productTypes ?? {}).filter(
    (type) => type.category === categoryKey,
  );
}

export function getCategoryNavMenusFromCatalog(catalog, categoryKey) {
  return catalog?.categoryNavMenus?.[categoryKey] ?? [];
}

export function hasCategoryNavMenuConfig(catalog, categoryKey) {
  return Object.prototype.hasOwnProperty.call(catalog?.categoryNavMenus ?? {}, categoryKey);
}

export function getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey) {
  return getCategoryNavMenusFromCatalog(catalog, categoryKey).find(
    (group) => group.key === groupKey,
  ) ?? null;
}

export function getSubTabSlugsForGroup(catalog, categoryKey, groupKey) {
  const group = getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey);
  return group?.subTabs?.map((tab) => tab.slug) ?? [];
}

export function isTypeInGroup(catalog, categoryKey, groupKey, typeSlug) {
  if (!typeSlug) return false;
  return getSubTabSlugsForGroup(catalog, categoryKey, groupKey).includes(typeSlug);
}
