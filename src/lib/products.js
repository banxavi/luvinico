import { mockProducts } from '../mockData';
import { productDetailExtras } from '../data/productDetails';

/** Tạo slug URL từ tên sản phẩm: "Sierra Nevada Pale Ale" → sierra-nevada-pale-ale */
export function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[''']/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getProductSlug(product) {
  if (product == null) return '';
  if (typeof product === 'string') return product;
  if (typeof product === 'number') {
    const found = mockProducts.find((p) => p.id === product);
    return found ? slugify(found.name) : '';
  }
  return product.slug ?? slugify(product.name);
}

export function productPath(product, { from, q } = {}) {
  const slug = getProductSlug(product);
  if (!slug) return '/';
  const base = `/product/${slug}`;
  if (from === 'search') {
    const query = String(q ?? '').trim();
    if (query) {
      return `${base}?from=search&q=${encodeURIComponent(query)}`;
    }
    return `${base}?from=search`;
  }
  return base;
}

export function getProductSlugFromPath(pathname) {
  const match = pathname.match(/^\/product\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function mergeProduct(base) {
  if (!base) return null;
  const extras = productDetailExtras[base.id];
  const slug = base.slug ?? slugify(base.name);
  if (!extras) return { ...base, slug };
  return { ...base, slug, ...extras };
}

export function getProductBySlug(slug) {
  const normalized = slug?.toLowerCase?.() ?? '';
  const base = mockProducts.find((p) => slugify(p.name) === normalized || p.slug === normalized);
  return mergeProduct(base);
}

/** Hỗ trợ link cũ dạng /product/15 */
export function getProductById(id) {
  const numId = Number(id);
  const base = mockProducts.find((p) => p.id === numId);
  return mergeProduct(base);
}

export function getRedirectSlugFromLegacyPath(pathname) {
  const segment = getProductSlugFromPath(pathname);
  if (!segment || !/^\d+$/.test(segment)) return null;
  const product = getProductById(Number(segment));
  return product ? getProductSlug(product) : null;
}

/** Gallery chi tiết — 3 ảnh; fallback mock dùng ảnh chính lặp cho đến khi khách upload */
export function getProductGallery(product) {
  if (!product) return [];
  if (Array.isArray(product.gallery) && product.gallery.length > 0) {
    return product.gallery.slice(0, 3);
  }
  const main = product.image;
  return main ? [main, main, main] : [];
}

export function getRelatedProducts(productId, limit = 4) {
  const current = getProductById(productId);
  if (!current) return [];

  const sameStyle = mockProducts.filter((p) => p.id !== productId && p.style === current.style);
  const pool = sameStyle.length >= limit ? sameStyle : mockProducts.filter((p) => p.id !== productId);

  return pool.map((p) => mergeProduct(p)).slice(0, limit);
}

export function getAllProductSlugs() {
  return mockProducts.map((product) => getProductSlug(product)).filter(Boolean);
}

export function resolveProductImageUrl(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image.src) return image.src;
  return null;
}
