/**
 * Ảnh nền từng section — khách cung cấp file, thay URL tại đây.
 * Để null = dùng nền mặc định (gradient tối).
 */
export const SECTION_BACKGROUNDS = {
  hero: null,
  products: null,
  valueDeals: null,
  story: null,
  usp: null,
  partners: null,
};

/** Gợi ý spec file nền (gửi khách) */
export const SECTION_BG_SPEC = {
  hero: { width: 1920, height: 1080, note: 'Hero full-width, tối ở mép dưới để chữ đọc được' },
  products: { width: 1920, height: 900, note: 'Bộ sưu tập signature' },
  valueDeals: { width: 1920, height: 800, note: 'Vang ngon giá tốt' },
  story: { width: 1920, height: 800, note: 'Câu chuyện thương hiệu' },
  usp: { width: 1920, height: 700, note: 'Giá trị / USP' },
  partners: { width: 1920, height: 700, note: 'Đối tác & điểm bán' },
};
