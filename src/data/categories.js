/** Danh mục sản phẩm — slug khớp route */
export const CATEGORIES = {
  'ruou-vang': {
    key: 'ruou-vang',
    path: '/ruou-vang',
    title: 'Rượu vang',
    eyebrow: 'DANH MỤC',
    description:
      'Rượu vang nhập khẩu tuyển chọn — từ vang đỏ đậm vị đến vang trắng thanh mát và sparkling cho mọi dịp.',
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
    description: 'Bia craft và lager nhập khẩu chính hãng từ châu Âu, Mỹ và châu Á.',
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
