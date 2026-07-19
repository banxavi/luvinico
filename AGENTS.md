# Luvinico — Agent Guide

Monorepo for **LUVINI & CO.**, a premium imported wine & beer site (Vietnamese, personal/non-commercial).

## Packages

| Directory | Stack | Dev command |
|-----------|-------|-------------|
| `frontend/` | Next.js 16, React 19, Tailwind v4, OpenNext → **Cloudflare Workers** | `cd frontend && npm run dev` |
| `cms/` | Sanity Studio v6 (`sfqhf74q` / `production`) | `cd cms && npm run dev` |

## Cursor rules (`.cursor/rules/`)

- **luvinico-project** — always applies: monorepo overview, brand, legal, audit
- **frontend-nextjs** — applies to `frontend/**`
- **cms-sanity** — applies to `cms/**`
- **cloudflare-deployment** — applies to `frontend/**`

## Cursor skills (`.cursor/skills/`)

- **luvinico-frontend** — Next.js pages, components, static data, SEO, Cloudflare deploy
- **luvinico-sanity-cms** — Sanity schemas, GROQ, mockData migration, FE integration

Also use the global **sanity-best-practices** skill for detailed Sanity patterns.

## Key docs

- `frontend/PROJECT_CONTEXT.md` — design & architecture
- `frontend/README.md` — commands & env vars

## Current state

- Frontend fetches products from **Sanity API** on Cloudflare Workers (falls back to `mockData.js`)
- Sanity Studio has `product` and `category` schemas — populate content in Studio
- Deploy: `cd frontend && npm run deploy` (OpenNext → Cloudflare Workers)
