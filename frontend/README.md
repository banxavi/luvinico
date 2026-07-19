# LUVINI & CO. — Premium Beer & Wine Landing Page

Next.js App Router site for curated imported beer and wine (personal/non-commercial project).

## Commands

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # OpenNext → Cloudflare Worker build
npm run preview   # local Worker preview
npm run deploy    # build + deploy to Cloudflare
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=sfqhf74q
NEXT_PUBLIC_SANITY_DATASET=production
```

Set the same vars in the Cloudflare Workers dashboard for production. Add `SANITY_API_READ_TOKEN` only if the dataset is private.

## Stack

- **Next.js 16** (App Router) on **Cloudflare Workers** via OpenNext
- **React 19**
- **Tailwind CSS v4**
- **Sanity CMS** — server-side fetch with mock data fallback
- **Sanity Studio** in `../cms/`

## Deploy

Deploy target is **Cloudflare Workers** (not static Pages export):

```bash
npm run deploy
```

Requires Wrangler auth (`wrangler login`). Worker config: `wrangler.jsonc`.
