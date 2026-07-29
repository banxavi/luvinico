/**
 * Mark product → category references as weak so categories can be
 * unpublished/deleted while products still point at them.
 *
 * Schema `weak: true` only applies to NEW edits; existing docs need this patch.
 *
 * Usage:
 *   cd cms
 *   npm run migrate:weak-category-refs
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-02-01'})
const RAW = {perspective: 'raw'}

async function main() {
  const docs = await client.fetch(
    `*[_type == "product" && defined(category._ref) && category._weak != true]{
      _id,
      "ref": category._ref,
      "dataset": category._strengthenOnPublish
    }`,
    {},
    RAW,
  )

  if (!docs.length) {
    console.log('No strong product.category refs left — nothing to patch.')
    return
  }

  console.log(`Patching ${docs.length} product document(s)…`)

  let tx = client.transaction()
  let ops = 0

  for (const doc of docs) {
    const next = {
      _type: 'reference',
      _ref: doc.ref,
      _weak: true,
    }
    // Preserve draft→publish strengthen metadata when present
    if (doc.dataset) {
      next._strengthenOnPublish = doc.dataset
    }
    tx = tx.patch(doc._id, {set: {category: next}})
    ops += 1
    if (ops % 50 === 0) {
      await tx.commit({visibility: 'async'})
      tx = client.transaction()
      console.log(`  committed ${ops}…`)
    }
  }

  if (ops % 50 !== 0) {
    await tx.commit({visibility: 'async'})
  }

  console.log(`Done. Weakened ${ops} product.category reference(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
