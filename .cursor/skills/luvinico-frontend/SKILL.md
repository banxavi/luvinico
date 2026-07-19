---
name: luvinico-frontend
description: Develops the Luvinico Next.js frontend on Cloudflare Workers — App Router SSR, Sanity API fetching, Tailwind v4 UI, SEO, and OpenNext deploy. Use when working in frontend/, adding pages or components, Sanity productStore, catalog/search/product routes, or deploying to Cloudflare Workers.
---

# Luvinico Frontend

## Quick start

1. Read `frontend/PROJECT_CONTEXT.md` and the active file's neighbors
2. Prefer Server Components; `'use client'` only when needed
3. Fetch products via `getProducts()` from `lib/sanity/productStore.js`
4. Run from `frontend/`: `npm run dev`, `npm run build`, `npm run deploy`

## Architecture

```
frontend/src/
├── app/              # Routes (App Router, async Server Components)
├── components/       # UI by domain
├── context/          # ProductDataContext (client nav)
├── data/             # Static config (categories, brand)
├── lib/sanity/       # Sanity client, queries, productStore
└── mockData.js       # Fallback when Sanity unavailable
```

## Data access

```javascript
import { getProducts, getProductBySlugFromStore } from '../lib/sanity/productStore';
import { CATEGORIES } from '../data/categories';
import { BRAND } from '../data/brand';
```

Do **not** import `mockProducts` directly in pages — use `productStore`.

### Revalidation

Content pages export `export const revalidate = 60` for cached Sanity fetches on the Worker.

### Client boundary

`PageLayout` fetches products server-side and passes to `ProductDataProvider` for client nav/search.

## Deploy

Cloudflare **Workers** via OpenNext — **not** static export.

```bash
npm run build     # node scripts/build.mjs → OpenNext Worker build
npm run preview   # local Worker preview
npm run deploy    # build + wrangler deploy
```

Config: `wrangler.jsonc`, `open-next.config.ts`.

## Do not

- Add `output: 'export'` or static-only patterns
- Import mockData in pages (use productStore)
- Add `export const runtime = 'edge'` in source files
- Remove age-gate or footer legal warning

## Audit (required before finishing)

Report PASS/WARNING for: Performance, SEO, Accessibility, Maintainability.

## Additional resources

- Route & data mapping: [reference.md](reference.md)
