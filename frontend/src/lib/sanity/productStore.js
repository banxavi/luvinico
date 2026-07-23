import { cache } from 'react';

import { slugify } from '../products';
import {
  isSanityConfigured,
  sanityClient,
  getSanityFetchOptions,
  logSanityError,
  SANITY_CACHE_TAGS,
} from './client';
import {
  ALL_PRODUCTS_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
  ON_SALE_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from './queries';
import { mapSanityProduct } from './mapProduct';
import { getOnSaleProducts, getSaleDiscountPercent } from '../pricing';
import { withSanityMemoryCache } from './memoryCache';

function productFetchOptions() {
  return getSanityFetchOptions(SANITY_CACHE_TAGS.products);
}

async function fetchSanityProducts() {
  return withSanityMemoryCache('products:all', async () => {
    const docs = await sanityClient.fetch(
      ALL_PRODUCTS_QUERY,
      {},
      productFetchOptions(),
    );
    if (!Array.isArray(docs)) return [];
    return docs.map(mapSanityProduct).filter(Boolean);
  });
}

async function fetchSanityProductBySlug(slug) {
  const doc = await sanityClient.fetch(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    productFetchOptions(),
  );
  return mapSanityProduct(doc);
}

/** Request-scoped + isolate TTL — one Sanity list fetch shared across layout/pages. */
export const getProducts = cache(async () => {
  if (!isSanityConfigured()) return [];

  try {
    return await fetchSanityProducts();
  } catch (error) {
    logSanityError('fetchAllProducts failed', error);
    return [];
  }
});

/** Products on promotion — salePrice set in Sanity and lower than list price. */
export const getOnSaleProductsFromStore = cache(async () => {
  if (!isSanityConfigured()) return [];

  try {
    const docs = await withSanityMemoryCache('products:on-sale', async () =>
      sanityClient.fetch(ON_SALE_PRODUCTS_QUERY, {}, productFetchOptions()),
    );
    if (!Array.isArray(docs)) return [];

    const products = docs.map(mapSanityProduct).filter(Boolean);
    return getOnSaleProducts(products).sort(
      (a, b) => (getSaleDiscountPercent(b) ?? 0) - (getSaleDiscountPercent(a) ?? 0),
    );
  } catch (error) {
    logSanityError('fetchOnSaleProducts failed', error);
    return [];
  }
});

export const getProductBySlugFromStore = cache(async (slug) => {
  const normalized = slug?.toLowerCase?.() ?? '';
  if (!normalized) return null;

  if (isSanityConfigured()) {
    try {
      const product = await fetchSanityProductBySlug(normalized);
      if (product) return product;
    } catch (error) {
      logSanityError('fetchProductBySlug failed', error);
    }
  }

  const products = await getProducts();
  return (
    products.find(
      (product) =>
        product.slug === normalized || slugify(product.name) === normalized,
    ) ?? null
  );
});

export async function getAllProductSlugsFromStore() {
  if (isSanityConfigured()) {
    try {
      const slugs = await withSanityMemoryCache('products:slugs', async () =>
        sanityClient.fetch(ALL_PRODUCT_SLUGS_QUERY, {}, productFetchOptions()),
      );
      if (Array.isArray(slugs) && slugs.length > 0) {
        return slugs.filter(Boolean);
      }
    } catch (error) {
      logSanityError('fetchProductSlugs failed', error);
    }
  }

  const products = await getProducts();
  return products.map((product) => product.slug).filter(Boolean);
}

function parseListPrice(product) {
  return parseInt(String(product?.price ?? '').replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Home “signature” row — every published CMS product (no hardcoded category keys).
 * Category membership comes from Sanity `category` refs only.
 */
export function getBestSellerProducts(products, limit = 12) {
  return (products ?? []).filter(Boolean).slice(0, limit);
}

/**
 * Home value deals — cheapest CMS products with a list price.
 * Falls back to any products if none have parseable prices.
 */
export function getValueDealProducts(products, limit = 8) {
  const list = (products ?? []).filter(Boolean);
  const priced = list
    .filter((product) => parseListPrice(product) > 0)
    .sort((a, b) => parseListPrice(a) - parseListPrice(b));
  const pool = priced.length ? priced : list;
  return pool.slice(0, limit);
}
