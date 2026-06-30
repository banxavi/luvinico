/** Loại sản phẩm (sub-menu / tag) — label theo dòng 3 trong file docx khách */
export const PRODUCT_TYPES = {
  // Rượu vang — sub-tab theo xuất xứ (dòng 3: Ruou Vang Pháp, Ý, Úc...)
  'ruou-vang-phap': {
    key: 'ruou-vang-phap',
    slug: 'ruou-vang-phap',
    label: 'Rượu Vang Pháp',
    category: 'ruou-vang',
  },
  'ruou-vang-y': {
    key: 'ruou-vang-y',
    slug: 'ruou-vang-y',
    label: 'Rượu Vang Ý',
    category: 'ruou-vang',
  },
  'ruou-vang-uc': {
    key: 'ruou-vang-uc',
    slug: 'ruou-vang-uc',
    label: 'Rượu Vang Úc',
    category: 'ruou-vang',
  },
  // Bia — sub-tab theo thương hiệu (dòng 3: Bia Chimay, Paulaner, Coronita Extra...)
  chimay: {
    key: 'chimay',
    slug: 'chimay',
    label: 'Bia Chimay',
    category: 'bia',
  },
  duvel: {
    key: 'duvel',
    slug: 'duvel',
    label: 'Bia Duvel',
    category: 'bia',
  },
  paulaner: {
    key: 'paulaner',
    slug: 'paulaner',
    label: 'Bia Paulaner',
    category: 'bia',
  },
  'coronita-extra': {
    key: 'coronita-extra',
    slug: 'coronita-extra',
    label: 'Bia Coronita Extra',
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
