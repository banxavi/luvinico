import { getProductsByCategory } from './catalog';
import {
  getCategoryNavMenusFromCatalog,
  getNavMenuGroupFromCatalog,
  getSubTabSlugsForGroup,
  getTypeMetaFromCatalog,
  getTypesByCategoryFromCatalog,
  hasCategoryNavMenuConfig,
  isTypeInGroup,
} from './sanity/catalogStore';

export const NAV_SUBMENU_LIMIT = 12;
export const NAV_MAX_COLUMNS = 5;

/** Loại sản phẩm — ưu tiên field `type` trên từng sản phẩm */
export function getProductType(product, catalog) {
  const slug = product?.type;
  if (!slug) return null;
  if (catalog && !getTypeMetaFromCatalog(catalog, slug)) return slug;
  if (!catalog) return slug;
  return getTypeMetaFromCatalog(catalog, slug) ? slug : slug;
}

export function getProductsByType(products, typeSlug) {
  return (products ?? []).filter((product) => product?.type === typeSlug);
}

export function countProductsByType(products, typeSlug) {
  return getProductsByType(products, typeSlug).length;
}

/** URL trang lọc theo nhóm parent / sub-tab */
export function buildTagHref(categoryKey, { group = '', type = '', origin = '', price = '', abv = '' } = {}) {
  const params = new URLSearchParams();
  params.set('category', categoryKey);
  if (group) params.set('group', group);
  if (type) params.set('type', type);
  if (origin) params.set('origin', origin);
  if (price) params.set('price', price);
  if (abv) params.set('abv', abv);
  return `/tag?${params.toString()}`;
}

export function resolveGroupKey(catalog, categoryKey, groupKey) {
  const normalized = String(groupKey ?? '').trim();
  if (!normalized) return null;
  return getNavMenuGroupFromCatalog(catalog, categoryKey, normalized)?.key ?? null;
}

function countProductsInGroup(products, catalog, categoryKey, groupKey) {
  const slugs = getSubTabSlugsForGroup(catalog, categoryKey, groupKey);
  return getProductsByCategory(products, categoryKey).filter((product) =>
    slugs.includes(product?.type),
  ).length;
}

export function getSubTabsWithCounts(products, catalog, categoryKey, groupKey) {
  const group = getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey);
  if (!group) return [];

  const tabs = group.subTabs.map((tab) => ({
    ...tab,
    productCount: countProductsByType(products, tab.slug),
  }));

  if (group.showEmptySubTabs) return tabs;
  return tabs.filter((tab) => tab.productCount > 0);
}

/** Header nav — luôn hiện sub-tab đã cấu hình trong CMS, kể cả chưa có sản phẩm. */
function getSubTabsForNav(products, catalog, categoryKey, groupKey) {
  const group = getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey);
  if (!group) return [];

  return group.subTabs.map((tab) => ({
    ...tab,
    productCount: countProductsByType(products, tab.slug),
  }));
}

export function getProductsForNavGroup(products, catalog, categoryKey, groupKey) {
  const slugs = getSubTabSlugsForGroup(catalog, categoryKey, groupKey);
  if (!slugs.length) return [];
  return getProductsByCategory(products, categoryKey).filter((product) =>
    slugs.includes(product?.type),
  );
}

function getSortedTypesForCategory(products, catalog, categoryKey) {
  const types = getTypesByCategoryFromCatalog(catalog, categoryKey)
    .map((type) => ({
      ...type,
      productCount: countProductsByType(products, type.slug),
    }))
    .filter((type) => type.productCount > 0);

  return types.sort(
    (a, b) => b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'),
  );
}

export function getFeaturedTypesForCategory(products, catalog, categoryKey, limit = NAV_SUBMENU_LIMIT) {
  return getSortedTypesForCategory(products, catalog, categoryKey).slice(0, limit);
}

/** Menu desktop/mobile — dropdown + standard menu từ CMS (kể cả tab/group chưa có SP). */
export function getNavMenuSections(products, categoryKey, catalog, limit = NAV_SUBMENU_LIMIT) {
  if (hasCategoryNavMenuConfig(catalog, categoryKey)) {
    return getCategoryNavMenusFromCatalog(catalog, categoryKey)
      .map((group) => {
        const subTabs = getSubTabsForNav(products, catalog, categoryKey, group.key);
        // Include CMS groups with zero sub-tabs so header matches Studio config.
        if (!subTabs.length && !group.label && !group.flat) return null;

        const visible = subTabs.slice(0, limit);
        const hasMore = subTabs.length > limit;
        const groupHref = group.flat
          ? null
          : buildTagHref(categoryKey, { group: group.key });
        return {
          key: group.key,
          label: group.label,
          parentHref: groupHref,
          subTabs: visible,
          hasMore,
          moreHref: groupHref ?? `/tag?category=${categoryKey}`,
        };
      })
      .filter(Boolean);
  }

  const flat = getTypesByCategoryFromCatalog(catalog, categoryKey)
    .map((type) => ({
      ...type,
      productCount: countProductsByType(products, type.slug),
    }))
    .sort(
      (a, b) =>
        b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'),
    );
  if (!flat.length) return [];

  return [
    {
      key: categoryKey,
      label: null,
      parentHref: null,
      subTabs: flat.slice(0, limit),
      hasMore: flat.length > limit,
      moreHref: `/tag?category=${categoryKey}`,
    },
  ];
}

export function getTypesWithCounts(products, catalog, categoryKey, groupKey = '') {
  if (groupKey) {
    return getSubTabsWithCounts(products, catalog, categoryKey, groupKey);
  }
  return getSortedTypesForCategory(products, catalog, categoryKey);
}

/** Sidebar trang /tag — luôn hiện loại đã cấu hình CMS, kể cả chưa có sản phẩm. */
export function getCatalogSidebarTypes(products, catalog, categoryKey, groupKey = '') {
  if (groupKey) {
    const group = getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey);
    if (!group) return [];
    return group.subTabs.map((tab) => ({
      ...tab,
      productCount: countProductsByType(products, tab.slug),
    }));
  }

  return getTypesByCategoryFromCatalog(catalog, categoryKey)
    .map((type) => ({
      ...type,
      productCount: countProductsByType(products, type.slug),
    }))
    .sort(
      (a, b) =>
        b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'),
    );
}

export function resolveTypeSlug(typeSlug, catalog, { categoryKey = '', groupKey = '' } = {}) {
  const normalized = String(typeSlug ?? '').toLowerCase();
  if (!getTypeMetaFromCatalog(catalog, normalized)) return null;
  if (groupKey && !isTypeInGroup(catalog, categoryKey, groupKey, normalized)) return null;
  return normalized;
}

export function getTypeMeta(catalog, typeSlug) {
  return getTypeMetaFromCatalog(catalog, typeSlug);
}

export function getAllTypeSlugs(catalog) {
  return Object.keys(catalog?.productTypes ?? {});
}

export function getTypesByCategory(catalog, categoryKey) {
  return getTypesByCategoryFromCatalog(catalog, categoryKey);
}
