import { FOOTER } from '../data/footer';
import { buildNavItems } from './nav/buildNavItems';
import { absoluteUrl } from './site';
import {
  buildTagHref,
  countProductsByType,
  getSubTabsWithCounts,
  getTypesByCategory,
} from './types';

/** XML requires & in query strings to be escaped as &amp; */
function escapeXmlUrl(url) {
  return url.replace(/&/g, '&amp;');
}

function createEntry(path, { priority, changeFrequency = 'weekly' }) {
  return {
    url: escapeXmlUrl(absoluteUrl(path)),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

function addEntry(map, path, options) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!map.has(normalized)) {
    map.set(normalized, createEntry(normalized, options));
  }
}

function addTagNavRoutes(map, products, catalog) {
  for (const categoryKey of Object.keys(catalog?.categoryNavMenus ?? {})) {
    const groups = catalog.categoryNavMenus[categoryKey] ?? [];

    for (const group of groups) {
      const subTabs = getSubTabsWithCounts(products, catalog, categoryKey, group.key);
      if (!subTabs.length) continue;

      addEntry(map, buildTagHref(categoryKey, { group: group.key }), {
        priority: 0.75,
        changeFrequency: 'weekly',
      });

      for (const tab of subTabs) {
        addEntry(
          map,
          buildTagHref(categoryKey, { group: group.key, type: tab.slug }),
          { priority: 0.7, changeFrequency: 'weekly' },
        );
      }
    }
  }
}

function addFlatTagRoutes(map, products, catalog) {
  for (const categoryKey of Object.keys(catalog?.categories ?? {})) {
    if (Object.prototype.hasOwnProperty.call(catalog?.categoryNavMenus ?? {}, categoryKey)) {
      continue;
    }

    const types = getTypesByCategory(catalog, categoryKey).filter(
      (type) => countProductsByType(products, type.slug) > 0,
    );

    for (const type of types) {
      addEntry(map, buildTagHref(categoryKey, { type: type.slug }), {
        priority: 0.7,
        changeFrequency: 'weekly',
      });
    }
  }
}

/** Canonical URL set for sitemap.xml — excludes /search and legacy /tag/[slug] redirects. */
export function getSitemapEntries(products, productSlugs, catalog, articleSlugs = []) {
  const map = new Map();

  addEntry(map, '/', { priority: 1, changeFrequency: 'daily' });

  for (const item of buildNavItems(catalog)) {
    const changeFrequency = item.path === '/kien-thuc' ? 'weekly' : 'weekly';
    const priority = item.categoryKey ? 0.9 : item.path === '/khuyen-mai' ? 0.8 : 0.65;
    addEntry(map, item.path, { priority, changeFrequency });
  }

  for (const category of Object.values(catalog?.categories ?? {})) {
    addEntry(map, category.path, { priority: 0.85, changeFrequency: 'weekly' });
  }

  addTagNavRoutes(map, products, catalog);
  addFlatTagRoutes(map, products, catalog);

  for (const slug of productSlugs) {
    addEntry(map, `/product/${slug}`, { priority: 0.8, changeFrequency: 'weekly' });
  }

  for (const slug of articleSlugs) {
    addEntry(map, `/kien-thuc/${slug}`, { priority: 0.6, changeFrequency: 'monthly' });
  }

  for (const policy of FOOTER.policies) {
    addEntry(map, policy.href, { priority: 0.4, changeFrequency: 'yearly' });
  }

  return [...map.values()];
}
