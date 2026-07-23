# Cloudflare Workers Builds (push → auto deploy)

Site Worker: **`luvinico`** (OpenNext). Root directory trong Dashboard: **`frontend`**.

## Build settings (Workers & Pages → luvinico → Settings → Builds)

| Field | Value |
|-------|--------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Version command | (để trống / mặc định) |

`npm run build` → `opennextjs-cloudflare build` (xem `scripts/build.mjs`).  
`npm ci` dùng `package-lock.json` (npm 10). Sau khi đổi deps: `npm run lockfile:sync` rồi commit lockfile.

## Env — set tay trên Dashboard

### Build variables (cần lúc `next build`)

| Name | Example |
|------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `sfqhf74q` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

### Worker variables / secrets (runtime)

| Name | Type | Ghi chú |
|------|------|---------|
| `NEXT_PUBLIC_SITE_URL` | Variable | vd. `https://luvinico.banxavi.workers.dev` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Variable | Đã có trong `wrangler.jsonc` |
| `NEXT_PUBLIC_SANITY_DATASET` | Variable | Đã có trong `wrangler.jsonc` |
| `SANITY_STUDIO_ORIGIN` | Variable | `https://luvini.sanity.studio` — proxy `/admin` (demo trên workers.dev) |
| `SANITY_API_READ_TOKEN` | **Secret** | Chỉ khi dataset private |
| `SANITY_REVALIDATE_SECRET` | **Secret** | Webhook revalidate |

### Không set trên Cloudflare

| Name | Lý do |
|------|--------|
| `SANITY_STUDIO_DEV_ORIGIN` | Chỉ local iframe → `cms` Vite |

## `/admin` trên workers.dev (demo khách)

Không cần domain riêng và không cần Worker proxy tách:

1. Studio đã deploy: `https://luvini.sanity.studio/admin/`
2. Worker `luvinico` có `SANITY_STUDIO_ORIGIN=https://luvini.sanity.studio`
3. Middleware proxy `/admin/*` → Studio hosted
4. Demo: **https://luvinico.banxavi.workers.dev/admin/**

CORS: thêm `https://luvinico.banxavi.workers.dev`

Worker `sanity-admin-proxy` chỉ cần khi sau này dùng custom domain tách route.

## Data / Sanity trên Workers

OpenNext chưa cấu hình KV cache → Sanity dùng `cache: 'no-store'` + `dynamic = 'force-dynamic'`.

Chống **Error 1102** (CPU limit) khi catalog lớn:

- List products/categories chỉ lấy field nhẹ (`productListFields`, không Portable Text)
- Cache memory TTL ~30s trong isolate (`SANITY_MEMORY_CACHE_SECONDS`)
- Timeout fetch Sanity 8s (`SANITY_FETCH_TIMEOUT_MS`)
- Lỗi Sanity → trả `[]` / empty catalog, **không crash** trang
- `wrangler.jsonc` → `limits.cpu_ms: 60000` (Paid)

Sau publish CMS: tối đa ~30s (hoặc F5 sau TTL) là thấy data mới.

- [ ] `frontend/package-lock.json` đã sync (`npm run lockfile:sync` nếu vừa đổi deps)
- [ ] Không commit `.env.local`
- [ ] Build variables đã set trên CF
- [ ] Route `/admin*` trỏ proxy (nếu dùng Studio trên domain chính)
