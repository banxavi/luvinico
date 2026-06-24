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
    path: '/bia-khuyen-mai',
    title: 'Bia khuyến mãi',
    eyebrow: 'DANH MỤC',
    description:
      'Các sản phẩm bia khuyến mãi được chọn lọc kỹ càng, đảm bảo chất lượng hảo hạng, hương vị nguyên vẹn. Quý khách hàng có thể yên tâm thưởng thức những dòng bia tuyệt vời với giá ưu đãi nhất.\n\nFirst Beer – Bia Nhập Khẩu Giá Sỉ luôn luôn cập nhật các loại bia khuyến mãi với số lượng và giá thành hấp dẫn bất ngờ. Hãy luôn đồng hành cùng chúng tôi để không bỏ lỡ các cơ hội trải nghiệm những thương hiệu bia hàng đầu trên thế giới.',
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
