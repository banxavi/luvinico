/** Source data for nav-menu migration — paths relative to frontend/src/assets */

export const CATEGORIES = [
  {
    key: 'ruou-vang',
    title: 'Rượu vang',
    eyebrow: 'DANH MỤC',
    description:
      'Rượu vang nhập khẩu chính hãng — Pháp (Chateau Bellevue, Le Pacha Les Eyraux), Ý (Primitivo Puglia) và Úc (Shiraz Cabernet), tuyển chọn cho mọi dịp thưởng thức.',
  },
  {
    key: 'ruou-manh',
    title: 'Rượu mạnh',
    eyebrow: 'DANH MỤC',
    description:
      'Cognac và whisky nhập khẩu cao cấp — Remy Martin XO 300th Anniversary, Frapin XO Cigar Blend và Loch Lomond 12 Years Old.',
  },
  {
    key: 'bia',
    title: 'Bia nhập khẩu',
    eyebrow: 'DANH MỤC',
    description:
      'Bia nhập khẩu chính hãng — Đức (Paulaner) và Mexico (Coronita Extra), tuyển chọn cho mọi khẩu vị.',
  },
  {
    key: 'qua-tet',
    title: 'Quà Tết',
    eyebrow: 'DANH MỤC',
    description:
      'Hộp Quà Tết và Giỏ Quà Tết — set quà rượu vang & bia cao cấp theo ngân sách.',
  },
  {
    key: 'phu-kien',
    title: 'Phụ kiện',
    eyebrow: 'DANH MỤC',
    description:
      'Ly rượu vang và khui rượu — phụ kiện thưởng thức từ Bohemia và các thương hiệu cao cấp.',
  },
]

/** Only types that have products in mockData */
export const PRODUCT_TYPES = [
  {slug: 'ruou-vang-phap', label: 'Rượu Vang Pháp', categoryKey: 'ruou-vang', groupKey: 'ruou-vang', sortOrder: 1},
  {slug: 'ruou-vang-y', label: 'Rượu Vang Ý', categoryKey: 'ruou-vang', groupKey: 'ruou-vang', sortOrder: 2},
  {slug: 'ruou-vang-uc', label: 'Rượu Vang Úc', categoryKey: 'ruou-vang', groupKey: 'ruou-vang', sortOrder: 3},
  {slug: 'hop-qua-tet', label: 'Hộp Quà Tết', categoryKey: 'qua-tet', groupKey: 'qua-tet', sortOrder: 1},
  {slug: 'paulaner', label: 'Bia Paulaner', categoryKey: 'bia', groupKey: 'bia-duc', sortOrder: 1},
  {slug: 'coronita-extra', label: 'Bia Coronita Extra', categoryKey: 'bia', groupKey: 'bia-mexico', sortOrder: 1},
  {slug: 'cognac', label: 'Cognac', categoryKey: 'ruou-manh', groupKey: null, sortOrder: 1},
  {slug: 'whisky', label: 'Whisky', categoryKey: 'ruou-manh', groupKey: null, sortOrder: 2},
  {slug: 'ly-ruou-vang', label: 'Ly Rượu Vang', categoryKey: 'phu-kien', groupKey: 'phu-kien', sortOrder: 1},
]

/**
 * Nav menu groups — subTabs filtered to PRODUCT_TYPES slugs only.
 * Mirrors frontend/src/data/navMenu.js structure.
 */
export const CATEGORY_NAV_MENUS = {
  bia: [
    {
      key: 'bia-duc',
      label: 'Bia Đức',
      showEmptySubTabs: false,
      subTabSlugs: ['paulaner'],
    },
    {
      key: 'bia-mexico',
      label: 'Bia Mexico',
      showEmptySubTabs: false,
      subTabSlugs: ['coronita-extra'],
    },
  ],
  'ruou-vang': [
    {
      key: 'ruou-vang',
      label: 'Rượu vang',
      showEmptySubTabs: false,
      subTabSlugs: ['ruou-vang-phap', 'ruou-vang-y', 'ruou-vang-uc'],
    },
  ],
  'qua-tet': [
    {
      key: 'qua-tet',
      label: null,
      showEmptySubTabs: false,
      subTabSlugs: ['hop-qua-tet'],
    },
  ],
  'phu-kien': [
    {
      key: 'phu-kien',
      label: null,
      showEmptySubTabs: false,
      subTabSlugs: ['ly-ruou-vang'],
    },
  ],
  'ruou-manh': [],
}

