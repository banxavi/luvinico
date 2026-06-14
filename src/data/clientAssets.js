/** Ảnh mẫu từ khách hàng — thay bằng CDN/CMS khi go-live */
import heroBg from '../assets/bg-hero.png';
import heroBg1 from '../assets/bg-hero_1.png';
import heroBg2 from '../assets/bg-hero_2.png';
import ruouNhoCard from '../assets/ruou_nho_card.png';
import ruouVangCard from '../assets/ruou_vang_card.png';
import ruouNhoChiTiet from '../assets/ruou_nho_chi_tiet.png';
import ruouVangChiTiet1 from '../assets/ruou_vang_chi_tiet_1.png';
import ruouVangChiTiet2 from '../assets/ruou_vang_chi_tiet_2.png';

/** @deprecated dùng HERO_BANNERS */
export const HERO_BACKGROUNDS = [heroBg, heroBg1, heroBg2];

/**
 * Banner hero kiểu ruouvangcaominh.vn — desktop rộng + mobile vuông riêng.
 * Tạm dùng chung ảnh PC cho mobile cho đến khi khách gửi bản mobile.
 */
export const HERO_BANNERS = [
  { id: 'hero-1', desktop: heroBg, mobile: heroBg, alt: 'Banner LUVINI 1' },
  { id: 'hero-2', desktop: heroBg1, mobile: heroBg1, alt: 'Banner LUVINI 2' },
  { id: 'hero-3', desktop: heroBg2, mobile: heroBg2, alt: 'Banner LUVINI 3' },
];

export const CLIENT_PRODUCT_ASSETS = {
  ruouNho: {
    card: ruouNhoCard,
    gallery: [ruouNhoChiTiet, ruouNhoCard],
  },
  ruouVang: {
    card: ruouVangCard,
    gallery: [ruouVangChiTiet1, ruouVangChiTiet2, ruouVangCard],
  },
};
