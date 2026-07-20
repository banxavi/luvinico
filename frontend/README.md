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

Add `SANITY_REVALIDATE_SECRET` (same value as the Sanity webhook secret) so CMS publishes trigger on-demand cache revalidation via `POST /api/revalidate/`.

## Sanity webhook (on-demand revalidate)

1. Generate a secret, e.g. `openssl rand -hex 32`
2. Add to `frontend/.env.local` and Cloudflare Workers secrets:
   ```
   SANITY_REVALIDATE_SECRET=your-secret
   ```
3. In [Sanity Manage → API → Webhooks](https://www.sanity.io/manage/project/sfqhf74q/api/webhooks), create:
   - **URL:** `https://YOUR_DOMAIN/api/revalidate/`
   - **Dataset:** `production`
   - **Trigger:** Create, Update, Delete
   - **Filter:** `_type in ["product", "category", "article"]`
   - **Projection:** `{ "_type": _type, "slug": coalesce(slug.current, slug) }`
   - **Secret:** same as `SANITY_REVALIDATE_SECRET`
4. Publish in Studio → site updates within ~1s (no hard refresh needed in production)

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
