/** Ảnh mẫu từ khách hàng — thay bằng CDN/CMS khi go-live */
import bannerKhaiTruongPc from '../assets/banner/banner_khai_truong_pc.webp';
import bannerKhaiTruongMobile from '../assets/banner/banner_khai_truong_mobile.webp';
import bannerMuaHePc from '../assets/banner/banner_mua_he_ppc.webp';
import bannerMuaHeMobile from '../assets/banner/banner_mua_he_mobile.webp';
import ruouNhoCard from '../assets/ruou_nho_card.png';
import ruouVangCard from '../assets/ruou_vang_card.png';
import ruouNhoChiTiet from '../assets/ruou_nho_chi_tiet.png';
import ruouVangChiTiet1 from '../assets/ruou_vang_chi_tiet_1.png';
import ruouVangChiTiet2 from '../assets/ruou_vang_chi_tiet_2.png';

/** @deprecated dùng HERO_BANNERS */
export const HERO_BACKGROUNDS = [bannerKhaiTruongPc, bannerMuaHePc];

/**
 * Banner hero — desktop 1920×740 + mobile 1080×1080 (picture responsive).
 */
export const HERO_BANNERS = [
  {
    id: 'khai-truong',
    desktop: bannerKhaiTruongPc,
    mobile: bannerKhaiTruongMobile,
    alt: 'Banner khai trương LUVINI & CO.',
  },
  {
    id: 'mua-he',
    desktop: bannerMuaHePc,
    mobile: bannerMuaHeMobile,
    alt: 'Banner khuyến mãi mùa hè LUVINI & CO.',
  },
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
