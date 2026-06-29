/** Danh mục sản phẩm — slug khớp route */
export const CATEGORIES = {
  'ruou-vang': {
    key: 'ruou-vang',
    path: '/ruou-vang',
    title: 'Rượu vang',
    eyebrow: 'DANH MỤC',
    description:
      'Rượu vang nhập khẩu chính hãng — Pháp (Bordeaux), Ý (Primitivo Puglia) và Úc (Shiraz Cabernet), tuyển chọn cho mọi dịp thưởng thức.',
  },
  'ruou-manh': {
    key: 'ruou-manh',
    path: '/ruou-manh',
    title: 'Rượu mạnh',
    eyebrow: 'DANH MỤC',
    description: 'Whisky, cognac, rượu mạnh và spirit cao cấp — chờ bổ sung catalog từ khách hàng.',
  },
  bia: {
    key: 'bia',
    path: '/bia',
    title: 'Bia nhập khẩu',
    eyebrow: 'DANH MỤC',
    description:
      'Bia nhập khẩu chính hãng — Bỉ (Chimay, Duvel), Đức (Paulaner) và Mexico (Coronita Extra), tuyển chọn cho mọi khẩu vị.',
  },
  'ruou-soju': {
    key: 'ruou-soju',
    path: '/ruou-soju',
    title: 'Rượu soju',
    eyebrow: 'DANH MỤC',
    description: 'Rượu soju Hàn Quốc và châu Á — thanh mát, dễ uống, phù hợp ăn uống cùng bạn bè.',
  },
  'do-uong-trai-cay': {
    key: 'do-uong-trai-cay',
    path: '/do-uong-trai-cay',
    title: 'Đồ uống trái cây',
    eyebrow: 'DANH MỤC',
    description: 'Đồ uống trái cây và cocktail không cồn — nhẹ nhàng, tươi mát cho mọi dịp.',
  },
  'qua-tet': {
    key: 'qua-tet',
    path: '/qua-tet',
    title: 'Quà Tết',
    eyebrow: 'DANH MỤC',
    description: 'Set quà Tết rượu vang & bia cao cấp — hộp quà và combo theo ngân sách.',
  },
  'phu-kien': {
    key: 'phu-kien',
    path: '/phu-kien',
    title: 'Phụ kiện',
    eyebrow: 'DANH MỤC',
    description: 'Ly, decanter, opener và phụ kiện thưởng thức — sắp cập nhật.',
  },
};

export const CATEGORY_BY_PATH = Object.fromEntries(
  Object.values(CATEGORIES).map((c) => [c.path, c]),
);
