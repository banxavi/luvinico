import { BRAND } from '../data/brand';

/** Tiêu đề đầy đủ: "LUVINI & CO. — {trang}" */
export function formatSeoTitle(pageTitle) {
  const segment = String(pageTitle ?? '').trim();
  if (!segment) return BRAND.name;
  if (segment.startsWith(BRAND.name)) return segment;
  return `${BRAND.name} — ${segment}`;
}

/** Metadata chuẩn — luôn có brand trong <title> và Open Graph */
export function createPageMetadata({ title, description, openGraph, ...rest }) {
  const fullTitle = formatSeoTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      ...openGraph,
    },
    ...rest,
  };
}
