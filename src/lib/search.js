import { getProductCategory } from './catalog';
import { getProductType } from './types';
import { CATEGORIES } from '../data/categories';
import { PRODUCT_TYPES } from '../data/productTypes';

/** Giá số (VND) để lọc — ưu tiên salePrice; null = liên hệ */
export function getProductPriceValue(product) {
  if (product?.contactPrice) return null;
  const priceStr = product?.salePrice ?? product?.price;
  if (!priceStr || /liên hệ/i.test(String(priceStr))) return null;
  return Number.parseInt(String(priceStr).replace(/\D/g, ''), 10) || 0;
}

export const PRICE_FILTERS = [
  { value: '', label: 'Tất cả mức giá' },
  { value: 'duoi-200', label: 'Dưới 200 ngàn', min: 1, max: 199_999 },
  { value: '200-500', label: '200 ngàn – 500 ngàn', min: 200_000, max: 500_000 },
  { value: '500-1000', label: '500 ngàn – 1 triệu', min: 500_001, max: 1_000_000 },
  { value: 'tren-1000', label: 'Trên 1 triệu', min: 1_000_001, max: Infinity },
  { value: 'lien-he', label: 'Liên hệ' },
];

export const ABV_FILTERS = [
  { value: '', label: 'Tất cả ABV' },
  { value: 'duoi-5', label: 'Dưới 5%', min: 0, max: 4.99 },
  { value: '5-8', label: '5% – 8%', min: 5, max: 8 },
  { value: '8-12', label: '8% – 12%', min: 8.01, max: 12 },
  { value: 'tren-12', label: 'Trên 12%', min: 12.01, max: Infinity },
];

/** ABV số (%) — null nếu không parse được */
export function getProductAbvValue(product) {
  const raw = product?.abv;
  if (!raw || raw === '—') return null;
  const num = Number.parseFloat(String(raw).replace('%', '').replace(',', '.').trim());
  return Number.isFinite(num) ? num : null;
}

function matchesTextQuery(product, query) {
  const haystack = `${product.name ?? ''} ${product.origin ?? ''} ${product.abv ?? ''} ${product.style ?? ''}`.toLowerCase();
  return haystack.includes(query);
}

function matchesPriceFilter(product, priceKey) {
  if (!priceKey) return true;
  const priceValue = getProductPriceValue(product);

  if (priceKey === 'lien-he') {
    return product?.contactPrice || priceValue === null;
  }

  const range = PRICE_FILTERS.find((f) => f.value === priceKey);
  if (!range || priceValue === null) return false;

  return priceValue >= range.min && priceValue <= range.max;
}

function matchesOriginFilter(product, origin) {
  if (!origin) return true;
  return String(product?.origin ?? '') === origin;
}

function matchesCategoryFilter(product, category) {
  if (!category) return true;
  return getProductCategory(product) === category;
}

function matchesTypeFilter(product, type) {
  if (!type) return true;
  return getProductType(product) === type;
}

function matchesAbvFilter(product, abvKey) {
  if (!abvKey) return true;
  const abvValue = getProductAbvValue(product);
  const range = ABV_FILTERS.find((f) => f.value === abvKey);
  if (!range || abvValue === null) return false;
  return abvValue >= range.min && abvValue <= range.max;
}

export function filterProducts(
  products,
  { q = '', origin = '', category = '', price = '', type = '', abv = '' } = {},
) {
  const query = String(q).trim().toLowerCase();

  return (products ?? []).filter((product) => {
    if (query && !matchesTextQuery(product, query)) return false;
    if (!matchesOriginFilter(product, origin)) return false;
    if (!matchesCategoryFilter(product, category)) return false;
    if (!matchesTypeFilter(product, type)) return false;
    if (!matchesPriceFilter(product, price)) return false;
    if (!matchesAbvFilter(product, abv)) return false;
    return true;
  });
}

/** @deprecated Use filterProducts */
export function searchProducts(products, options) {
  return filterProducts(products, options);
}

export function getSearchFilterOptions(products, { includeTypes = false } = {}) {
  const origins = [...new Set((products ?? []).map((p) => p.origin).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'vi'),
  );

  const categoryKeys = [
    ...new Set((products ?? []).map((p) => getProductCategory(p)).filter((key) => CATEGORIES[key])),
  ].sort((a, b) => CATEGORIES[a].title.localeCompare(CATEGORIES[b].title, 'vi'));

  const categories = categoryKeys.map((key) => ({
    value: key,
    label: CATEGORIES[key].title,
  }));

  const types = includeTypes
    ? [...new Set((products ?? []).map((p) => getProductType(p)).filter(Boolean))].map((slug) => ({
        value: slug,
        label: PRODUCT_TYPES[slug]?.label ?? slug,
      }))
    : [];

  return { origins, categories, types };
}
