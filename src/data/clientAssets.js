/** Ảnh mẫu từ khách hàng — thay bằng CDN/CMS khi go-live */
import bannerKhaiTruongPc from '../assets/banner/banner_khai_truong_pc.webp';
import bannerKhaiTruongMobile from '../assets/banner/banner_khai_truong_mobile.webp';
import bannerMuaHePc from '../assets/banner/banner_mua_he_ppc.webp';
import bannerMuaHeMobile from '../assets/banner/banner_mua_he_mobile.webp';
import ruouNhoCard from '../assets/ruou_nho_card.png';
import ruouNhoChiTiet from '../assets/ruou_nho_chi_tiet.png';
import chateauBellevueCard from '../assets/RuouVang/chateau_bellevue_la_ferriere_card.webp';
import chateauBellevueChiTiet from '../assets/RuouVang/chateau_bellevue_la_ferriere_chi_tiet.webp';
import arealePrimitivoCard from '../assets/RuouVang/areale_primitivo_di_manduria_card.webp';
import arealePrimitivoChiTiet from '../assets/RuouVang/areale_primitivo_di_manduria_chi_tiet.webp';
import jacobsCreekCard from '../assets/RuouVang/jacobs_creek_classic_shiraz_cabernet_card.webp';
import jacobsCreekChiTiet from '../assets/RuouVang/jacobs_creek_classic_shiraz_cabernet_chi_tiet.webp';
import biaChimayCard from '../assets/Bia Bỉ/bia_chimay_card.webp';
import biaChimayChiTiet from '../assets/Bia Bỉ/bia_chimay_chi_tiet.webp';
import biaDuvelCard from '../assets/Bia Bỉ/bia_duvel_card.webp';
import biaDuvelChiTiet from '../assets/Bia Bỉ/bia_duvel_chi_tiet.webp';
import paulanerWeissbierCard from '../assets/Bia Đức/paulaner_weissbier_card.webp';
import paulanerWeissbierChiTiet from '../assets/Bia Đức/paulaner_weissbier_chi_tiet.webp';
import paulanerDunkelCard from '../assets/Bia Đức/paulaner_weissbier_dunkel_card .webp';
import paulanerDunkelChiTiet from '../assets/Bia Đức/paulaner_weissbier_dunkel_chi_tiet.webp';
import biaCoronitaCard from '../assets/Bia Mexico/bia_coronita_extra_card.png';
import biaCoronitaChiTiet from '../assets/Bia Mexico/bia_coronita_extra_chi_tiet.png';

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
    chateauBellevue: {
      card: chateauBellevueCard,
      gallery: [chateauBellevueChiTiet, chateauBellevueCard],
    },
    arealePrimitivo: {
      card: arealePrimitivoCard,
      gallery: [arealePrimitivoChiTiet, arealePrimitivoCard],
    },
    jacobsCreek: {
      card: jacobsCreekCard,
      gallery: [jacobsCreekChiTiet, jacobsCreekCard],
    },
  },
  biaBi: {
    chimay: {
      card: biaChimayCard,
      gallery: [biaChimayChiTiet, biaChimayCard],
    },
    duvel: {
      card: biaDuvelCard,
      gallery: [biaDuvelChiTiet, biaDuvelCard],
    },
  },
  biaDuc: {
    paulanerWeissbier: {
      card: paulanerWeissbierCard,
      gallery: [paulanerWeissbierChiTiet, paulanerWeissbierCard],
    },
    paulanerDunkel: {
      card: paulanerDunkelCard,
      gallery: [paulanerDunkelChiTiet, paulanerDunkelCard],
    },
  },
  biaMexico: {
    coronita: {
      card: biaCoronitaCard,
      gallery: [biaCoronitaChiTiet, biaCoronitaCard],
    },
  },
};
