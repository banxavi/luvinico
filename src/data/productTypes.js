/** Loại sản phẩm (tag) — gắn với danh mục */
export const PRODUCT_TYPES = {
  'vang-do': {
    key: 'vang-do',
    slug: 'vang-do',
    label: 'Vang đỏ',
    category: 'ruou-vang',
  },
  'vang-trang': {
    key: 'vang-trang',
    slug: 'vang-trang',
    label: 'Vang trắng',
    category: 'ruou-vang',
  },
  sparkling: {
    key: 'sparkling',
    slug: 'sparkling',
    label: 'Sparkling',
    category: 'ruou-vang',
  },
  lager: {
    key: 'lager',
    slug: 'lager',
    label: 'Lager',
    category: 'bia',
  },
  ipa: {
    key: 'ipa',
    slug: 'ipa',
    label: 'IPA',
    category: 'bia',
  },
  stout: {
    key: 'stout',
    slug: 'stout',
    label: 'Stout',
    category: 'bia',
  },
  'wheat-beer': {
    key: 'wheat-beer',
    slug: 'wheat-beer',
    label: 'Wheat Beer',
    category: 'bia',
  },
  'belgian-ale': {
    key: 'belgian-ale',
    slug: 'belgian-ale',
    label: 'Belgian Ale',
    category: 'bia',
  },
  trappist: {
    key: 'trappist',
    slug: 'trappist',
    label: 'Trappist',
    category: 'bia',
  },
  'pale-ale': {
    key: 'pale-ale',
    slug: 'pale-ale',
    label: 'Pale Ale',
    category: 'bia',
  },
  pilsner: {
    key: 'pilsner',
    slug: 'pilsner',
    label: 'Pilsner',
    category: 'bia',
  },
  whisky: {
    key: 'whisky',
    slug: 'whisky',
    label: 'Whisky',
    category: 'ruou-manh',
  },
  cognac: {
    key: 'cognac',
    slug: 'cognac',
    label: 'Cognac',
    category: 'ruou-manh',
  },
  rum: {
    key: 'rum',
    slug: 'rum',
    label: 'Rum',
    category: 'ruou-manh',
  },
  'set-qua-tet': {
    key: 'set-qua-tet',
    slug: 'set-qua-tet',
    label: 'Set quà Tết',
    category: 'qua-tet',
  },
  'hop-qua': {
    key: 'hop-qua',
    slug: 'hop-qua',
    label: 'Hộp quà',
    category: 'qua-tet',
  },
  'ly-thuy-tinh': {
    key: 'ly-thuy-tinh',
    slug: 'ly-thuy-tinh',
    label: 'Ly thủy tinh',
    category: 'phu-kien',
  },
  decanter: {
    key: 'decanter',
    slug: 'decanter',
    label: 'Decanter',
    category: 'phu-kien',
  },
};

export function getTypePath(typeSlug) {
  return `/tag/${typeSlug}`;
}

export function getTypesByCategory(categoryKey) {
  return Object.values(PRODUCT_TYPES).filter((type) => type.category === categoryKey);
}

export function getTypeMeta(typeSlug) {
  return PRODUCT_TYPES[typeSlug] ?? null;
}

export function getAllTypeSlugs() {
  return Object.keys(PRODUCT_TYPES);
}