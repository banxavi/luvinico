/** Product URL helpers and gallery/related utilities — data comes from Sanity via productStore. */

/** Build URL slug from product name: "Sierra Nevada Pale Ale" → sierra-nevada-pale-ale */
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

function findProductInList(products, slug) {
  const normalized = slug?.toLowerCase?.() ?? '';
  return (
    products.find(
      (product) =>
        product.slug === normalized || slugify(product.name) === normalized,
    ) ?? null
  );
}

export function getProductByIdFromList(products, id) {
  return products.find((p) => p.id === id || String(p.id) === String(id)) ?? null;
}

/** Legacy /product/15 style paths */
export function getRedirectSlugFromLegacyPath(products, pathname) {
  const segment = getProductSlugFromPath(pathname);
  if (!segment || !/^\d+$/.test(segment)) return null;
  const product = getProductByIdFromList(products, Number(segment));
  return product ? getProductSlug(product) : null;
}

/** Detail gallery — up to 3 images; falls back to main image repeated. */
export function getProductGallery(product) {
  if (!product) return [];
  if (Array.isArray(product.gallery) && product.gallery.length > 0) {
    return product.gallery.slice(0, 3);
  }
  const main = product.image;
  return main ? [main, main, main] : [];
}

export function getRelatedProducts(products, productId, limit = 4) {
  const current = products.find((p) => p.id === productId);
  if (!current) return [];

  const others = products.filter((p) => p.id !== productId);
  const currentType = current.type ?? null;
  const currentCategory = current.category ?? null;

  const sameType = currentType
    ? others.filter((p) => p.type === currentType)
    : [];
  const sameCategory = others.filter(
    (p) =>
      p.category === currentCategory &&
      (!currentType || p.type !== currentType),
  );
  const rest = others.filter(
    (p) => p.category !== currentCategory && (!currentType || p.type !== currentType),
  );

  return [...sameType, ...sameCategory, ...rest].slice(0, limit);
}

export function resolveProductImageUrl(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image.src) return image.src;
  return null;
}

export { findProductInList };
