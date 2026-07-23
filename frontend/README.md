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
- **Sanity Studio** deploy riêng (`cms/`), proxy `/admin` qua `workers/sanity-admin-proxy/`

## CMS (`/admin`)

### Local (giống production: một domain)

1. Thêm vào `frontend/.env.local`:
   ```
   SANITY_STUDIO_DEV_ORIGIN=http://localhost:3333
   ```
2. **Terminal A:** `cd cms && npm run dev` (Studio upstream)
3. **Terminal B:** `cd frontend && npm run dev`
4. Mở **http://localhost:3000/admin/** — trang iframe full-screen tới Studio `:3333` (URL bar vẫn `:3000`). Không proxy Vite HMR qua Next (dễ lỗi `__HMR_CONFIG_NAME__`).

Restart `npm run dev` sau khi đổi `.env.local`. Production vẫn dùng Worker proxy (`workers/sanity-admin-proxy/`).

[CORS](https://www.sanity.io/manage/project/sfqhf74q/api): thêm **`http://localhost:3000`**.

### Production

`cms/` deploy + Worker proxy — `../workers/sanity-admin-proxy/README.md` (không set `SANITY_STUDIO_DEV_ORIGIN` trên Cloudflare).

### Phân quyền (content admin vs super admin)

Trong [Sanity Manage → Members](https://www.sanity.io/manage/project/sfqhf74q/members):

| Vai trò Sanity | Dùng cho | Studio `/admin` |
|----------------|----------|-----------------|
| **Editor** | Nhập/sửa nội dung | Không thấy **Manage project**, không có tool **Vision** |
| **Administrator** hoặc **Developer** | Dev / chủ site | Đủ menu quản trị dự án + Vision |

Mời biên tập viên bằng role **Editor** — không gán Administrator. Quyền thật sự vẫn do Sanity RBAC trên server; UI Studio chỉ ẩn thêm các nút quản trị dự án.

## Deploy

Deploy target is **Cloudflare Workers** (not static Pages export).

**Push → auto deploy:** cấu hình Workers Builds — xem **[CF-BUILDS.md](./CF-BUILDS.md)** (root `frontend`, `npm run build`, `npx wrangler deploy`). Env set tay trên Dashboard.

Local / one-shot:

```bash
npm run deploy
```

Requires Wrangler auth (`wrangler login`). Worker config: `wrangler.jsonc`.
