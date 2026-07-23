# Sanity Studio proxy (`/admin` → `*.sanity.studio`)

Worker riêng — **không** nằm trong bundle Next.js/OpenNext.

## 1. Sanity Studio (repo `cms/`)

`cms/sanity.config.js`: `basePath: '/admin'`.

```bash
cd cms
npm run deploy
```

Kiểm tra upstream: `https://[TEN-DU-AN].sanity.studio/admin/`

CORS: xem `cms/CORS.md`.

## 2. Deploy Worker proxy

```bash
cd workers/sanity-admin-proxy
npm install
# wrangler.jsonc → STUDIO_ORIGIN
npm run deploy
npm run test:smoke -- https://[TEN-DU-AN].sanity.studio
PROXY_BASE=https://[DOMAIN-CHINH] npm run test:smoke -- https://[TEN-DU-AN].sanity.studio
```

## 3. Cloudflare Dashboard

**Workers & Pages → `luvinico-sanity-admin-proxy` → Domains & Routes → Add route**

- `example.com/admin*`
- `www.example.com/admin*` (nếu cần)

Worker OpenNext (`luvinico`) giữ mọi route khác.

**Cache Rules (khuyến nghị):** URI Path starts with `/admin` → Bypass cache. Worker cũng gửi `Cache-Control: no-store` cho HTML/API mutable.

## 4. Test local

Xem **`LOCAL-TEST.md`** (2 terminal: `cms` port 3333 + proxy port 8787).

## 5. Checklist sau deploy

| Mục | Cách kiểm tra |
|-----|----------------|
| [ ] HTML `/admin/` trên domain chính | `npm run test:smoke` với `PROXY_BASE` |
| [ ] Asset JS/CSS 200 | smoke `/admin/static/` |
| [ ] Deep link SPA | F5 tại `/admin/desk/...`; Worker fallback shell nếu upstream 404 |
| [ ] Login Sanity | Thủ công; so sánh với `*.sanity.studio/admin/` |
| [ ] Publish document | Thủ công + CORS đã cấu hình |
| [ ] Sau `sanity deploy` | Hard refresh; không stale (bypass cache) |
| [ ] Next.js không có `/admin` | ✅ đã gỡ embed trong `frontend/` |

## 5. Rủi ro

Auth cookie/OAuth trên domain tùy biến, redirect `Location` (Worker rewrite), không proxy WebSocket.
