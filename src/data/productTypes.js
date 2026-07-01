/** Loại sản phẩm (sub-tab) — label theo file docx khách */
export const PRODUCT_TYPES = {
  // Rượu vang — sub-tab theo xuất xứ
  'ruou-vang-phap': {
    key: 'ruou-vang-phap',
    slug: 'ruou-vang-phap',
    label: 'Rượu Vang Pháp',
    category: 'ruou-vang',
    group: 'ruou-vang',
  },
  'ruou-vang-y': {
    key: 'ruou-vang-y',
    slug: 'ruou-vang-y',
    label: 'Rượu Vang Ý',
    category: 'ruou-vang',
    group: 'ruou-vang',
  },
  'ruou-vang-uc': {
    key: 'ruou-vang-uc',
    slug: 'ruou-vang-uc',
    label: 'Rượu Vang Úc',
    category: 'ruou-vang',
    group: 'ruou-vang',
  },
  // Hộp quà bia — tab Quà Tết
  chimay: {
    key: 'chimay',
    slug: 'chimay',
    label: 'Bia Chimay',
    category: 'qua-tet',
    group: 'hop-qua-bia',
  },
  duvel: {
    key: 'duvel',
    slug: 'duvel',
    label: 'Bia Duvel',
    category: 'qua-tet',
    group: 'hop-qua-bia',
  },
  // Bia Đức — thương hiệu theo doc / menu khách
  eibauer: {
    key: 'eibauer',
    slug: 'eibauer',
    label: 'Bia Eibauer',
    category: 'bia',
    group: 'bia-duc',
  },
  feldschloesschen: {
    key: 'feldschloesschen',
    slug: 'feldschloesschen',
    label: 'Bia Feldschloesschen',
    category: 'bia',
    group: 'bia-duc',
  },
  kaiserdom: {
    key: 'kaiserdom',
    slug: 'kaiserdom',
    label: 'Bia Kaiserdom',
    category: 'bia',
    group: 'bia-duc',
  },
  paulaner: {
    key: 'paulaner',
    slug: 'paulaner',
    label: 'Bia Paulaner',
    category: 'bia',
    group: 'bia-duc',
  },
  weihenstephaner: {
    key: 'weihenstephaner',
    slug: 'weihenstephaner',
    label: 'Bia Weihenstephaner',
    category: 'bia',
    group: 'bia-duc',
  },
  dinkelacker: {
    key: 'dinkelacker',
    slug: 'dinkelacker',
    label: 'Bia Dinkelacker',
    category: 'bia',
    group: 'bia-duc',
  },
  paderborner: {
    key: 'paderborner',
    slug: 'paderborner',
    label: 'Bia Paderborner',
    category: 'bia',
    group: 'bia-duc',
  },
  hofbrau: {
    key: 'hofbrau',
    slug: 'hofbrau',
    label: 'Bia Hofbrau',
    category: 'bia',
    group: 'bia-duc',
  },
  'schwaben-brau': {
    key: 'schwaben-brau',
    slug: 'schwaben-brau',
    label: 'Bia Schwaben Bräu',
    category: 'bia',
    group: 'bia-duc',
  },
  arcobrau: {
    key: 'arcobrau',
    slug: 'arcobrau',
    label: 'Bia Arcobräu',
    category: 'bia',
    group: 'bia-duc',
  },
  warsteiner: {
    key: 'warsteiner',
    slug: 'warsteiner',
    label: 'Bia Warsteiner',
    category: 'bia',
    group: 'bia-duc',
  },
  schorsch: {
    key: 'schorsch',
    slug: 'schorsch',
    label: 'Bia Schorsch',
    category: 'bia',
    group: 'bia-duc',
  },
  bitburger: {
    key: 'bitburger',
    slug: 'bitburger',
    label: 'Bia Bitburger',
    category: 'bia',
    group: 'bia-duc',
  },
  sanwald: {
    key: 'sanwald',
    slug: 'sanwald',
    label: 'Bia Sanwald',
    category: 'bia',
    group: 'bia-duc',
  },
  // Bia Mexico
  'coronita-extra': {
    key: 'coronita-extra',
    slug: 'coronita-extra',
    label: 'Bia Coronita Extra',
    category: 'bia',
    group: 'bia-mexico',
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
