import {
  NAV_ITEMS_FALLBACK,
  STATIC_NAV_LEADING,
  STATIC_NAV_TRAILING,
} from '../../data/nav';

const DEFAULT_NAV_ORDER = {
  'ruou-vang': 1,
  'ruou-manh': 2,
  bia: 3,
  'qua-tet': 4,
  'phu-kien': 5,
};

function resolveNavOrder(category) {
  if (typeof category.navOrder === 'number') return category.navOrder;
  return DEFAULT_NAV_ORDER[category.key] ?? 999;
}

/** Build header nav from Sanity catalog + static pages (Khuyến mãi, Kiến thức). */
export function buildNavItems(catalog) {
  const categories = Object.values(catalog?.categories ?? {});
  if (!categories.length) return NAV_ITEMS_FALLBACK;

  const categoryItems = categories
    .filter((category) => category.showInNav !== false)
    .sort(
      (a, b) =>
        resolveNavOrder(a) - resolveNavOrder(b) ||
        a.title.localeCompare(b.title, 'vi'),
    )
    .map((category) => ({
      path: category.path ?? `/${category.key}`,
      label: category.title || category.key,
      categoryKey: category.key,
    }));

  return [...STATIC_NAV_LEADING, ...categoryItems, ...STATIC_NAV_TRAILING];
}