export const PRODUCTS = [
  {
    legacyId: 1,
    name: 'Rượu Vang Chateau Bellevue La Ferriere – Chai 750ml',
    price: '450.000 đ',
    origin: 'Pháp',
    style: 'Vang đỏ',
    categoryKey: 'ruou-vang',
    typeSlug: 'ruou-vang-phap',
    abv: '14.5%',
    description:
      'Vang đỏ Bordeaux cổ điển — Merlot và Cabernet, hương trái cây chín, mận, vanilla và gia vị. Chai 750ml.',
    cardImage: 'RuouVang/chateau_bellevue_la_ferriere_card.webp',
    galleryImages: [
      'RuouVang/chateau_bellevue_la_ferriere_chi_tiet.webp',
      'RuouVang/chateau_bellevue_la_ferriere_card.webp',
    ],
    imageAlt: 'Rượu Vang Chateau Bellevue La Ferriere',
  },
  {
    legacyId: 26,
    name: 'Rượu Vang Pháp Le Pacha Les Eyraux – Chai 750ml',
    price: '725.000 đ',
    origin: 'Pháp',
    style: 'Vang đỏ',
    categoryKey: 'ruou-vang',
    typeSlug: 'ruou-vang-phap',
    abv: '14.5%',
    description:
      'Le Pacha Les Eyraux Bordeaux Supérieur 2019 — Merlot và Cabernet Sauvignon, hương quả mọng đen, tannin mượt. Lý tưởng với thịt đỏ nướng và bò hầm. Chai 750ml.',
    cardImage: 'RuouVang/le_pacha_les_eyraux_card.webp',
    galleryImages: [
      'RuouVang/le_pacha_les_eyraux_chi_tiet.webp',
      'RuouVang/le_pacha_les_eyraux_card.webp',
    ],
    imageAlt: 'Rượu Vang Pháp Le Pacha Les Eyraux',
  },
  {
    legacyId: 2,
    name: 'Rượu vang Areale Primitivo Di Manduria – Chai 750ml',
    price: '850.000 đ',
    origin: 'Ý',
    style: 'Vang đỏ',
    categoryKey: 'ruou-vang',
    typeSlug: 'ruou-vang-y',
    abv: '14.5%',
    description:
      'Primitivo DOC Puglia từ Giustini — đậm đà, hương trái cây chín, gỗ sồi và chocolate. Chai 750ml, sản lượng giới hạn.',
    cardImage: 'RuouVang/areale_primitivo_di_manduria_card.webp',
    galleryImages: [
      'RuouVang/areale_primitivo_di_manduria_chi_tiet.webp',
      'RuouVang/areale_primitivo_di_manduria_card.webp',
    ],
    imageAlt: 'Rượu vang Areale Primitivo Di Manduria',
  },
  {
    legacyId: 3,
    name: 'Hộp quà 2 chai bia Chimay – 750ml',
    price: '750.000 đ',
    origin: 'Bỉ',
    style: 'Trappist Ale',
    categoryKey: 'qua-tet',
    typeSlug: 'hop-qua-tet',
    abv: '7–9%',
    description:
      'Hộp quà 2 chai Chimay Trappist Bỉ — Chimay Đỏ (7%) thơm trái cây dịu, Chimay Xanh (9%) đậm đà thảo mộc và gia vị. Quà tặng sang trọng cho Lễ, Tết và đối tác.',
    cardImage: 'Bia Bỉ/bia_chimay_card.webp',
    galleryImages: ['Bia Bỉ/bia_chimay_chi_tiet.webp', 'Bia Bỉ/bia_chimay_card.webp'],
    imageAlt: 'Hộp quà 2 chai bia Chimay',
  },
  {
    legacyId: 4,
    name: 'Hộp Quà Bia Duvel – 4 Chai 330ml và 1 Ly',
    price: '450.000 đ',
    origin: 'Bỉ',
    style: 'Belgian Strong Ale',
    categoryKey: 'qua-tet',
    typeSlug: 'hop-qua-tet',
    abv: '8.5%',
    description:
      'Bia Duvel Belgian Strong Blond Ale — vàng tươi, hương cam quýt và lê chín, vị mượt êm dù nồng độ 8.5%. Hộp quà 4 chai 330ml kèm ly Tulip.',
    cardImage: 'Bia Bỉ/bia_duvel_card.webp',
    galleryImages: ['Bia Bỉ/bia_duvel_chi_tiet.webp', 'Bia Bỉ/bia_duvel_card.webp'],
    imageAlt: 'Hộp Quà Bia Duvel',
  },
  {
    legacyId: 5,
    name: 'Bia Paulaner Weissbier 5.5% – Lon 500ml – Thùng 24 lon',
    price: '1.450.000 đ',
    salePrice: '1.250.000 đ',
    origin: 'Đức',
    style: 'Wheat Beer',
    categoryKey: 'bia',
    typeSlug: 'paulaner',
    abv: '5.5%',
    description:
      'Paulaner Weissbier Hefeweizen Bavaria — vàng đục, bọt dày, hương chuối, xoài và dứa. Thùng 24 lon 500ml, uống lạnh 6–8°C.',
    cardImage: 'Bia Đức/paulaner_weissbier_card.webp',
    galleryImages: ['Bia Đức/paulaner_weissbier_chi_tiet.webp', 'Bia Đức/paulaner_weissbier_card.webp'],
    imageAlt: 'Bia Paulaner Weissbier',
  },
  {
    legacyId: 6,
    name: 'Bia Paulaner Weissbier Dunkel 5.3% – Chai 500ml – Thùng 20 chai',
    price: '1.450.000 đ',
    salePrice: '1.250.000 đ',
    origin: 'Đức',
    style: 'Wheat Beer',
    categoryKey: 'bia',
    typeSlug: 'paulaner',
    abv: '5.3%',
    description:
      'Paulaner Weissbier Dunkel — màu nâu hạt dẻ, vị caramel và trái cây chín, bọt mịn. Thùng 20 chai 500ml, chuẩn vị bia lúa mì đen Đức.',
    cardImage: 'Bia Đức/paulaner_weissbier_dunkel_card .webp',
    galleryImages: [
      'Bia Đức/paulaner_weissbier_dunkel_chi_tiet.webp',
      'Bia Đức/paulaner_weissbier_dunkel_card .webp',
    ],
    imageAlt: 'Bia Paulaner Weissbier Dunkel',
  },
  {
    legacyId: 7,
    name: 'Bia Coronita Extra – Chai 210ml – Thùng 24 Chai',
    price: '650.000 đ',
    origin: 'Mexico',
    style: 'Lager',
    categoryKey: 'bia',
    typeSlug: 'coronita-extra',
    abv: '4.6%',
    description:
      'Coronita Extra Mexico — bia vàng nhẹ, trong mát, thường thưởng thức lạnh kèm lát chanh. Thùng 24 chai 210ml.',
    cardImage: 'Bia Mexico/bia_coronita_extra_card.png',
    galleryImages: ['Bia Mexico/bia_coronita_extra_chi_tiet.png', 'Bia Mexico/bia_coronita_extra_card.png'],
    imageAlt: 'Bia Coronita Extra',
  },
  {
    legacyId: 8,
    name: "Rượu Vang Jacob's Creek Classic Shiraz Cabernet – Chai 750ml",
    price: '500.000 đ',
    origin: 'Úc',
    style: 'Vang đỏ',
    categoryKey: 'ruou-vang',
    typeSlug: 'ruou-vang-uc',
    abv: '13%',
    description:
      "Shiraz và Cabernet Đông Nam Úc — trái cây đậm, gia vị cay, tannin mượt. Màu ruby đậm, dễ uống mọi dịp. Chai 750ml.",
    cardImage: 'RuouVang/jacobs_creek_classic_shiraz_cabernet_card.webp',
    galleryImages: [
      'RuouVang/jacobs_creek_classic_shiraz_cabernet_chi_tiet.webp',
      'RuouVang/jacobs_creek_classic_shiraz_cabernet_card.webp',
    ],
    imageAlt: "Rượu Vang Jacob's Creek Classic Shiraz Cabernet",
  },
  {
    legacyId: 21,
    name: 'Rượu Remy Martin XO 300 Anniversary – Chai 750ml',
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Pháp',
    style: 'Cognac',
    categoryKey: 'ruou-manh',
    typeSlug: 'cognac',
    abv: '40%',
    description:
      'Remy Martin XO 300th Anniversary — phiên bản giới hạn kỷ niệm 3 thế kỷ (1724–2024). Eaux-de-vie tinh túy, hương trái cây chín, cam quýt, gia vị và gỗ sồi; cổ chai khắc vàng kèm hộp quà sang trọng. Chai 750ml.',
    cardImage: 'RuouManh/remy_martin_xo_300th_anniversary_card.webp',
    galleryImages: [
      'RuouManh/remy_martin_xo_300th_anniversary_chi_tiet.webp',
      'RuouManh/remy_martin_xo_300th_anniversary_card.webp',
    ],
    imageAlt: 'Rượu Remy Martin XO 300 Anniversary',
  },
  {
    legacyId: 22,
    name: 'Rượu Cognac Frapin XO Cigar Blend Premier Grand Cru – Chai 750ml',
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Pháp',
    style: 'Cognac',
    categoryKey: 'ruou-manh',
    typeSlug: 'cognac',
    abv: '40%',
    description:
      'Frapin XO Cigar Blend Premier Grand Cru từ Grande Champagne — Cognac mượt, đậm đà hương trái cây sấy, vani, quả phỉ và gỗ sồi, thiết kế để thưởng thức cùng xì gà. Chai 750ml.',
    cardImage: 'RuouManh/frapin_xo_cigar_blend_card.webp',
    galleryImages: ['RuouManh/frapin_xo_cigar_blend_chi_tiet.webp', 'RuouManh/frapin_xo_cigar_blend_card.webp'],
    imageAlt: 'Rượu Cognac Frapin XO Cigar Blend',
  },
  {
    legacyId: 25,
    name: 'Rượu Loch Lomond 12 Years Old Single Malt Whisky – Chai 750ml',
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Scotland',
    style: 'Single Malt Whisky',
    categoryKey: 'ruou-manh',
    typeSlug: 'whisky',
    abv: '46%',
    description:
      'Loch Lomond 12 Years Old Single Malt Scotch Whisky Highland — ủ 3 loại thùng gỗ sồi Mỹ, không lọc lạnh. Hương đào, lê, vani và chút khói nhẹ. Chai 750ml.',
    cardImage: 'RuouManh/loch_lomond_12_years_old_card.webp',
    galleryImages: ['RuouManh/loch_lomond_12_years_old_chi_tiet.webp', 'RuouManh/loch_lomond_12_years_old_card.webp'],
    imageAlt: 'Rượu Loch Lomond 12 Years Old',
  },
  {
    legacyId: 24,
    name: 'Ly uống rượu vang trắng Colibri – 6 cái/hộp',
    price: '900.000 đ',
    origin: 'Cộng hòa Séc',
    style: 'Ly rượu vang',
    categoryKey: 'phu-kien',
    typeSlug: 'ly-ruou-vang',
    abv: '0%',
    description:
      'Ly pha lê Colibri 350ml từ Bohemia — dáng tulip, vành miệng thuôn, chân cao. Giữ hương thơm, lý tưởng cho vang trắng và sâm panh. Hộp 6 cái, không chứa chì.',
    cardImage: 'PhuKien/ly_uong_ruou_vang_trang_colibri_card.webp',
    galleryImages: [
      'PhuKien/ly_uong_ruou_vang_trang_colibri_chi_tiet.webp',
      'PhuKien/ly_uong_ruou_vang_trang_colibri_card.webp',
    ],
    imageAlt: 'Ly uống rượu vang trắng Colibri',
  },
]

