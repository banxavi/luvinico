import { CLIENT_PRODUCT_ASSETS } from './data/clientAssets';

const rawProducts = [
  {
    id: 1,
    name: 'Rượu Vang Chateau Bellevue La Ferriere – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouVang.chateauBellevue.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouVang.chateauBellevue.gallery,
    price: '450.000 đ',
    origin: 'Pháp',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    type: 'ruou-vang-phap',
    abv: '14.5%',
    description:
      'Vang đỏ Bordeaux cổ điển — Merlot và Cabernet, hương trái cây chín, mận, vanilla và gia vị. Chai 750ml.',
  },
  {
    id: 2,
    name: 'Rượu vang Areale Primitivo Di Manduria – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouVang.arealePrimitivo.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouVang.arealePrimitivo.gallery,
    price: '850.000 đ',
    origin: 'Ý',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    type: 'ruou-vang-y',
    abv: '14.5%',
    description:
      'Primitivo DOC Puglia từ Giustini — đậm đà, hương trái cây chín, gỗ sồi và chocolate. Chai 750ml, sản lượng giới hạn.',
  },
  {
    id: 3,
    name: 'Hộp quà 2 chai bia Chimay – 750ml',
    image: CLIENT_PRODUCT_ASSETS.biaBi.chimay.card,
    gallery: CLIENT_PRODUCT_ASSETS.biaBi.chimay.gallery,
    price: '750.000 đ',
    origin: 'Bỉ',
    style: 'Trappist Ale',
    category: 'bia',
    type: 'chimay',
    abv: '7–9%',
    description:
      'Hộp quà 2 chai Chimay Trappist Bỉ — Chimay Đỏ (7%) thơm trái cây dịu, Chimay Xanh (9%) đậm đà thảo mộc và gia vị. Quà tặng sang trọng cho Lễ, Tết và đối tác.',
  },
  {
    id: 4,
    name: 'Hộp Quà Bia Duvel – 4 Chai 330ml và 1 Ly',
    image: CLIENT_PRODUCT_ASSETS.biaBi.duvel.card,
    gallery: CLIENT_PRODUCT_ASSETS.biaBi.duvel.gallery,
    price: '450.000 đ',
    origin: 'Bỉ',
    style: 'Belgian Strong Ale',
    category: 'bia',
    type: 'duvel',
    abv: '8.5%',
    description:
      'Bia Duvel Belgian Strong Blond Ale — vàng tươi, hương cam quýt và lê chín, vị mượt êm dù nồng độ 8.5%. Hộp quà 4 chai 330ml kèm ly Tulip.',
  },
  {
    id: 5,
    name: 'Bia Paulaner Weissbier 5.5% – Lon 500ml – Thùng 24 lon',
    image: CLIENT_PRODUCT_ASSETS.biaDuc.paulanerWeissbier.card,
    gallery: CLIENT_PRODUCT_ASSETS.biaDuc.paulanerWeissbier.gallery,
    price: '1.450.000 đ',
    salePrice: '1.250.000 đ',
    origin: 'Đức',
    style: 'Wheat Beer',
    category: 'bia',
    type: 'paulaner',
    abv: '5.5%',
    description:
      'Paulaner Weissbier Hefeweizen Bavaria — vàng đục, bọt dày, hương chuối, xoài và dứa. Thùng 24 lon 500ml, uống lạnh 6–8°C.',
  },
  {
    id: 6,
    name: 'Bia Paulaner Weissbier Dunkel 5.3% – Chai 500ml – Thùng 20 chai',
    image: CLIENT_PRODUCT_ASSETS.biaDuc.paulanerDunkel.card,
    gallery: CLIENT_PRODUCT_ASSETS.biaDuc.paulanerDunkel.gallery,
    price: '1.450.000 đ',
    salePrice: '1.250.000 đ',
    origin: 'Đức',
    style: 'Wheat Beer',
    category: 'bia',
    type: 'paulaner',
    abv: '5.3%',
    description:
      'Paulaner Weissbier Dunkel — màu nâu hạt dẻ, vị caramel và trái cây chín, bọt mịn. Thùng 20 chai 500ml, chuẩn vị bia lúa mì đen Đức.',
  },
  {
    id: 7,
    name: 'Bia Coronita Extra – Chai 210ml – Thùng 24 Chai',
    image: CLIENT_PRODUCT_ASSETS.biaMexico.coronita.card,
    gallery: CLIENT_PRODUCT_ASSETS.biaMexico.coronita.gallery,
    price: '650.000 đ',
    origin: 'Mexico',
    style: 'Lager',
    category: 'bia',
    type: 'coronita-extra',
    abv: '4.6%',
    description:
      'Coronita Extra Mexico — bia vàng nhẹ, trong mát, thường thưởng thức lạnh kèm lát chanh. Thùng 24 chai 210ml.',
  },
  {
    id: 8,
    name: "Rượu Vang Jacob's Creek Classic Shiraz Cabernet – Chai 750ml",
    image: CLIENT_PRODUCT_ASSETS.ruouVang.jacobsCreek.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouVang.jacobsCreek.gallery,
    price: '500.000 đ',
    origin: 'Úc',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    type: 'ruou-vang-uc',
    abv: '13%',
    description:
      "Shiraz và Cabernet Đông Nam Úc — trái cây đậm, gia vị cay, tannin mượt. Màu ruby đậm, dễ uống mọi dịp. Chai 750ml.",
  },
  {
    id: 21,
    name: 'Glenfiddich 12 Năm',
    image:
      'https://images.unsplash.com/photo-1569529465841-dfecdabbb3d2?q=80&w=500&auto=format&fit=max',
    price: '1.250.000 đ',
    origin: 'Scotland',
    style: 'Single Malt Whisky',
    category: 'ruou-manh',
    type: 'whisky',
    abv: '40%',
    description: 'Hương lê và sô cô la sữa — single malt kinh điển từ Speyside.',
  },
  {
    id: 23,
    name: 'Set Quà Tết An Khang',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=max',
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Việt Nam',
    style: 'Set quà',
    category: 'qua-tet',
    type: 'set-qua-tet',
    abv: '12%',
    description: 'Combo rượu vang và bia cao cấp trong hộp quà sang trọng.',
  },
  {
    id: 24,
    name: 'Ly Bordeaux 450ml',
    image:
      'https://images.unsplash.com/photo-1572116469696-31de055eb39e?q=80&w=500&auto=format&fit=max',
    price: '185.000 đ',
    origin: 'Pháp',
    style: 'Ly thủy tinh',
    category: 'phu-kien',
    type: 'ly-thuy-tinh',
    abv: '0%',
    description: 'Ly crystal trong, thân cao — dùng thưởng thức vang đỏ Bordeaux.',
  },
];

