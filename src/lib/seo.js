import { BRAND } from '../data/brand';

/** Tiêu đề đầy đủ: thương hiệu trước — dùng cho Open Graph / Twitter khi cần title tuyệt đối */
export function formatSeoTitle(pageTitle) {
  const segment = String(pageTitle ?? '').trim();
  if (!segment) return BRAND.name;
  if (segment.startsWith(BRAND.name)) return segment;
  return `${BRAND.name} — ${segment}`;
}
