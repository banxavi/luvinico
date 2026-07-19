# PROJECT CONTEXT & INSTRUCTIONS FOR CURSOR AI

## 1. Project Overview
- **Project Type:** Premium imported wine & beer e-commerce landing site (phi thương mại/personal project).
- **Design Style:** Elite, luxury, premium dark mode. Gold accents, white text, elegant serif headings.
- **Key Metric:** Mobile-first — responsive layout, thumb-friendly CTAs, fast images.

## 2. Tech Stack & Environment
- **Framework:** Next.js 16 (App Router) with React 19.
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`).
- **CMS:** Sanity (`sfqhf74q` / `production`) — products fetched server-side via `@sanity/client`.
- **Fallback data:** `src/mockData.js` when Sanity is empty or unreachable.
- **Deployment:** Cloudflare **Workers** via `@opennextjs/cloudflare` (SSR + ISR revalidate, not static export).

## 3. Data Layer
- **Primary:** `src/lib/sanity/productStore.js` — `getProducts()`, `getProductBySlugFromStore()`
- **Static config:** `src/data/*.js` (categories, brand, policies)
- **Helpers:** `src/lib/*.js` (catalog, seo, search, products)

Content pages use `export const revalidate = 60` for cached Sanity fetches on the Worker.

## 4. Coding Guidelines
- Server Components by default; `'use client'` only for interactivity.
- Reusable components: Header, Footer, ProductGrid, InquiryForm, etc.
- Inquiry form: client-side only (Zalo/Messenger, mailto, Formspree).
- Legal: Age Gate modal **or** footer warning: "Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai".

## 5. Environment Variables
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=sfqhf74q
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=   # optional
```

## 6. Deploy Commands
```bash
npm run dev       # local Next.js dev server
npm run build     # OpenNext Worker build (CI entry point)
npm run preview   # local Worker preview
npm run deploy    # build + deploy to Cloudflare
```