function ensureProductCategory(product) {
  if (product.category) return product;
  const style = String(product.style ?? '').toLowerCase();
  return {
    ...product,
    category: style.includes('vang') ? 'ruou-vang' : 'bia',
  };
}

const STYLE_TO_TYPE = {
  'single malt whisky': 'whisky',
  'set quà': 'set-qua-tet',
  'ly thủy tinh': 'ly-thuy-tinh',
};

function ensureProductType(product) {
  if (product.type) return product;
  const style = String(product.style ?? '').toLowerCase().trim();
  let type = STYLE_TO_TYPE[style];
  if (!type && style) {
    const matched = Object.entries(STYLE_TO_TYPE).find(([key]) => style.includes(key));
    type = matched?.[1];
  }
  if (!type) {
    if (product.category === 'ruou-manh') type = 'whisky';
    else if (product.category === 'qua-tet') type = 'set-qua-tet';
    else if (product.category === 'phu-kien') type = 'ly-thuy-tinh';
  }
  return type ? { ...product, type } : product;
}

export const mockProducts = rawProducts.map(ensureProductCategory).map(ensureProductType);

function parsePriceNumber(price) {
  return Number.parseInt(String(price).replace(/\D/g, ''), 10) || 0;
}

/** Giá tốt — dùng cho carousel 1 hàng × 5 (có thể xoay trang) */
export const mockValueProducts = [...mockProducts]
  .sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price))
  .slice(0, 10);