export const ARTICLE = {
  slug: 'co-can-uong-bia-corona-extra-voi-chanh-khong',
  title: 'Có Cần Uống Bia Corona Extra Với 1 Lát Chanh Hay Không?',
  excerpt:
    'Bia Corona Extra từ Mexico — vì sao thêm chanh trở thành nét đặc trưng, cách ướp lạnh đúng và gợi ý kết hợp món ăn.',
  category: 'Bia',
  publishedAt: '2026-01-15',
  coverImage: 'Bia Mexico/corona_lat_chanh_kien_thuc.jpg',
  coverAlt: 'Bia Corona Extra với lát chanh trên miệng chai',
  body: [
    {
      blocks: [
        {
          type: 'p',
          value: [
            {text: 'Bia '},
            {text: 'Corona Extra', bold: true},
            {
              text: ' là một trong những loại bia ngon nhất và được uống nhiều nhất thế giới, có nguồn gốc xuất phát từ Mexico. Ở đây người ta thường thưởng thức bia Corona với một lát chanh — sẽ làm hương vị bia tăng lên và trở thành nét đặc trưng của loại bia này.',
            },
          ],
        },
        {
          type: 'image',
          file: 'Bia Mexico/corona_lat_chanh_kien_thuc.jpg',
          alt: 'Bia Corona Extra với lát chanh trên miệng chai',
        },
      ],
    },
    {
      heading: 'Cách thưởng thức bia Corona Extra',
      blocks: [
        {
          type: 'p',
          value:
            'Bia Corona cần được thưởng thức sau khi ướp lạnh. Bạn có thể cho bia vào tủ đông, tủ lạnh hay tủ mát; tùy nhiệt độ ban đầu mà chỉ cần ướp khoảng 30 phút hoặc vài tiếng để bia được lạnh.',
        },
        {
          type: 'p',
          value:
            'Đặc biệt, việc để lát chanh tươi trên miệng chai và thưởng thức sẽ giúp hương vị bia Corona thêm phần tươi mát và có hiệu quả về vị giác nhằm tăng thêm phần sảng khoái.',
        },
      ],
    },
    {
      blocks: [
        {
          type: 'image',
          file: 'Bia Mexico/corona_lat_chanh_kien_thuc_livini.jpg',
          alt: 'Corona Extra kết hợp bò bít tết — gợi ý từ LUVINI & CO.',
          heading: 'Bò bít tết và Corona Extra — combo quen thuộc khi dã ngoại.',
        },
        {
          type: 'p',
          value: [
            {text: 'Có thể nói bia '},
            {text: 'Corona Extra', bold: true},
            {
              text: ' nổi tiếng như một thương hiệu không thể nào thay đổi được. Có nhiều người nói đã uống bia này rồi thì khó có thể từ chối mà không uống thêm vài lần nữa.',
            },
          ],
        },
        {
          type: 'p',
          value: [
            {
              text: 'Đặc biệt, đồ ăn ngon hơn khi dùng với bia Corona — nó được coi như chất xúc tác giúp bạn ngon miệng hơn. Bia ',
            },
            {text: 'Corona Extra', bold: true},
            {
              text: ' rất hợp với món bò bít tết trong các chuyến dã ngoại. Khi đi dã ngoại, thức ăn là thứ không thể thiếu, nên chọn những món ăn phù hợp nhất với cuộc dã ngoại.',
            },
          ],
        },
        {
          type: 'p',
          value: [
            {
              text: 'Bò bít tết là món ăn yêu thích của rất nhiều người vì nó dễ làm, ăn lại ngon. Người châu Âu thường có sở thích ăn bò bít tết uống với bia ',
            },
            {text: 'Corona Extra', bold: true},
            {text: ' đầy thú vị.'},
          ],
        },
      ],
    },
  ],
}
