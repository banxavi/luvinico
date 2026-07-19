---
name: luvinico-sanity-cms
description: Manages the Luvinico Sanity CMS — schema design, Studio config, GROQ queries, and Next.js static-export integration aligned with frontend product/category/article models. Use when working in cms/, creating Sanity schemas, migrating mockData to Sanity, or connecting the frontend to Sanity content.
---

# Luvinico Sanity CMS

## Quick start

1. Work in `cms/` directory
2. Schemas live in `cms/schemaTypes/` — register in `schemaTypes/index.js`
3. Run `npm run dev` for Studio at localhost:3333
4. Align all schemas with frontend data in `frontend/src/mockData.js` and `frontend/src/data/`

Also load the global **`sanity-best-practices`** skill for detailed Sanity patterns (GROQ, TypeGen, images, Portable Text).

## Studio config

| Setting | Value |
|---------|-------|
| Project ID | `sfqhf74q` |
| Dataset | `production` |
| Config | `cms/sanity.config.js` |
| CLI | `cms/sanity.cli.js` |

## Recommended schema types

Create one file per type in `cms/schemaTypes/`:

### `product.js`

Maps to frontend product objects. Fields:

- `name` (string, required)
- `slug` (slug, source: name, ASCII)
- `price` (string — display format e.g. `450.000 đ`)
- `origin`, `style`, `abv`, `description` (string/text)
- `category` (reference → category)
- `type` (string — tag slug e.g. `ruou-vang-phap`)
- `image` (image, hotspot, alt required)
- `gallery` (array of images)

### `category.js`

Maps to `frontend/src/data/categories.js`:

- `key` (string, required — e.g. `ruou-vang`)
- `title`, `eyebrow`, `description`
- `slug` (slug, source: key)

### `article.js`

Knowledge posts for `/kien-thuc/[slug]/`:

- `title`, `slug`, `excerpt`, `publishedAt`
- `coverImage` (image + alt)
- `body` (Portable Text)

### `policy.js`

Legal/info pages for `/chinh-sach/[slug]/`:

- `title`, `slug`
- `body` (Portable Text or markdown block)

### `banner.js`

Hero carousel slides:

- `title`, `image` (desktop + mobile variants)
- `link`, `order`, `active` (boolean)

## Schema file pattern

```javascript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (r) => r.required(),
    }),
    // ...
  ],
  preview: {select: {title: 'name', media: 'image'}},
})
```

Register in `schemaTypes/index.js`:

```javascript
import product from './product'
import category from './category'

export const schemaTypes = [product, category]
```

## GROQ examples

```groq
// All products with category
*[_type == "product"] | order(name asc) {
  _id, name, "slug": slug.current, price, origin, abv, style, type,
  "category": category->key,
  "image": image.asset->url,
  "gallery": gallery[].asset->url
}

// Single product by slug
*[_type == "product" && slug.current == $slug][0]{ ... }

// Active banners
*[_type == "banner" && active == true] | order(order asc)
```

## Frontend integration (Cloudflare Workers)

The frontend runs on Cloudflare Workers via OpenNext — fetch Sanity **server-side at runtime**.

### Already implemented

- `frontend/src/lib/sanity/client.js` — Sanity client
- `frontend/src/lib/sanity/productStore.js` — cached fetch with mock fallback
- Content pages: `export const revalidate = 60`

### Env vars

```
NEXT_PUBLIC_SANITY_PROJECT_ID=sfqhf74q
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=   # optional
```

Set in `.env.local` and Cloudflare Workers dashboard.

### Adding new content types

1. Define schema in `cms/schemaTypes/`
2. Add GROQ query in `frontend/src/lib/sanity/queries.js`
3. Create mapper + store function
4. Use in async Server Component page with `revalidate = 60`

## Migration workflow (mockData → Sanity)

1. Populate products in Sanity Studio
2. Match slug keys to existing frontend URLs
3. Verify pages render from Sanity (mock fallback stops when Sanity has data)
4. Run `npm run build` in `frontend/` to verify Worker build

## Do not

- Hardcode document `_id` for ordinary content
- Break slug compatibility with existing frontend routes
- Use `output: 'export'` — project requires runtime Sanity fetch

## Additional resources

- Frontend data shapes: [reference.md](reference.md)
- Deep Sanity patterns: global `sanity-best-practices` skill
