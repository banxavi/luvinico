import { mockProducts } from '../mockData';
import { getTypeMeta, getTypesByCategory, PRODUCT_TYPES } from '../data/productTypes';
import { NAV_SUBMENU_LIMIT } from '../data/nav';

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

/** Chỉ hiện loại có ít nhất 1 sản phẩm trong danh mục */
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

/** Sub-menu nav: items + cờ hiện "Xem thêm" khi còn loại ngoài limit */
export function getNavSubmenuTypes(categoryKey, limit = NAV_SUBMENU_LIMIT) {
  const sorted = getSortedTypesForCategory(categoryKey);
  const items = sorted.slice(0, limit);
  const hasMore = sorted.length > limit;
  return { items, hasMore };
}

export function getTypesWithCounts(categoryKey) {
  return getSortedTypesForCategory(categoryKey);
}

export function resolveTypeSlug(typeSlug) {
  const normalized = String(typeSlug ?? '').toLowerCase();
  return getTypeMeta(normalized) ? normalized : null;
}
