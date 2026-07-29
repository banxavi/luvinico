# LUVINI & CO. — Project Guide (English)

> Vietnamese version: [GUIDE.vi.md](./GUIDE.vi.md)

Developer guide for the **LUVINI & CO.** premium wine & imported beer landing site (personal / non-commercial).

---

## 1. Overview

| Item | Detail |
| --- | --- |
| **Brand** | LUVINI & CO. — *"The Art of Fine Taste"* · Curated Fine Wine & Imported Beer |
| **Goal** | Showcase products, brand story, and drive contact (Zalo / phone) |
| **Data** | Static mock data only — no database or CMS |
| **UI** | Premium dark theme, gold accents, mobile-first |
| **Legal** | 18+ warning on product pages and footer |

The site is a multi-page Next.js App Router app with **static export** (`output: 'export'`), deployed on **Cloudflare Pages** (publish directory `out/`).

---

## 2. Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router) |
| UI | **React 19** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `src/app/globals.css`) |
| Carousels | Embla Carousel |
| Markdown | `marked` (policy / knowledge content) |
| Deploy | **Cloudflare Pages** (static HTML export → `out/`) |
| Images | Next.js `Image` (unoptimized for static export) |

---

## 3. Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm

### Install & run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
npm run start        # serves the Next build locally (optional)
npm run lint
```

### Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set your real domain:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This value is used for sitemap, canonical URLs, Open Graph, and indexability (`localhost` is not indexed).

### Deploy to Cloudflare Pages

`next.config.js` uses `output: 'export'` and `images.unoptimized: true`, so `npm run build` writes static files to **`out/`**.

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Import an existing Git repository**.
3. Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (repo root) |
| Node.js version | `20` (or newer LTS) |

4. Environment variables (Production + Preview):

```env
NEXT_PUBLIC_SITE_URL=https://your-project.pages.dev
```

After you attach a custom domain, update this to that domain and redeploy.

5. Deploy. You get `*.pages.dev`; every push to the production branch rebuilds automatically. Pull requests get preview deployments.

#### Checklist after first deploy

- [ ] Open the `*.pages.dev` URL — home, category, product, search
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live URL (canonical / OG / sitemap)
- [ ] Custom domain: Pages → **Custom domains** → add DNS
- [ ] 18+ footer / product warning still visible

---

## 4. Project structure

```
luvinico/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.jsx            # Home
│   │   ├── layout.jsx          # Root layout, fonts, metadata
│   │   ├── globals.css         # Tailwind v4 + design tokens
│   │   ├── [categoryKey]/     # Category catalogs (/bia, /ruou-vang, …)
│   │   ├── product/[productSlug]/
│   │   ├── search/
│   │   ├── tag/                # Product type / sub-tab catalogs
│   │   ├── kien-thuc/          # Knowledge articles
│   │   ├── chinh-sach/         # Policy pages (Markdown)
│   │   ├── khuyen-mai/
│   │   ├── sitemap.js
│   │   └── robots.js
│   ├── components/
│   │   ├── layout/             # Header, Footer, PageLayout, search
│   │   ├── sections/           # Home sections (Hero, USP, …)
│   │   ├── product/            # Cards, grid, gallery, carousel
│   │   ├── search/             # Filters
│   │   ├── knowledge/
│   │   ├── forms/              # InquiryForm (client-side)
│   │   ├── seo/
│   │   └── ui/                 # Shared UI primitives
│   ├── data/                   # Brand, nav, categories, articles, policy MD
│   ├── lib/                    # Products, SEO, search, catalog helpers
│   ├── assets/                 # Local product / banner images
│   └── mockData.js             # Product list (source of truth)
├── public/
├── PROJECT_CONTEXT.md          # Cursor AI project rules
├── GUIDE.md                    # This file (EN)
├── GUIDE.vi.md                 # Vietnamese guide
└── package.json
```

---

## 5. Routes

| URL | Page |
| --- | --- |
| `/` | Home (hero, bestsellers, value deals, story, USP) |
| `/bia`, `/ruou-vang`, `/ruou-manh`, `/qua-tet`, `/phu-kien` | Category catalogs |
| `/tag/{typeSlug}` | Product type / brand sub-tab (e.g. `/tag/paulaner`) |
| `/product/{slug}` | Product detail |
| `/search?q=...` | Search results |
| `/kien-thuc`, `/kien-thuc/{articleSlug}` | Knowledge hub |
| `/chinh-sach/{policySlug}` | Policies (shipping, privacy, returns, …) |
| `/khuyen-mai` | Promotions placeholder |

Trailing slashes are enabled (`trailingSlash: true` in `next.config.js`).

---

## 6. Data model

### Products — `src/mockData.js`

Each product should include:

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Unique number |
| `name` | yes | Used to generate URL slug |
| `image` | yes | Card image (from `clientAssets`) |
| `gallery` | recommended | Detail gallery (up to 3 shown) |
| `price` | yes | Display string, e.g. `'450.000 đ'` |
| `salePrice` | no | If set, shows discounted price |
| `origin` | yes | Country / region |
| `style` | yes | Style label (e.g. Vang đỏ, Trappist Ale) |
| `category` | yes | Key from `CATEGORIES` |
| `type` | yes | Key from `PRODUCT_TYPES` (nav sub-tab) |
| `abv` | yes | Alcohol % string |
| `description` | yes | Short marketing text |

Optional detail extras live in `src/data/productDetails.js` (merged by id in `lib/products.js`).

### Categories — `src/data/categories.js`

Keys: `ruou-vang`, `ruou-manh`, `bia`, `qua-tet`, `phu-kien`.

### Types (sub-tabs) — `src/data/productTypes.js`

Maps brand/type slugs to a category and optional parent group (used by nav mega-menu and `/tag/...`).

### Navigation — `src/data/navMenu.js`

Hierarchical parent → sub-tab menus per category (Beer, Wine, Gift sets, …).

### Brand — `src/data/brand.js`

Single source for name, tagline, hotline, Facebook, email.

### Assets — `src/data/clientAssets.js`

Central map of imported images used by products and banners.

---

## 7. How to add a product

1. Add images under `src/assets/...` and register them in `src/data/clientAssets.js`.
2. Append an object to `rawProducts` in `src/mockData.js` with a unique `id`, correct `category` and `type`.
3. If the type/brand is new:
   - Add it to `src/data/productTypes.js`
   - Wire the sub-tab in `src/data/navMenu.js`
4. (Optional) Add long-form detail fields in `src/data/productDetails.js` keyed by `id`.
5. Run `npm run dev` and open `/product/{auto-slug}` (slug is generated from the name via `slugify`).

No CMS or API restart is required — data is bundled at build time.

---

## 8. Architecture notes

### Prefer Server Components

Pages under `src/app` are Server Components by default. Use `"use client"` only for interactivity (carousels, search UI, scroll handlers, forms).

### Product helpers — `src/lib/products.js`

- `slugify` / `getProductSlug` / `productPath`
- `getProductBySlug` / `getProductById`
- `getProductGallery`
- Legacy numeric URLs `/product/15` can redirect to the slug URL

### SEO — `src/lib/seo.js` + `src/lib/site.js`

- Titles: `LUVINI & CO. | {page}`
- `createPageMetadata()` for consistent OG + title
- `getSiteUrl()` / `isIndexableSite()` gate robots indexing

### Contact / inquiry

Client-side only: Zalo deep link + `tel:` from `src/lib/links.js` and `BRAND.hotline`. No server form posting.

### Legal compliance

Always keep the warning:

> Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai

Shown on product detail and reinforced in the footer.

---

## 9. Design system

Defined in `src/app/globals.css` (`@theme`):

| Token | Value | Tailwind usage |
| --- | --- | --- |
| Premium black | `#111111` | `bg-premium-black` |
| Premium dark | `#212121` | `bg-premium-dark` |
| Premium gold | `#d4a017` | `text-premium-gold`, `bg-premium-gold` |

