# LUVINI & CO. — Premium Beer & Wine Landing Page

Next.js App Router site for curated imported beer and wine (personal/non-commercial project).

## Guides

- **English:** [GUIDE.md](./GUIDE.md)
- **Tiếng Việt:** [GUIDE.vi.md](./GUIDE.vi.md)
- Project rules for AI/contributors: [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
npm run start
npm run lint
```

## Environment

Create `.env.local` and set your production URL:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for sitemap, canonical URLs, and Open Graph metadata.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4** — `src/app/globals.css` + `@tailwindcss/postcss`
- Static product data in `src/mockData.js`

## Deploy (Cloudflare Pages)

Static export (`output: 'export'`) → publish folder **`out/`**.

In the Cloudflare Pages dashboard (Git connected):

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Env | `NEXT_PUBLIC_SITE_URL=https://your-domain.com` |

Full steps: [GUIDE.md](./GUIDE.md) · [GUIDE.vi.md](./GUIDE.vi.md).
