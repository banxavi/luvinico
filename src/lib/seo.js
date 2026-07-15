import { BRAND } from '../data/brand';

const TITLE_SEP = ' | ';

/** Chuẩn hoá dấu ngăn tiêu đề (—, –, -) thành "|" */
export function normalizeTitleSeparators(value) {
  return String(value ?? '')
    .replace(/\s*[—–−]\s*/g, TITLE_SEP)
    .replace(/\s+-\s+/g, TITLE_SEP)
    .replace(/(?:\s*\|\s*)+/g, TITLE_SEP)
    .replace(/^\|+|\|+$/g, '')
    .trim();
}

/** Tiêu đề đầy đủ: "LUVINI & CO. | {trang}" */
export function formatSeoTitle(pageTitle) {
  const segment = normalizeTitleSeparators(pageTitle);
  if (!segment) return BRAND.name;
  if (segment === BRAND.name || segment.startsWith(`${BRAND.name}${TITLE_SEP}`)) {
    return segment;
  }
  return `${BRAND.name}${TITLE_SEP}${segment}`;
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
