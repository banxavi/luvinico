/** ASCII slug for routes — handles Vietnamese diacritics. */
export function slugifyAscii(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

/** Slug source from sibling `name` inside nested objects/arrays. */
export const slugOptionsFromName = {
  source: (_doc, context) => context.parent?.name,
  maxLength: 96,
  slugify: slugifyAscii,
}

/** Slug source from document `title` (category root). */
export const slugOptionsFromTitle = {
  source: 'title',
  maxLength: 96,
  slugify: slugifyAscii,
}
