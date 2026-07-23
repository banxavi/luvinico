/** Build frontend catalog shape from unified Sanity category documents */

function readSlug(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.current ?? '';
}

function mapSubTab(tab) {
  const slug = readSlug(tab?.slug);
  if (!slug) return null;
  return {
    slug,
    label: tab.name ?? slug,
  };
}

export function mapCategoryDoc(doc) {
  const key = readSlug(doc.slug) || doc.key;
  if (!key) return null;

  const navGroups = (doc.dropdownMenus ?? doc.navGroups ?? [])
    .map((menu) => {
      const menuKey = readSlug(menu.slug) || menu.key;
      if (!menuKey) return null;

      const subTabs = (menu.subTabs ?? [])
        .map((tab) => {
          if (tab?.slug && typeof tab.slug === 'object') {
            return mapSubTab(tab);
          }
          if (tab?.slug) {
            return { slug: tab.slug, label: tab.label ?? tab.name ?? tab.slug };
          }
          return null;
        })
        .filter(Boolean);

      if (!subTabs.length) return null;

      return {
        key: menuKey,
        label: menu.name ?? menu.label ?? null,
        showEmptySubTabs: Boolean(menu.showEmptySubTabs),
        subTabs,
      };
    })
    .filter(Boolean);

  const standardSubTabs = (doc.standardMenus ?? [])
    .map((menu) => mapSubTab(menu))
    .filter(Boolean);

  if (standardSubTabs.length) {
    navGroups.push({
      key: `${key}__standard`,
      label: null,
      showEmptySubTabs: true,
      flat: true,
      subTabs: standardSubTabs,
    });
  }

  return {
    key,
    path: `/${key}`,
    title: doc.title,
    eyebrow: doc.eyebrow ?? 'DANH MỤC',
    description: doc.description ?? '',
    showInNav: doc.showInNav !== false,
    navOrder: typeof doc.navOrder === 'number' ? doc.navOrder : undefined,
    navGroups,
    dropdownMenus: (doc.dropdownMenus ?? []).map((menu) => ({
      slug: readSlug(menu.slug),
      name: menu.name,
      subTabs: (menu.subTabs ?? []).map((tab) => ({
        slug: readSlug(tab.slug),
        name: tab.name,
      })),
    })),
    standardMenus: (doc.standardMenus ?? []).map((menu) => ({
      slug: readSlug(menu.slug),
      name: menu.name,
    })),
  };
}

function collectProductTypesFromCategory(category) {
  if (!category?.key) return [];

  const types = [];
  let sortOrder = 0;

  for (const menu of category.dropdownMenus ?? []) {
    const groupKey = readSlug(menu.slug) || menu.key;
    for (const tab of menu.subTabs ?? []) {
      const slug = readSlug(tab.slug) || tab.slug;
      if (!slug) continue;
      types.push({
        key: slug,
        slug,
        label: tab.name ?? tab.label ?? slug,
        category: category.key,
        group: groupKey || undefined,
        sortOrder: sortOrder++,
      });
    }
  }

  for (const menu of category.standardMenus ?? []) {
    const slug = readSlug(menu.slug) || menu.slug;
    if (!slug) continue;
    types.push({
      key: slug,
      slug,
      label: menu.name ?? menu.label ?? slug,
      category: category.key,
      group: undefined,
      sortOrder: sortOrder++,
    });
  }

  // Legacy navGroups with resolved productType refs (during migration window)
  for (const group of category.navGroups ?? []) {
    for (const tab of group.subTabs ?? []) {
      const slug = tab.slug;
      if (!slug) continue;
      if (types.some((type) => type.slug === slug)) continue;
      types.push({
        key: slug,
        slug,
        label: tab.label ?? tab.name ?? slug,
        category: category.key,
        group: group.key || undefined,
        sortOrder: sortOrder++,
      });
    }
  }

  return types;
}

/** @param {ReturnType<typeof mapCategoryDoc>[]} categories */
export function buildCatalogFromDocs(categories) {
  const categoriesRecord = {};
  const categoryNavMenus = {};
  const productTypesRecord = {};

  for (const cat of categories) {
    if (!cat) continue;

    categoriesRecord[cat.key] = {
      key: cat.key,
      path: cat.path,
      title: cat.title,
      eyebrow: cat.eyebrow,
      description: cat.description,
      showInNav: cat.showInNav,
      navOrder: cat.navOrder,
    };
    categoryNavMenus[cat.key] = cat.navGroups ?? [];

    for (const type of collectProductTypesFromCategory(cat)) {
      productTypesRecord[type.slug] = type;
    }
  }

  return {
    categories: categoriesRecord,
    categoryNavMenus,
    productTypes: productTypesRecord,
  };
}

/** @deprecated productType documents removed — types live on category */
export function mapProductTypeDoc(doc) {
  if (!doc?.slug) return null;
  const slug = readSlug(doc.slug);
  return {
    key: slug,
    slug,
    label: doc.label ?? slug,
    category: doc.categoryKey,
    group: doc.groupKey ?? undefined,
    sortOrder: doc.sortOrder ?? 0,
  };
}
