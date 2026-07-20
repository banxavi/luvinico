/**
 * Migrate contentSection[] → richBodyContent (Portable Text) on products & articles.
 *
 * Usage:
 *   cd cms
 *   npm run migrate:rich-body
 *   # or dry-run:
 *   DRY_RUN=1 npm run migrate:rich-body
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})
const RAW = {perspective: 'raw'}
const DRY_RUN = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true'

function baseDocumentId(id) {
  return String(id ?? '').replace(/^drafts\./, '')
}

let keyCounter = 0
function nextKey(prefix = 'k') {
  keyCounter += 1
  return `${prefix}${keyCounter}`
}

function resetKeys() {
  keyCounter = 0
}

function spansToBlockChildren(spans) {
  return (spans ?? []).map((span) => ({
    _type: 'span',
    _key: nextKey('s'),
    text: span.text ?? '',
    marks: span.bold ? ['strong'] : [],
  }))
}

function plainTextToBlock(text) {
  const value = String(text ?? '').trim()
  if (!value) return null
  return {
    _type: 'block',
    _key: nextKey('b'),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: nextKey('s'), text: value, marks: []}],
  }
}

function convertRichParagraph(block) {
  if (block.spans?.length) {
    return {
      _type: 'block',
      _key: nextKey('b'),
      style: 'normal',
      markDefs: [],
      children: spansToBlockChildren(block.spans),
    }
  }
  return plainTextToBlock(block.plainText)
}

function convertRichList(block) {
  const listItem = block.listStyle === 'number' ? 'number' : 'bullet'
  return (block.items ?? [])
    .map((item) => {
      const label = typeof item === 'object' ? item.bold ?? '' : ''
      const text =
        typeof item === 'string' ? item : (item.text ?? '')
      const fullText = label ? `${label}${text}` : text
      if (!String(fullText).trim()) return null
      return {
        _type: 'block',
        _key: nextKey('b'),
        style: 'normal',
        listItem,
        level: 1,
        markDefs: [],
        children: [{_type: 'span', _key: nextKey('s'), text: fullText, marks: []}],
      }
    })
    .filter(Boolean)
}

function readAssetRef(image) {
  if (!image) return null
  return image.asset?._ref ?? image.asset?._id ?? null
}

function convertRichImageBlock(block) {
  const assetRef = readAssetRef(block.image)
  if (!assetRef) {
    console.warn('  skip image block — missing asset ref')
    return null
  }

  return {
    _type: 'image',
    _key: nextKey('img'),
    asset: {_type: 'reference', _ref: assetRef},
    alt: block.alt ?? block.image?.alt ?? 'Hình ảnh sản phẩm',
    ...(block.caption ? {caption: block.caption} : {}),
  }
}

function convertContentSection(section) {
  const blocks = []

  if (section.heading) {
    blocks.push({
      _type: 'block',
      _key: nextKey('b'),
      style: 'h2',
      markDefs: [],
      children: [{_type: 'span', _key: nextKey('s'), text: section.heading, marks: []}],
    })
  }

  for (const block of section.blocks ?? []) {
    switch (block._type) {
      case 'richParagraph': {
        const converted = convertRichParagraph(block)
        if (converted) blocks.push(converted)
        break
      }
      case 'richList':
        blocks.push(...convertRichList(block))
        break
      case 'richImageBlock': {
        const imageBlock = convertRichImageBlock(block)
        if (imageBlock) {
          blocks.push(imageBlock)
          if (block.heading) {
            blocks.push({
              _type: 'block',
              _key: nextKey('b'),
              style: 'h3',
              markDefs: [],
              children: [{_type: 'span', _key: nextKey('s'), text: block.heading, marks: []}],
            })
          }
        }
        break
      }
      default:
        console.warn(`  skip unknown block type: ${block._type ?? 'unknown'}`)
        break
    }
  }

  return blocks
}

function isContentSectionItem(item) {
  if (!item || typeof item !== 'object') return false
  if (item._type === 'contentSection') return true
  if (Array.isArray(item.blocks)) {
    return item.blocks.some((block) => String(block?._type ?? '').startsWith('rich'))
  }
  return false
}

function isPortableTextItem(item) {
  if (!item || typeof item !== 'object') return false
  return ['block', 'image', 'imageTextBlock'].includes(item._type)
}

function needsMigration(value) {
  if (!Array.isArray(value) || value.length === 0) return false
  return value.some(isContentSectionItem)
}

/** @returns {unknown[] | null} null = no migration needed */
function convertBodyField(value) {
  if (!needsMigration(value)) return null

  const converted = value.flatMap((item) => {
    if (isContentSectionItem(item)) {
      return convertContentSection(item)
    }
    if (isPortableTextItem(item)) {
      return [item]
    }
    console.warn(`  skip unknown array item type: ${item?._type ?? 'unknown'}`)
    return []
  })

  return converted.length ? converted : []
}

async function migrateDocument(doc) {
  resetKeys()
  const patch = {}

  if (doc._type === 'product' && needsMigration(doc.content)) {
    patch.content = convertBodyField(doc.content)
  }

  if (doc._type === 'article' && needsMigration(doc.body)) {
    patch.body = convertBodyField(doc.body)
  }

  if (!Object.keys(patch).length) return false

  const label = `${doc._type} ${baseDocumentId(doc._id)}`
  const blockCount =
    (patch.content?.length ?? 0) + (patch.body?.length ?? 0)

  if (DRY_RUN) {
    console.log(`[dry-run] Would migrate ${label} → ${blockCount} PT block(s)`)
    return true
  }

  await client.patch(doc._id).set(patch).commit({autoGenerateArrayKeys: true})
  console.log(`Migrated ${label} → ${blockCount} PT block(s)`)
  return true
}

const LEGACY_QUERY = /* groq */ `
  *[_type in ["product", "article"] && (
    (defined(content) && count(content[_type == "contentSection"]) > 0) ||
    (defined(body) && count(body[_type == "contentSection"]) > 0)
  )]{
    _id,
    _type,
    content[]{
      _type,
      _key,
      heading,
      blocks[]{
        _type,
        _key,
        plainText,
        spans[]{ text, bold },
        listStyle,
        items[]{ text, bold },
        alt,
        heading,
        caption,
        image{ asset }
      }
    },
    body[]{
      _type,
      _key,
      heading,
      blocks[]{
        _type,
        _key,
        plainText,
        spans[]{ text, bold },
        listStyle,
        items[]{ text, bold },
        alt,
        heading,
        caption,
        image{ asset }
      }
    }
  }
`

async function main() {
  const docs = await client.fetch(LEGACY_QUERY, {}, RAW)

  console.log(`Found ${docs.length} document(s) with legacy contentSection data.`)

  let migrated = 0
  for (const doc of docs) {
    const did = await migrateDocument(doc)
    if (did) migrated += 1
  }

  console.log(
    DRY_RUN
      ? `Dry-run complete. ${migrated} document(s) would be migrated.`
      : `Done. Migrated ${migrated} document(s).`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
