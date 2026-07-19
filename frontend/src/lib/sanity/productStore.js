import { cache } from 'react';

import { slugify } from '../products';

import {

  isSanityConfigured,

  sanityClient,

  SANITY_REVALIDATE_SECONDS,

} from './client';

import {
  ALL_PRODUCTS_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
  ON_SALE_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from './queries';
import { mapSanityProduct } from './mapProduct';
import { getOnSaleProducts, getSaleDiscountPercent } from '../pricing';



const fetchOptions = {

  next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ['products'] },

};



async function fetchSanityProducts() {

  const docs = await sanityClient.fetch(ALL_PRODUCTS_QUERY, {}, fetchOptions);

  if (!Array.isArray(docs)) return [];

  return docs.map(mapSanityProduct).filter(Boolean);

}



async function fetchSanityProductBySlug(slug) {

  const doc = await sanityClient.fetch(

    PRODUCT_BY_SLUG_QUERY,

    { slug },

    fetchOptions,

  );

  return mapSanityProduct(doc);

}



/** Request-scoped cache — one Sanity fetch per page render. */

export const getProducts = cache(async () => {
  if (!isSanityConfigured()) return [];

  try {
    return await fetchSanityProducts();
  } catch (error) {
    console.error('[sanity] fetchAllProducts failed', error);
    return [];
  }
});

/** Products on promotion — salePrice set in Sanity and lower than list price. */
export const getOnSaleProductsFromStore = cache(async () => {
  if (!isSanityConfigured()) return [];

  try {
    const docs = await sanityClient.fetch(ON_SALE_PRODUCTS_QUERY, {}, fetchOptions);
    if (!Array.isArray(docs)) return [];

    const products = docs.map(mapSanityProduct).filter(Boolean);
    return getOnSaleProducts(products).sort(
      (a, b) => (getSaleDiscountPercent(b) ?? 0) - (getSaleDiscountPercent(a) ?? 0),
    );
  } catch (error) {
    console.error('[sanity] fetchOnSaleProducts failed', error);
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

      console.error('[sanity] fetchProductBySlug failed', error);

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

      const slugs = await sanityClient.fetch(

        ALL_PRODUCT_SLUGS_QUERY,

        {},

        fetchOptions,

      );

      if (Array.isArray(slugs) && slugs.length > 0) {

        return slugs.filter(Boolean);

      }

    } catch (error) {

      console.error('[sanity] fetchProductSlugs failed', error);

    }

  }



  const products = await getProducts();

  return products.map((product) => product.slug).filter(Boolean);

}



export function getValueDealProducts(products) {

  return [...products]

    .filter((product) => product.category === 'ruou-vang' || product.category === 'bia')

    .sort((a, b) => {

      const priceA = parseInt(String(a.price ?? '').replace(/[^\d]/g, ''), 10) || 0;

      const priceB = parseInt(String(b.price ?? '').replace(/[^\d]/g, ''), 10) || 0;

      return priceA - priceB;

    })

    .slice(0, 8);

}



export function getBestSellerProducts(products) {

  const wineAndBeer = new Set(['ruou-vang', 'bia']);

  return products.filter((product) => wineAndBeer.has(product.category));

}


