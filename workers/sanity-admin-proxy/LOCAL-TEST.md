# Test local: `/admin` qua proxy (giống production)

Mô phỏng: trình duyệt → `http://localhost:8787/admin/` (domain “giả”) → proxy Worker → Studio `cms` dev.

## Bước 0 — CORS (một lần)

[Sanity Manage → CORS](https://www.sanity.io/manage/project/sfqhf74q/api) thêm:

- `http://localhost:8787` (proxy local)
- `http://127.0.0.1:8787` (nếu dùng IP)
- Bật **Allow credentials** nếu login báo lỗi CORS

## Bước 1 — Studio upstream (terminal 1)

```bash
cd cms
npm install
npm run dev
```

Mở thử trực tiếp: **http://localhost:3333/admin/** — phải thấy Studio.

## Bước 2 — Proxy Worker (terminal 2)

```bash
cd workers/sanity-admin-proxy
npm install
copy .dev.vars.example .dev.vars
npm run dev
```

(Mac/Linux: `cp .dev.vars.example .dev.vars`)

Mở qua proxy: **http://localhost:8787/admin/** — URL bar vẫn `localhost:8787`, giao diện giống bước 1.

## Bước 3 — Smoke test (terminal 3)

**Chỉ chạy khi terminal 1 + 2 đang bật.**

```bash
cd workers/sanity-admin-proxy
npm run test:smoke:local
```

Nếu báo `ECONNREFUSED` dù Studio mở được trên browser → đổi `.dev.vars` và smoke test sang **`http://localhost:3333`** (không dùng `127.0.0.1` trên Windows).

Mở proxy: **http://localhost:8787/admin/** (gốc `/` sẽ redirect sang `/admin/`).

```bash
node scripts/smoke-test.mjs http://127.0.0.1:3333
PROXY_BASE=http://127.0.0.1:8787 node scripts/smoke-test.mjs http://127.0.0.1:3333
```

## Checklist tay (local)

- [ ] http://localhost:8787/admin/ — Studio load, tab Network: JS/CSS từ `8787/admin/...`
- [ ] Deep link: http://localhost:8787/admin/desk — F5 không trắng trang
- [ ] Đăng nhập Sanity + publish 1 document — site Next (`npm run dev` ở `frontend`) thấy data sau ~60s

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|-------------|------------|
| Proxy 502 / connection refused | Chưa chạy `cms` dev (port 3333) |
| Studio trắng, lỗi CORS trong Console | Thêm `http://localhost:8787` vào Sanity CORS |
| `/admin/static/` smoke FAIL trên dev | Bình thường với Vite dev; chỉ cần HTML `/admin/` OK |
