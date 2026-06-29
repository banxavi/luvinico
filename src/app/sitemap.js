import { CATEGORIES } from '../data/categories';
import { FOOTER } from '../data/footer';
import { getAllArticleSlugs } from '../lib/articles';
import { getAllProductSlugs } from '../lib/products';
import { getAllTypeSlugs } from '../data/productTypes';
import { getSiteUrl } from '../lib/site';

export default function sitemap() {
  const baseUrl = getSiteUrl().replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = ['', '/kien-thuc', '/khuyen-mai', '/search', '/tag'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const categoryRoutes = Object.keys(CATEGORIES).map((key) => ({
    url: `${baseUrl}/${key}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const tagRoutes = getAllTypeSlugs().map((slug) => ({
    url: `${baseUrl}/tag/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const productRoutes = getAllProductSlugs().map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const articleRoutes = getAllArticleSlugs().map((slug) => ({
    url: `${baseUrl}/kien-thuc/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const policyRoutes = FOOTER.policies.map((policy) => ({
    url: `${baseUrl}${policy.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...productRoutes,
    ...articleRoutes,
    ...policyRoutes,
  ];
}
