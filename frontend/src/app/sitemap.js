import { getAllArticleSlugs } from '../lib/sanity/articleStore';
import { getCatalog } from '../lib/sanity/catalogStore';
import {
  getAllProductSlugsFromStore,
  getProducts,
} from '../lib/sanity/productStore';
import { getSitemapEntries } from '../lib/sitemapRoutes';
import { SITEMAP_REVALIDATE_SECONDS } from '../lib/revalidate';

export const revalidate = SITEMAP_REVALIDATE_SECONDS;

export default async function sitemap() {
  const [products, productSlugs, catalog, articleSlugs] = await Promise.all([
    getProducts(),
    getAllProductSlugsFromStore(),
    getCatalog(),
    getAllArticleSlugs(),
  ]);

  return getSitemapEntries(products, productSlugs, catalog, articleSlugs);
}
