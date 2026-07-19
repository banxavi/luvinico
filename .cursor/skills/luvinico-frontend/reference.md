# Frontend Reference

## Routes

| URL pattern | Source | Notes |
|-------------|--------|-------|
| `/` | `app/page.jsx` | Home — fetches products from Sanity |
| `/[categoryKey]/` | `app/[categoryKey]/page.jsx` | Category catalog |
| `/product/{slug}/` | `app/product/[productSlug]/page.jsx` | Dynamic — no generateStaticParams |
| `/kien-thuc/` | `app/kien-thuc/page.jsx` | Knowledge index |
| `/chinh-sach/{slug}/` | `app/chinh-sach/[policySlug]/page.jsx` | Policy markdown |
| `/tag/`, `/tag/{typeSlug}/` | `app/tag/` | Product type filters |
| `/search/` | `app/search/page.jsx` | Query param `q` |

All routes use trailing slashes. Content pages use `revalidate = 60`.

## Sanity integration

| File | Purpose |
|------|---------|
| `lib/sanity/client.js` | `@sanity/client` instance, revalidate seconds |
| `lib/sanity/queries.js` | GROQ queries |
| `lib/sanity/mapProduct.js` | Sanity doc → frontend shape |
| `lib/sanity/productStore.js` | `getProducts()`, `getProductBySlugFromStore()` |

## Environment

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=sfqhf74q
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # optional
```

Set in `.env.local` (dev) and Cloudflare Workers dashboard (prod).

## Deploy commands

```bash
cd frontend
npm run dev          # localhost:3000
npm run build        # OpenNext Worker build
npm run preview      # local Worker preview
npm run deploy       # build + deploy
```

## Component map

| Domain | Examples |
|--------|----------|
| `layout/` | PageLayout, SiteHeader, Footer |
| `product/` | ProductCard, ProductGrid, ProductDetailContent |
| `sections/` | HeroBannerSlider, BestSellersSection |
| `context/` | ProductDataProvider, useProducts() |
