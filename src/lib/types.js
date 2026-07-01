import { mockProducts } from '../mockData';
import { getProductsByCategory } from './catalog';
import {
  getCategoryNavMenus,
  getNavMenuGroup,
  getSubTabSlugsForGroup,
  isTypeInGroup,
  NAV_SUBMENU_LIMIT,
  NAV_MAX_COLUMNS,
} from '../data/navMenu';
import { getTypeMeta, getTypesByCategory, PRODUCT_TYPES } from '../data/productTypes';

export { NAV_SUBMENU_LIMIT, NAV_MAX_COLUMNS };

/** Loại sản phẩm — ưu tiên field `type` trên từng sản phẩm */
export function getProductType(product) {
  if (product?.type && PRODUCT_TYPES[product.type]) return product.type;
  return null;
}

export function getProductsByType(typeSlug) {
  return (mockProducts ?? []).filter((product) => getProductType(product) === typeSlug);
}

export function countProductsByType(typeSlug) {
  return getProductsByType(typeSlug).length;
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

export function resolveGroupKey(categoryKey, groupKey) {
  const normalized = String(groupKey ?? '').trim();
  if (!normalized) return null;
  return getNavMenuGroup(categoryKey, normalized)?.key ?? null;
}

function countProductsInGroup(categoryKey, groupKey) {
  const slugs = getSubTabSlugsForGroup(categoryKey, groupKey);
  return getProductsByCategory(categoryKey).filter((product) =>
    slugs.includes(getProductType(product)),
  ).length;
}

/** Sub-tab kèm số lượng — chỉ hiện tab có sản phẩm */
export function getSubTabsWithCounts(categoryKey, groupKey) {
  const group = getNavMenuGroup(categoryKey, groupKey);
  if (!group) return [];

  return group.subTabs
    .map((tab) => ({
      ...tab,
      productCount: countProductsByType(tab.slug),
    }))
    .filter((tab) => tab.productCount > 0);
}

export function getProductsForNavGroup(categoryKey, groupKey) {
  const slugs = getSubTabSlugsForGroup(categoryKey, groupKey);
  if (!slugs.length) return [];
  return getProductsByCategory(categoryKey).filter((product) =>
    slugs.includes(getProductType(product)),
  );
}

/** Chỉ hiện loại có sản phẩm — danh mục không có menu phân cấp */
function getSortedTypesForCategory(categoryKey) {
  const types = getTypesByCategory(categoryKey)
    .map((type) => ({
      ...type,
      productCount: countProductsByType(type.slug),
    }))
    .filter((type) => type.productCount > 0);

  return types.sort(
    (a, b) => b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'),
  );
}

export function getFeaturedTypesForCategory(categoryKey, limit = NAV_SUBMENU_LIMIT) {
  return getSortedTypesForCategory(categoryKey).slice(0, limit);
}

/** Menu desktop/mobile — nhóm parent + sub-tab (ẩn tab trống) */
export function getNavMenuSections(categoryKey, limit = NAV_SUBMENU_LIMIT) {
  const groups = getCategoryNavMenus(categoryKey);
  if (groups.length) {
    return groups
      .map((group) => {
        const subTabs = getSubTabsWithCounts(categoryKey, group.key);
        if (!subTabs.length) return null;

        const visible = subTabs.slice(0, limit);
        const hasMore = subTabs.length > limit;
        return {
          key: group.key,
          label: group.label,
          parentHref: buildTagHref(categoryKey, { group: group.key }),
          subTabs: visible,
          hasMore,
          moreHref: buildTagHref(categoryKey, { group: group.key }),
        };
      })
      .filter(Boolean);
  }

  const flat = getSortedTypesForCategory(categoryKey);
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

/** @deprecated dùng getNavMenuSections */
export function getNavSubmenuTypes(categoryKey, limit = NAV_SUBMENU_LIMIT) {
  const sections = getNavMenuSections(categoryKey, limit);
  const items = sections.flatMap((section) => section.subTabs);
  const hasMore = sections.some((section) => section.hasMore);
  return { items, hasMore };
}

export function getTypesWithCounts(categoryKey, groupKey = '') {
  if (groupKey) {
    return getSubTabsWithCounts(categoryKey, groupKey);
  }
  return getSortedTypesForCategory(categoryKey);
}

export function resolveTypeSlug(typeSlug, { categoryKey = '', groupKey = '' } = {}) {
  const normalized = String(typeSlug ?? '').toLowerCase();
  if (!getTypeMeta(normalized)) return null;
  if (groupKey && !isTypeInGroup(categoryKey, groupKey, normalized)) return null;
  return normalized;
}
