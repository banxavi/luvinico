import { mockProducts } from '../mockData';
import { getProductCategory } from './catalog';
import { getTypeMeta, getTypesByCategory, PRODUCT_TYPES } from '../data/productTypes';

const STYLE_TO_TYPE = {
  'vang đỏ': 'vang-do',
  'vang trắng': 'vang-trang',
  sparkling: 'sparkling',
  'pale ale': 'pale-ale',
  'wheat beer': 'wheat-beer',
  hefeweizen: 'wheat-beer',
  witbier: 'wheat-beer',
  'belgian strong ale': 'belgian-ale',
  dubbel: 'belgian-ale',
  stout: 'stout',
  lager: 'lager',
  'trappist ale': 'trappist',
  ipa: 'ipa',
  pilsner: 'pilsner',
};

/** Loại sản phẩm — ưu tiên field `type`, fallback theo style */
export function getProductType(product) {
  if (product?.type && PRODUCT_TYPES[product.type]) return product.type;

  const style = String(product?.style ?? '').toLowerCase().trim();
  if (style) {
    if (STYLE_TO_TYPE[style]) return STYLE_TO_TYPE[style];
    const matched = Object.entries(STYLE_TO_TYPE).find(([key]) => style.includes(key));
    if (matched) return matched[1];
  }

  const category = getProductCategory(product);
  if (category === 'ruou-vang') return 'vang-do';
  if (category === 'bia') return 'lager';
  return null;
}

export function getProductsByType(typeSlug) {
  return (mockProducts ?? []).filter((product) => getProductType(product) === typeSlug);
}

export function countProductsByType(typeSlug) {
  return getProductsByType(typeSlug).length;
}

/** 2–3 loại nổi bật cho menu hover — ưu tiên loại có sản phẩm */
export function getFeaturedTypesForCategory(categoryKey, limit = 3) {
  const types = getTypesByCategory(categoryKey).map((type) => ({
    ...type,
    productCount: countProductsByType(type.slug),
  }));

  const withProducts = types.filter((type) => type.productCount > 0);
  const pool = withProducts.length > 0 ? withProducts : types;

  return pool
    .sort((a, b) => b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'))
    .slice(0, limit);
}

export function getTypesWithCounts(categoryKey) {
  return getTypesByCategory(categoryKey)
    .map((type) => ({
      ...type,
      productCount: countProductsByType(type.slug),
    }))
    .sort((a, b) => b.productCount - a.productCount || a.label.localeCompare(b.label, 'vi'));
}

export function resolveTypeSlug(typeSlug) {
  const normalized = String(typeSlug ?? '').toLowerCase();
  return getTypeMeta(normalized) ? normalized : null;
}
