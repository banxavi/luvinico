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
| `NEXT_PUBLIC_SITE_URL` | Variable | Nên trùng build |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Variable | Đã có sẵn trong `wrangler.jsonc` |
| `NEXT_PUBLIC_SANITY_DATASET` | Variable | Đã có sẵn trong `wrangler.jsonc` |
| `SANITY_API_READ_TOKEN` | **Secret** | Chỉ khi dataset private |
| `SANITY_REVALIDATE_SECRET` | **Secret** | Webhook revalidate |

### Không set trên Cloudflare

| Name | Lý do |
|------|--------|
| `SANITY_STUDIO_DEV_ORIGIN` | Chỉ local iframe `/admin` |

## `/admin` production

1. Deploy Studio: `cd cms && npm run deploy`
2. Deploy proxy: `cd workers/sanity-admin-proxy` — set `STUDIO_ORIGIN`, `npm run deploy`
3. Route zone: `[domain]/admin*` → Worker **`luvinico-sanity-admin-proxy`**
4. Route còn lại: Worker **`luvinico`**

Không nhúng Studio vào Next. Push Git chỉ auto-deploy **frontend** (Worker `luvinico`). Proxy + Studio deploy tay khi cần.

## Checklist trước push

- [ ] `frontend/package-lock.json` đã sync (`npm run lockfile:sync` nếu vừa đổi deps)
- [ ] Không commit `.env.local`
- [ ] Build variables đã set trên CF
- [ ] Route `/admin*` trỏ proxy (nếu dùng Studio trên domain chính)
