import { CLIENT_PRODUCT_ASSETS } from './data/clientAssets';

export const mockProducts = [
  {
    id: 1,
    name: 'Rượu Nho Mẫu',
    image: CLIENT_PRODUCT_ASSETS.ruouNho.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouNho.gallery,
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Ý',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    abv: '13.5%',
    description: 'Ảnh mẫu từ khách — kiểm tra độ đồng bộ trên card và trang chi tiết.',
  },
  {
    id: 2,
    name: 'Rượu Vang Mẫu',
    image: CLIENT_PRODUCT_ASSETS.ruouVang.card,
    gallery: CLIENT_PRODUCT_ASSETS.ruouVang.gallery,
    price: '890.000 đ',
    origin: 'Pháp',
    style: 'Vang đỏ',
    category: 'ruou-vang',
    abv: '14.0%',
    description: 'Ảnh mẫu từ khách — gallery 3 góc chụp trên trang chi tiết.',
  },
  {
    id: 3,
    name: 'Sierra Nevada Pale Ale',
    image:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=max',
    price: '120.000 đ',
    origin: 'Mỹ',
    style: 'Pale Ale',
    category: 'bia',
    abv: '5.6%',
    description: 'Hương hoa bia đặc trưng, độ đắng cân bằng — lựa chọn quen thuộc cho fan IPA nhẹ.',
  },
  {
    id: 4,
    name: 'Paulaner Hefe-Weizen',
    image:
      'https://manofmany.com/wp-content/uploads/2023/01/10-Weihenstephaner-Hefe-Weissbier.png',
    price: '89.000 đ',
    origin: 'Đức',
    style: 'Wheat Beer',
    abv: '5.5%',
    description: 'Sủi tươi, thơm chuối và clove — dễ uống, hợp buổi chiều thư giãn.',
  },
  {
    id: 5,
    name: 'Duvel Belgian Strong',
    image:
      'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=500&auto=format&fit=max',
    price: 'Liên hệ',
    contactPrice: true,
    origin: 'Bỉ',
    style: 'Belgian Strong Ale',
    abv: '8.5%',
    description: 'Sủi mịn, hậu vị khô và cay nhẹ — biểu tượng của bia Bỉ cao cấp.',
  },
  {
    id: 6,
    name: 'Guinness Draught',
    image:
      'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=500&auto=format&fit=max',
    price: '78.000 đ',
    origin: 'Ireland',
    style: 'Stout',
    abv: '4.2%',
    description: 'Đen mịn, kem béo, hương cà phê rang — uống mát cả ngày.',
  },
  {
    id: 7,
    name: 'Corona Extra',
    image:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=max',
    price: '65.000 đ',
    salePrice: '52.000 đ',
    origin: 'Mexico',
    style: 'Lager',
    abv: '4.5%',
    description: 'Nhẹ, trong, hợp uống lạnh cùng chanh — phong cách biển nhiệt đới.',
  },
  {
    id: 8,
    name: 'Hoegaarden White',
    image:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=max',
    price: '72.000 đ',
    origin: 'Bỉ',
    style: 'Witbier',
    abv: '4.9%',
    description: 'Thơm cam và hạt tiêu, đục tự nhiên — thanh mát cho buổi hẹn nhẹ.',
  },
  {
    id: 9,
    name: 'Asahi Super Dry',
    image:
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=500&auto=format&fit=max',
    price: '58.000 đ',
    origin: 'Nhật Bản',
    style: 'Lager',
    abv: '5.0%',
    description: 'Khô, sạch, kết thúc gọn — đồng hành cùng sushi và đồ chiên.',
  },
  {
    id: 10,
    name: 'Chimay Blue',
    image:
      'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=500&auto=format&fit=max',
    price: '165.000 đ',
    origin: 'Bỉ',
    style: 'Trappist Ale',
    abv: '9.0%',
    description: 'Đậm trái cây sấy, gia vị ấm — đáng để thưởng thức chậm từng ngụm.',
  },
  {
    id: 11,
    name: 'BrewDog Punk IPA',
    image:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=max',
    price: '110.000 đ',
    origin: 'Scotland',
    style: 'IPA',
    abv: '5.6%',
    description: 'Đắng hoa bia rõ, hương bưởi và thông — cho fan IPA hiện đại.',
  },
  {
    id: 12,
    name: 'Stella Artois',
    image:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=max',
    price: '68.000 đ',
    origin: 'Bỉ',
    style: 'Pilsner',
    abv: '5.0%',
    description: 'Vàng trong, đắng nhẹ, sủi đều — lựa chọn an toàn cho mọi bữa tiệc.',
  },
  {
    id: 13,
    name: 'Lagunitas IPA',
    image:
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=500&auto=format&fit=max',
    price: '125.000 đ',
    origin: 'Mỹ',
    style: 'IPA',
    abv: '6.2%',
    description: 'Hương thông và cam đào, độ đắng cân bằng — craft kinh điển từ California.',
  },
  {
    id: 14,
    name: 'Weihenstephaner Hefe',
    image:
      'https://manofmany.com/wp-content/uploads/2023/01/10-Weihenstephaner-Hefe-Weissbier.png',
    price: '92.000 đ',
    origin: 'Đức',
    style: 'Hefeweizen',
    abv: '5.4%',
    description: 'Chuối và đinh hương nồng, sủi dày — nhà máy bia lâu đời nhất thế giới.',
  },
  {
    id: 15,
    name: 'Delirium Tremens',
    image:
      'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=500&auto=format&fit=max',
    price: '155.000 đ',
    origin: 'Bỉ',
    style: 'Belgian Strong Ale',
    abv: '8.5%',
    description: 'Ngọt nhẹ, hoa quả và gia vị — biểu tượng voi hồng nổi tiếng.',
  },
  {
    id: 16,
    name: 'Tiger Crystal',
    image:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500&auto=format&fit=max',
    price: '42.000 đ',
    origin: 'Singapore',
    style: 'Lager',
    abv: '4.6%',
    description: 'Trong, nhẹ, dễ uống — hợp nhậu nhiệt đới và đồ nướng.',
  },
  {
    id: 17,
    name: 'Kirin Ichiban',
    image:
      'https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=500&auto=format&fit=max',
    price: '75.000 đ',
    origin: 'Nhật Bản',
    style: 'Lager',
    abv: '5.0%',
    description: 'Tinh khiết từ mẻ đầu tiên, vị gạo thanh — thanh lịch kiểu Nhật.',
  },
  {
    id: 18,
    name: 'Budweiser Budvar',
    image:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=max',
    price: '88.000 đ',
    origin: 'Séc',
    style: 'Lager',
    abv: '5.0%',
    description: 'Đắng hoa nhẹ, body tròn — pilsner cổ điển từ Ceske Budejovice.',
  },
  {
    id: 19,
    name: 'Murphy\'s Irish Stout',
    image:
      'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=500&auto=format&fit=max',
    price: '82.000 đ',
    origin: 'Ireland',
    style: 'Stout',
    abv: '4.0%',
    description: 'Mềm hơn Guinness, sô-cô-la và cà phê — uống mát không nặng.',
  },
  {
    id: 20,
    name: 'La Trappe Dubbel',
    image:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=500&auto=format&fit=max',
    price: '148.000 đ',
    origin: 'Hà Lan',
    style: 'Dubbel',
    abv: '7.0%',
    description: 'Caramel, khô quả, hậu vị ấm — trappist đậm chất tu viện.',
  },
];

function parsePriceNumber(price) {
  return Number.parseInt(String(price).replace(/\D/g, ''), 10) || 0;
}

/** Giá tốt — dùng cho carousel 1 hàng × 5 (có thể xoay trang) */
export const mockValueProducts = [...mockProducts]
  .sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price))
  .slice(0, 10);
