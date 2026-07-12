import { CATEGORIES } from '../data/categories';
import { FOOTER } from '../data/footer';
import { NAV_ITEMS } from '../data/nav';
import { CATEGORY_NAV_MENUS } from '../data/navMenu';
import { getTypesByCategory } from '../data/productTypes';
import { getAllArticleSlugs } from './articles';
import { getAllProductSlugs } from './products';
import { absoluteUrl } from './site';
import { buildTagHref, countProductsByType, getSubTabsWithCounts } from './types';

function createEntry(path, { priority, changeFrequency = 'weekly' }) {
  return {
    url: absoluteUrl(path),
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

function addTagNavRoutes(map) {
  for (const categoryKey of Object.keys(CATEGORY_NAV_MENUS)) {
    const groups = CATEGORY_NAV_MENUS[categoryKey] ?? [];

    for (const group of groups) {
      const subTabs = getSubTabsWithCounts(categoryKey, group.key);
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

function addFlatTagRoutes(map) {
  for (const categoryKey of Object.keys(CATEGORIES)) {
    // Có cấu hình menu riêng (kể cả [] = không sub-tab) → không tạo tag phẳng
    if (Object.prototype.hasOwnProperty.call(CATEGORY_NAV_MENUS, categoryKey)) continue;

    const types = getTypesByCategory(categoryKey).filter(
      (type) => countProductsByType(type.slug) > 0,
    );

    for (const type of types) {
      addEntry(map, buildTagHref(categoryKey, { type: type.slug }), {
        priority: 0.7,
        changeFrequency: 'weekly',
      });
    }
  }
}

/** Tập URL canonical cho sitemap.xml — loại trừ /search và redirect cũ /tag/[slug] */
export function getSitemapEntries() {
  const map = new Map();

  addEntry(map, '/', { priority: 1, changeFrequency: 'daily' });

  for (const item of NAV_ITEMS) {
    const changeFrequency = item.path === '/kien-thuc' ? 'weekly' : 'weekly';
    const priority = item.categoryKey ? 0.9 : item.path === '/khuyen-mai' ? 0.8 : 0.65;
    addEntry(map, item.path, { priority, changeFrequency });
  }

  for (const category of Object.values(CATEGORIES)) {
    addEntry(map, category.path, { priority: 0.85, changeFrequency: 'weekly' });
  }

  addTagNavRoutes(map);
  addFlatTagRoutes(map);

  for (const slug of getAllProductSlugs()) {
    addEntry(map, `/product/${slug}`, { priority: 0.8, changeFrequency: 'weekly' });
  }

  for (const slug of getAllArticleSlugs()) {
    addEntry(map, `/kien-thuc/${slug}`, { priority: 0.6, changeFrequency: 'monthly' });
  }

  for (const policy of FOOTER.policies) {
    addEntry(map, policy.href, { priority: 0.4, changeFrequency: 'yearly' });
  }

  return [...map.values()];
}
