/** Danh mục sản phẩm — slug khớp route */
export const CATEGORIES = {
  'ruou-vang': {
    key: 'ruou-vang',
    path: '/ruou-vang',
    title: 'Rượu vang',
    eyebrow: 'DANH MỤC',
    description:
      'Rượu vang nhập khẩu chính hãng — Pháp (Chateau Bellevue, Le Pacha Les Eyraux), Ý (Primitivo Puglia) và Úc (Shiraz Cabernet), tuyển chọn cho mọi dịp thưởng thức.',
  },
  'ruou-manh': {
    key: 'ruou-manh',
    path: '/ruou-manh',
    title: 'Rượu mạnh',
    eyebrow: 'DANH MỤC',
    description:
      'Cognac và whisky nhập khẩu cao cấp — Remy Martin XO 300th Anniversary, Frapin XO Cigar Blend và Loch Lomond 12 Years Old.',
  },
  bia: {
    key: 'bia',
    path: '/bia',
    title: 'Bia nhập khẩu',
    eyebrow: 'DANH MỤC',
    description:
      'Bia nhập khẩu chính hãng — Đức (Paulaner) và Mexico (Coronita Extra), tuyển chọn cho mọi khẩu vị.',
  },
  'qua-tet': {
    key: 'qua-tet',
    path: '/qua-tet',
    title: 'Quà Tết',
    eyebrow: 'DANH MỤC',
    description: 'Hộp Quà Tết và Giỏ Quà Tết — set quà rượu vang & bia cao cấp theo ngân sách.',
  },
  'phu-kien': {
    key: 'phu-kien',
    path: '/phu-kien',
    title: 'Phụ kiện',
    eyebrow: 'DANH MỤC',
    description: 'Ly rượu vang và khui rượu — phụ kiện thưởng thức từ Bohemia và các thương hiệu cao cấp.',
  },
};

export const CATEGORY_BY_PATH = Object.fromEntries(
  Object.values(CATEGORIES).map((c) => [c.path, c]),
);