**Fonts** (loaded in `layout.jsx`):

- **Be Vietnam Pro** — body (`--font-sans`)
- **Playfair Display** — serif accents (`--font-serif`)
- **Cormorant Garamond** — brand display (`--font-brand`)

Layout width: `.site-container` (max ~1400px, responsive gutters).

---

## 10. Key components

| Component | Role |
| --- | --- |
| `PageLayout` | Wraps all pages (header/footer shell) |
| `SiteHeader` / `Header` | Sticky nav, category menus, Zalo/Call |
| `Footer` | Links, hotline, 18+ notice |
| `HeroSection` | Full-bleed home hero + CTA |
| `BestSellersSection` / `ValueDealsSection` | Product carousels |
| `ProductCard` / `ProductGrid` | Catalog listing |
| `ProductFeaturedCarousel` | Embla-based featured rows |
| `InquiryForm` | Lightweight contact CTA |
| `ProductJsonLd` | Structured data for product pages |

---

## 11. Conventions for contributors

Follow `PROJECT_CONTEXT.md`:

- Mobile-first, thumb-friendly CTAs, fast images
- Prefer Next.js core + semantic HTML + Tailwind — avoid extra packages
- No database; keep products in static mock data
- Prefer Server Components; minimize client JS
- Meaningful names; avoid flaky dynamic layouts
- Use premium color utilities consistently

---

## 12. Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js dev server |
| `npm run build` | Production static export → `out/` |
| `npm run start` | Serve a local Next production build |
| `npm run lint` | ESLint (Next config) |

---

## 13. Related docs

| File | Purpose |
| --- | --- |
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Rules for Cursor AI / coding standards |
| [README.md](./README.md) | Quick start |
| [DEMO.md](./DEMO.md) | Older demo notes (may lag behind Next.js migration) |
| [GUIDE.vi.md](./GUIDE.vi.md) | Vietnamese guide |

---

## Audit (documentation)

- **Performance:** PASS — guide documents static data and Server Components; no runtime impact.
- **SEO:** PASS — documents metadata, sitemap, and `NEXT_PUBLIC_SITE_URL`.
- **Accessibility:** PASS — notes 18+ warnings and semantic layout expectations.
- **Maintainability:** PASS — bilingual guides keep onboarding consistent.
