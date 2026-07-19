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
    id: 26,
    name: 'Rượu Vang Pháp Le Pacha Les Eyraux – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouVang.lePachaLesEyraux.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouVang.lePachaLesEyraux.gallery,
    price: '725.000 đ',
    origin: 'Pháp',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    type: 'ruou-vang-phap',
    abv: '14.5%',
    description:
      'Le Pacha Les Eyraux Bordeaux Supérieur 2019 — Merlot và Cabernet Sauvignon, hương quả mọng đen, tannin mượt. Lý tưởng với thịt đỏ nướng và bò hầm. Chai 750ml.',
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
    category: 'qua-tet',
    type: 'hop-qua-tet',
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
    category: 'qua-tet',
    type: 'hop-qua-tet',
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
    name: 'Rượu Remy Martin XO 300 Anniversary – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouManh.remyMartinXo300.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouManh.remyMartinXo300.gallery,
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Pháp',
    style: 'Cognac',
    category: 'ruou-manh',
    type: 'cognac',
    abv: '40%',
    description:
      'Remy Martin XO 300th Anniversary — phiên bản giới hạn kỷ niệm 3 thế kỷ (1724–2024). Eaux-de-vie tinh túy, hương trái cây chín, cam quýt, gia vị và gỗ sồi; cổ chai khắc vàng kèm hộp quà sang trọng. Chai 750ml.',
  },
  {
    id: 22,
    name: 'Rượu Cognac Frapin XO Cigar Blend Premier Grand Cru – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouManh.frapinXoCigar.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouManh.frapinXoCigar.gallery,
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Pháp',
    style: 'Cognac',
    category: 'ruou-manh',
    type: 'cognac',
    abv: '40%',
    description:
      'Frapin XO Cigar Blend Premier Grand Cru từ Grande Champagne — Cognac mượt, đậm đà hương trái cây sấy, vani, quả phỉ và gỗ sồi, thiết kế để thưởng thức cùng xì gà. Chai 750ml.',
  },
  {
    id: 25,
    name: 'Rượu Loch Lomond 12 Years Old Single Malt Whisky – Chai 750ml',
    image: CLIENT_PRODUCT_ASSETS.ruouManh.lochLomond12.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouManh.lochLomond12.gallery,
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Scotland',
    style: 'Single Malt Whisky',
    category: 'ruou-manh',
    type: 'whisky',
    abv: '46%',
    description:
      'Loch Lomond 12 Years Old Single Malt Scotch Whisky Highland — ủ 3 loại thùng gỗ sồi Mỹ, không lọc lạnh. Hương đào, lê, vani và chút khói nhẹ. Chai 750ml.',
  },
  {
    id: 24,
    name: 'Ly uống rượu vang trắng Colibri – 6 cái/hộp',
    image: CLIENT_PRODUCT_ASSETS.phuKien.colibriWhiteWineGlass.card,
    gallery: CLIENT_PRODUCT_ASSETS.phuKien.colibriWhiteWineGlass.gallery,
    price: '900.000 đ',
    origin: 'Cộng hòa Séc',
    style: 'Ly rượu vang',
    category: 'phu-kien',
    type: 'ly-ruou-vang',
    abv: '0%',
    description:
      'Ly pha lê Colibri 350ml từ Bohemia — dáng tulip, vành miệng thuôn, chân cao. Giữ hương thơm, lý tưởng cho vang trắng và sâm panh. Hộp 6 cái, không chứa chì.',
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
  'set quà': 'hop-qua-tet',
  'hộp quà': 'hop-qua-tet',
  'giỏ quà': 'gio-qua-tet',
  'ly thủy tinh': 'ly-ruou-vang',
  'ly rượu vang': 'ly-ruou-vang',
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
    else if (product.category === 'qua-tet') type = 'hop-qua-tet';
    else if (product.category === 'phu-kien') type = 'ly-ruou-vang';
  }
  return type ? { ...product, type } : product;
}

export const mockProducts = rawProducts.map(ensureProductCategory).map(ensureProductType);

function parsePriceNumber(price) {
  return Number.parseInt(String(price).replace(/\D/g, ''), 10) || 0;
}

/** Giá tốt — chỉ rượu vang & bia, carousel 1 hàng × 5 */
export const mockValueProducts = [...mockProducts]
  .filter((p) => p.category === 'ruou-vang' || p.category === 'bia')
  .sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price))
  .slice(0, 10);
