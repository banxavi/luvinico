import { getAllArticleSlugs } from '../lib/sanity/articleStore';
import { getCatalog } from '../lib/sanity/catalogStore';
import {
  getAllProductSlugsFromStore,
  getProducts,
} from '../lib/sanity/productStore';
import { getSitemapEntries } from '../lib/sitemapRoutes';
export const revalidate = 3600;

export default async function sitemap() {
  const [products, productSlugs, catalog, articleSlugs] = await Promise.all([
    getProducts(),
    getAllProductSlugsFromStore(),
    getCatalog(),
    getAllArticleSlugs(),
  ]);

  return getSitemapEntries(products, productSlugs, catalog, articleSlugs);
}
