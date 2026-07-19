/**
 * Portable Text helpers — supports Sanity blocks and legacy plain strings (mockData).
 */

/** @param {unknown} value */
export function isPortableText(value) {
  return Array.isArray(value) && value.some((block) => block?._type === 'block')
}

/** Extract plain text for SEO / JSON-LD from PT blocks or string. */
export function portableTextToPlain(value) {
  if (!value) return ''
  if (typeof value === 'string') return value.trim()

  if (!isPortableText(value)) return ''

  return value
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? '')
        .join(''),
    )
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim()
}
