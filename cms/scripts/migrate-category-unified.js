/**
 * Migrate legacy category + productType documents → unified category menus.
 *
 * Usage:
 *   cd cms
 *   npx sanity exec scripts/migrate-category-unified.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})

const RAW = {perspective: 'raw'}

function readSlug(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.current ?? ''
}

function baseDocumentId(id) {
  return String(id ?? '').replace(/^drafts\./, '')
}

async function fetchLegacyCategories() {
  return client.fetch(
    `*[_type == "category"]{
      _id,
      key,
      title,
      eyebrow,
      description,
      "slug": slug.current,
      dropdownMenus,
      standardMenus,
      navGroups[]{
        _key,
        key,
        label,
        showEmptySubTabs,
        "subTabs": subTabs[]->{
          "slug": slug.current,
          label
        }
      }
    }`,
    {},
    RAW,
  )
}

async function fetchLegacyProductTypes() {
  return client.fetch(
    `*[_type == "productType"]{
      _id,
      "slug": slug.current,
      label,
      groupKey,
      sortOrder,
      "categoryKey": category->key,
      "categorySlug": coalesce(category->slug.current, category->key)
    } | order(sortOrder asc)`,
    {},
    RAW,
  )
}

function buildMenusFromNavGroups(category, productTypes) {
  const categoryKey = readSlug(category.slug) || category.key
  const typesForCategory = productTypes.filter(
    (type) => type.categorySlug === categoryKey || type.categoryKey === categoryKey,
  )
  const typesBySlug = Object.fromEntries(typesForCategory.map((type) => [type.slug, type]))

  const dropdownMenus = (category.navGroups ?? []).map((group) => ({
    _type: 'categoryDropdownMenu',
    _key: group._key || group.key,
    name: group.label || group.key,
    slug: {_type: 'slug', current: group.key},
    showEmptySubTabs: Boolean(group.showEmptySubTabs),
    subTabs: (group.subTabs ?? [])
      .filter((tab) => tab?.slug)
      .map((tab) => ({
        _type: 'categorySubTab',
        _key: tab.slug,
        name: tab.label || typesBySlug[tab.slug]?.label || tab.slug,
        slug: {_type: 'slug', current: tab.slug},
      })),
  }))

  const subTabSlugs = new Set(
    dropdownMenus.flatMap((menu) => menu.subTabs.map((tab) => readSlug(tab.slug))),
  )

  const standardMenus = typesForCategory
    .filter((type) => !subTabSlugs.has(type.slug))
    .map((type) => ({
      _type: 'categoryStandardMenu',
      _key: type.slug,
      name: type.label || type.slug,
      slug: {_type: 'slug', current: type.slug},
    }))

  return {dropdownMenus, standardMenus}
}

function buildMenusFromProductTypes(categoryKey, productTypes) {
  const typesForCategory = productTypes.filter(
    (type) => type.categorySlug === categoryKey || type.categoryKey === categoryKey,
  )

  return {
    dropdownMenus: [],
    standardMenus: typesForCategory.map((type) => ({
      _type: 'categoryStandardMenu',
      _key: type.slug,
      name: type.label || type.slug,
      slug: {_type: 'slug', current: type.slug},
    })),
  }
}

function resolveMenusForCategory(category, productTypes) {
  if (category.dropdownMenus?.length || category.standardMenus?.length) {
    return {
      dropdownMenus: category.dropdownMenus ?? [],
      standardMenus: category.standardMenus ?? [],
    }
  }

  if (category.navGroups?.length) {
    return buildMenusFromNavGroups(category, productTypes)
  }

  const categoryKey = readSlug(category.slug) || category.key
  return buildMenusFromProductTypes(categoryKey, productTypes)
}

async function migrateCategories(productTypes) {
  const categories = await fetchLegacyCategories()
  const grouped = new Map()

  for (const category of categories) {
    const baseId = baseDocumentId(category._id)
    if (!grouped.has(baseId)) grouped.set(baseId, [])
    grouped.get(baseId).push(category)
  }

  console.log(`\n── Categories (${grouped.size} base, ${categories.length} variants) ──`)

  for (const [baseId, variants] of grouped) {
    const source =
      variants.find((doc) => doc.navGroups?.length) ??
      variants.find((doc) => doc.dropdownMenus?.length || doc.standardMenus?.length) ??
      variants[0]

    const categoryKey = readSlug(source.slug) || source.key || baseId.replace(/^category\./, '')
    const {dropdownMenus, standardMenus} = resolveMenusForCategory(source, productTypes)

    for (const variant of variants) {
      await client
        .patch(variant._id)
        .set({
          slug: {_type: 'slug', current: categoryKey},
          title: variant.title ?? source.title,
          eyebrow: variant.eyebrow ?? source.eyebrow,
          description: variant.description ?? source.description,
          dropdownMenus,
          standardMenus,
        })
        .unset(['key', 'navGroups'])
        .commit()

      const label = variant._id.startsWith('drafts.') ? `${variant._id} (draft)` : variant._id
      console.log(`  ✓ ${label}`)
    }

    console.log(
      `    → ${categoryKey}: ${dropdownMenus.length} dropdown, ${standardMenus.length} standard`,
    )
  }
}

async function cleanupProducts() {
  const products = await client.fetch(
    `*[_type == "product" && defined(productType)]{_id}`,
    {},
    RAW,
  )
  console.log(`\n── Products cleanup (${products.length}) ──`)

  for (const product of products) {
    await client.patch(product._id).unset(['productType']).commit()
  }

  if (products.length) {
    console.log(`  ✓ removed productType refs from ${products.length} products`)
  }
}

async function deleteCategoryDrafts() {
  const draftIds = await client.fetch(`*[_id match "drafts.category.*"]._id`, {}, RAW)
  if (!draftIds.length) return

  console.log(`\n── Delete category drafts (${draftIds.length}) ──`)
  for (const id of draftIds) {
    await client.delete(id)
    console.log(`  ✓ deleted ${id}`)
  }
}

async function deleteProductTypes() {
  const types = await client.fetch(`*[_type == "productType"]._id`, {}, RAW)
  console.log(`\n── Delete productType docs (${types.length}) ──`)

  for (const id of types) {
    await client.delete(id)
    console.log(`  ✓ deleted ${id}`)
  }
}

async function main() {
  console.log('Migrating to unified category schema…')
  const productTypes = await fetchLegacyProductTypes()
  await migrateCategories(productTypes)
  await cleanupProducts()
  await deleteCategoryDrafts()
  await deleteProductTypes()
  console.log('\n✅ Unified category migration complete.')
}

main().catch((error) => {
  console.error('\n❌ Migration failed:', error.message)
  if (error.details) console.error(error.details)
  process.exit(1)
})
