# Sanity API — CORS (bắt buộc khi Studio qua domain site chính)

[Sanity Manage → API → CORS origins](https://www.sanity.io/manage/project/sfqhf74q/api)

Thêm từng origin (không wildcard):

| Origin | Ghi chú |
|--------|---------|
| `https://[DOMAIN-CHINH]` | Production (proxy `/admin`) |
| `https://www.[DOMAIN-CHINH]` | Nếu dùng www |
| `http://localhost:3000` | Next.js dev — `/admin` rewrite tới Studio |
| `http://localhost:3333` | `cms` dev Studio (upstream local) |
| `http://127.0.0.1:3333` | Cùng upstream (nếu dùng IP) |
| `http://localhost:8787` | Proxy Worker local (`wrangler dev`) |

Bật **Allow credentials** nếu Studio yêu cầu cookie/session trên domain bạn.

Sau khi lưu, chạy smoke test:

```bash
cd workers/sanity-admin-proxy
node scripts/smoke-test.mjs https://[TEN-DU-AN].sanity.studio
PROXY_BASE=https://[DOMAIN-CHINH] node scripts/smoke-test.mjs https://[TEN-DU-AN].sanity.studio
```
