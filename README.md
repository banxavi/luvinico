# LUVINI & CO. — Premium Beer & Wine Landing Page

Next.js App Router site for curated imported beer and wine (personal/non-commercial project).

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Environment

Copy `.env.example` to `.env.local` and set your production URL:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for sitemap, canonical URLs, and Open Graph metadata.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** — `src/app/globals.css` + `@tailwindcss/postcss`
- Static product data in `src/mockData.js`

## Deploy

Deploy to Vercel as a standard Next.js project (no SPA rewrites needed).
