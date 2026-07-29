/**
 * Migrate hardcoded nav-menu content → Sanity CMS.
 *
 * Scope: categories, productTypes (with products only), products (13),
 * product content blocks, 1 knowledge article.
 *
 * Does NOT migrate: home, brand, nav labels, khuyen-mai page text, policies, search.
 *
 * Usage — see cms/scripts/MIGRATE-NAV.md
 */
import {createClient} from '@sanity/client'
import {getCliClient} from 'sanity/cli'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {basename, extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {
  ARTICLE,
  CATEGORIES,
  CATEGORY_NAV_MENUS,
  PRODUCTS,
  PRODUCT_TYPES,
} from './nav-migration-data.js'
import {convertContentSection, convertProductContent, plainTextToPortableText, slugify} from './convert-content.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const CMS_ROOT = join(__dirname, '..')
const FRONTEND_ROOT = join(CMS_ROOT, '..', 'frontend')
const ASSETS_ROOT = join(FRONTEND_ROOT, 'src', 'assets')

/** Load cms/.env if present (KEY=VALUE lines). */
function loadEnvFile() {
  const envPath = join(CMS_ROOT, '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFile()

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sfqhf74q'
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

function createMigrationClient() {
  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN
  if (token) {
    return createClient({
      projectId,
      dataset,
      token,
      apiVersion: '2026-02-01',
      useCdn: false,
    })
  }

  // Authenticated via: npx sanity exec scripts/migrate-nav-content.js --with-user-token
  return getCliClient({apiVersion: '2026-02-01'})
}

/** @type {import('@sanity/client').SanityClient} */
let client

/** @type {Map<string, string>} assetPath → asset document _id */
const uploadedAssets = new Map()

async function uploadImage(relativeAssetPath) {
  const normalized = relativeAssetPath.replace(/\\/g, '/')
  if (uploadedAssets.has(normalized)) {
    return {_type: 'image', asset: {_type: 'reference', _ref: uploadedAssets.get(normalized)}}
  }

  const absolutePath = join(ASSETS_ROOT, normalized)
  if (!existsSync(absolutePath)) {
    throw new Error(`Image not found: ${absolutePath}`)
  }

  const filename = basename(absolutePath)
  const ext = extname(filename).slice(1).toLowerCase()
  const contentType =
    ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'application/octet-stream'

  const assetDoc = await client.assets.upload('image', createReadStream(absolutePath), {
    filename,
    contentType,
  })

  uploadedAssets.set(normalized, assetDoc._id)
  console.log(`  ↑ image ${normalized}`)
  return {_type: 'image', asset: {_type: 'reference', _ref: assetDoc._id}}
}

async function uploadImageField(relativePath, alt) {
  const image = await uploadImage(relativePath)
  return {...image, alt: alt ?? ''}
}

async function loadProductDetails() {
  const moduleUrl = new URL('../../frontend/src/data/productDetails.js', import.meta.url)
  const {productDetailExtras} = await import(moduleUrl.href)
  return productDetailExtras
}

function categoryId(key) {
  return `category.${key}`
}

function productId(legacyId) {
  return `product.${legacyId}`
}

function articleId(slug) {
  return `article.${slug}`
}

function buildCategoryMenus(categoryKey) {
  const groups = CATEGORY_NAV_MENUS[categoryKey] ?? []
  const typesForCategory = PRODUCT_TYPES.filter((type) => type.categoryKey === categoryKey)
  const typesBySlug = Object.fromEntries(typesForCategory.map((type) => [type.slug, type]))

  const dropdownMenus = groups.map((group) => ({
    _type: 'categoryDropdownMenu',
    _key: group.key,
    name: group.label ?? group.key,
    slug: {_type: 'slug', current: group.key},
    showEmptySubTabs: group.showEmptySubTabs ?? false,
    subTabs: group.subTabSlugs.map((slug) => ({
      _type: 'categorySubTab',
      _key: slug,
      name: typesBySlug[slug]?.label ?? slug,
      slug: {_type: 'slug', current: slug},
    })),
  }))

  const subTabSlugs = new Set(groups.flatMap((group) => group.subTabSlugs))
  const standardMenus = typesForCategory
    .filter((type) => !subTabSlugs.has(type.slug))
    .map((type) => ({
      _type: 'categoryStandardMenu',
      _key: type.slug,
      name: type.label,
      slug: {_type: 'slug', current: type.slug},
    }))

  return {dropdownMenus, standardMenus}
}

async function migrateCategories() {
  console.log('\n── Categories (unified menus) ──')
  for (const cat of CATEGORIES) {
    const {dropdownMenus, standardMenus} = buildCategoryMenus(cat.key)

    await client.createOrReplace({
      _id: categoryId(cat.key),
      _type: 'category',
      slug: {_type: 'slug', current: cat.key},
      title: cat.title,
      eyebrow: cat.eyebrow,
      description: cat.description,
      dropdownMenus,
      standardMenus,
    })
    console.log(
      `  ✓ category.${cat.key} (${dropdownMenus.length} dropdown, ${standardMenus.length} standard)`,
    )
  }
}

async function migrateProducts(productDetailExtras) {
  console.log('\n── Products ──')
  for (const product of PRODUCTS) {
    const slug = slugify(product.name)
    const extras = productDetailExtras[product.legacyId] ?? {}
    const content = await convertProductContent(extras.content ?? [], uploadImage)

    const gallery = []
    for (const rel of product.galleryImages ?? []) {
      gallery.push(await uploadImageField(rel, product.imageAlt))
    }

    await client.createOrReplace({
      _id: productId(product.legacyId),
      _type: 'product',
      legacyId: product.legacyId,
      name: product.name,
      slug: {_type: 'slug', current: slug},
      price: product.price,
      salePrice: product.salePrice ?? undefined,
      contactPrice: product.contactPrice ?? false,
      origin: product.origin,
      style: product.style,
      abv: product.abv,
      ibu: extras.ibu ?? undefined,
      volume: extras.volume ?? undefined,
      serveTemp: extras.serveTemp ?? undefined,
      description: plainTextToPortableText(product.description),
      longDescription: plainTextToPortableText(extras.longDescription ?? undefined),
      category: {_type: 'reference', _ref: categoryId(product.categoryKey), _weak: true},
      type: product.typeSlug,
      image: await uploadImageField(product.cardImage, product.imageAlt),
      gallery,
      content,
    })
    console.log(`  ✓ product.${product.legacyId} (${slug})`)
  }
}

async function migrateArticle() {
  console.log('\n── Article ──')
  const body = []
  for (const section of ARTICLE.body) {
    body.push(
      await convertContentSection(
        {
          heading: section.heading,
          blocks: (section.blocks ?? []).map((block) => {
            if (block.type === 'image' && block.file) {
              return {...block, file: block.file}
            }
            return block
          }),
        },
        uploadImage,
      ),
    )
  }

  await client.createOrReplace({
    _id: articleId(ARTICLE.slug),
    _type: 'article',
    title: ARTICLE.title,
    slug: {_type: 'slug', current: ARTICLE.slug},
    excerpt: ARTICLE.excerpt,
    category: ARTICLE.category,
    publishedAt: ARTICLE.publishedAt,
    coverImage: await uploadImageField(ARTICLE.coverImage, ARTICLE.coverAlt),
    body,
  })
  console.log(`  ✓ article.${ARTICLE.slug}`)
}

async function main() {
  client = createMigrationClient()
  console.log(`Migrating to Sanity project "${projectId}" / dataset "${dataset}"`)
  console.log(`Assets root: ${ASSETS_ROOT}`)

  const productDetailExtras = await loadProductDetails()

  await migrateCategories()
  await migrateProducts(productDetailExtras)
  await migrateArticle()

  console.log('\n✅ Migration complete.')
  console.log(`   Categories: ${CATEGORIES.length}`)
  console.log(`   Menu items: ${PRODUCT_TYPES.length} (embedded in categories)`)
  console.log(`   Products: ${PRODUCTS.length}`)
  console.log(`   Articles: 1`)
  console.log(`   Images uploaded: ${uploadedAssets.size}`)
}

main().catch((error) => {
  console.error('\n❌ Migration failed:', error.message)
  if (error.details) console.error(error.details)
  process.exit(1)
})
