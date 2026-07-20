import { mapSanityContentSections } from './mapRichContent';
import { isBodyContentPortableText } from '../portableText';

function isLegacyContentSectionArray(value) {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.some(
    (item) =>
      item?._type === 'contentSection' ||
      (Array.isArray(item?.blocks) &&
        item.blocks.some((block) => String(block?._type ?? '').startsWith('rich'))),
  );
}

/**
 * Normalize CMS body field — Portable Text (new) or legacy contentSection (old).
 * @returns {unknown[] | null}
 */
export function normalizeBodyContent(value) {
  if (!value) return null;
  if (!Array.isArray(value) || value.length === 0) return null;

  if (isBodyContentPortableText(value)) {
    return value;
  }

  if (isLegacyContentSectionArray(value)) {
    return mapSanityContentSections(value);
  }

  return value;
}

/** @param {unknown} value */
export function hasBodyContent(value) {
  const normalized = normalizeBodyContent(value);
  return Array.isArray(normalized) && normalized.length > 0;
}

/** RichContent section shape (legacy mapped output). */
export function isRichContentSections(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.some((section) => Array.isArray(section?.blocks))
  );
}
