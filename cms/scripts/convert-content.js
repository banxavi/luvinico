/**
 * Convert frontend RichContent blocks → Sanity contentSection blocks.
 * @param {object} section
 * @param {(filePath: string) => Promise<{_type: string, asset: {_type: string, _ref: string}}>} uploadImage
 */
export async function convertContentSection(section, uploadImage) {
  const blocks = []

  for (const block of section.blocks ?? []) {
    if (block.type === 'p') {
      if (Array.isArray(block.value)) {
        blocks.push({
          _type: 'richParagraph',
          _key: key(),
          spans: block.value.map((part) => ({
            _type: 'richSpan',
            _key: key(),
            text: part.text ?? '',
            bold: Boolean(part.bold),
          })),
        })
      } else {
        blocks.push({
          _type: 'richParagraph',
          _key: key(),
          plainText: block.value ?? '',
        })
      }
      continue
    }

    if (block.type === 'ul' || block.type === 'ol') {
      blocks.push({
        _type: 'richList',
        _key: key(),
        listStyle: block.type === 'ol' ? 'number' : 'bullet',
        items: (block.items ?? []).map((item) => {
          if (typeof item === 'string') {
            return {_type: 'richListItem', _key: key(), text: item}
          }
          return {
            _type: 'richListItem',
            _key: key(),
            bold: item.bold ?? '',
            text: item.text ?? '',
          }
        }),
      })
      continue
    }

    if (block.type === 'image') {
      const filePath = block.file ?? block.src
      if (!filePath) continue

      const asset = await uploadImage(filePath)
      blocks.push({
        _type: 'richImageBlock',
        _key: key(),
        image: {...asset, alt: block.alt ?? ''},
        alt: block.alt ?? '',
        heading: block.heading ?? undefined,
        caption: block.caption ?? undefined,
      })
    }
  }

  return {
    _type: 'contentSection',
    _key: key(),
    heading: section.heading ?? undefined,
    blocks,
  }
}

/** Convert productDetails content array (no image blocks) */
export async function convertProductContent(content, uploadImage) {
  if (!Array.isArray(content) || content.length === 0) return []
  const sections = []
  for (const section of content) {
    sections.push(await convertContentSection(section, uploadImage))
  }
  return sections
}

let keyCounter = 0
function key() {
  keyCounter += 1
  return `k${keyCounter}`
}

export function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[''']/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Convert plain string → Sanity Portable Text blocks */
export function plainTextToPortableText(text) {
  const value = String(text ?? '').trim()
  if (!value) return undefined

  return [
    {
      _type: 'block',
      _key: 'pt0',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'pt0s0',
          text: value,
          marks: [],
        },
      ],
    },
  ]
}
