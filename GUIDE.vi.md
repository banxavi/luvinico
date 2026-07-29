# LUVINI & CO. — Hướng dẫn dự án (Tiếng Việt)

> English version: [GUIDE.md](./GUIDE.md)

Hướng dẫn dành cho developer của website **LUVINI & CO.** — landing rượu vang & bia nhập khẩu cao cấp (dự án cá nhân / phi thương mại).

---

## 1. Tổng quan

| Hạng mục | Chi tiết |
| --- | --- |
| **Thương hiệu** | LUVINI & CO. — *"The Art of Fine Taste"* · Curated Fine Wine & Imported Beer |
| **Mục tiêu** | Giới thiệu sản phẩm, câu chuyện thương hiệu, kêu gọi liên hệ (Zalo / gọi điện) |
| **Dữ liệu** | Chỉ mock data tĩnh — không database, không CMS |
| **Giao diện** | Nền tối premium, accent vàng gold, ưu tiên mobile |
| **Pháp lý** | Cảnh báo 18+ trên trang sản phẩm và footer |

Site là ứng dụng Next.js App Router nhiều trang, **static export** (`output: 'export'`), deploy trên **Cloudflare Pages** (thư mục publish `out/`).

---

## 2. Công nghệ

| Lớp | Lựa chọn |
| --- | --- |
| Framework | **Next.js 16** (App Router) |
| UI | **React 19** |
| Style | **Tailwind CSS v4** (`@import "tailwindcss"` trong `src/app/globals.css`) |
| Carousel | Embla Carousel |
| Markdown | `marked` (chính sách / kiến thức) |
| Deploy | **Cloudflare Pages** (static HTML export → `out/`) |
| Ảnh | Next.js `Image` (unoptimized vì static export) |

---

## 3. Bắt đầu nhanh

### Yêu cầu

- Node.js 20+ (khuyến nghị)
- npm

### Cài đặt & chạy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → out/
npm run start        # serve build local (tuỳ chọn)
npm run lint
```

### Biến môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Production — đặt domain thật:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Giá trị này dùng cho sitemap, canonical, Open Graph và cho phép index (localhost **không** được index).

### Deploy lên Cloudflare Pages

`next.config.js` dùng `output: 'export'` và `images.unoptimized: true`, nên `npm run build` xuất file tĩnh vào **`out/`**.

1. Đẩy repo lên GitHub / GitLab / Bitbucket.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Import an existing Git repository**.
3. Build settings:

| Tuỳ chọn | Giá trị |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (gốc repo) |
| Node.js version | `20` (hoặc LTS mới hơn) |

4. Biến môi trường (Production + Preview):

```env
NEXT_PUBLIC_SITE_URL=https://your-project.pages.dev
```

Sau khi gắn domain riêng, đổi biến này sang domain đó rồi deploy lại.

5. Deploy. Nhận subdomain `*.pages.dev`; mỗi push nhánh production sẽ build lại. Pull request có preview deployment.

#### Checklist sau lần deploy đầu

- [ ] Mở URL `*.pages.dev` — trang chủ, danh mục, chi tiết SP, tìm kiếm
- [ ] `NEXT_PUBLIC_SITE_URL` khớp URL thật (canonical / OG / sitemap)
- [ ] Domain riêng: Pages → **Custom domains** → thêm DNS
- [ ] Cảnh báo 18+ ở footer / trang sản phẩm vẫn hiện

---

## 4. Cấu trúc thư mục

```
luvinico/
├── src/
│   ├── app/                    # Các trang App Router
│   │   ├── page.jsx            # Trang chủ
│   │   ├── layout.jsx          # Layout gốc, font, metadata
│   │   ├── globals.css         # Tailwind v4 + design tokens
│   │   ├── [categoryKey]/     # Catalog danh mục (/bia, /ruou-vang, …)
│   │   ├── product/[productSlug]/
│   │   ├── search/
│   │   ├── tag/                # Catalog theo loại / sub-tab
│   │   ├── kien-thuc/          # Bài viết kiến thức
│   │   ├── chinh-sach/         # Trang chính sách (Markdown)
│   │   ├── khuyen-mai/
│   │   ├── sitemap.js
│   │   └── robots.js
│   ├── components/
│   │   ├── layout/             # Header, Footer, PageLayout, tìm kiếm
│   │   ├── sections/           # Section trang chủ (Hero, USP, …)
│   │   ├── product/            # Card, grid, gallery, carousel
│   │   ├── search/             # Bộ lọc
│   │   ├── knowledge/
│   │   ├── forms/              # InquiryForm (client-side)
│   │   ├── seo/
│   │   └── ui/                 # UI dùng chung
│   ├── data/                   # Brand, nav, danh mục, bài viết, policy MD
│   ├── lib/                    # Helper sản phẩm, SEO, search, catalog
│   ├── assets/                 # Ảnh sản phẩm / banner local
│   └── mockData.js             # Danh sách sản phẩm (nguồn chính)
├── public/
├── PROJECT_CONTEXT.md          # Quy tắc cho Cursor AI
├── GUIDE.md                    # Bản tiếng Anh
├── GUIDE.vi.md                 # File này (VI)
└── package.json
```

---

## 5. Đường dẫn (routes)

| URL | Màn hình |
| --- | --- |
| `/` | Trang chủ (hero, bán chạy, giá tốt, story, USP) |
| `/bia`, `/ruou-vang`, `/ruou-manh`, `/qua-tet`, `/phu-kien` | Catalog theo danh mục |
| `/tag/{typeSlug}` | Theo loại / thương hiệu (vd. `/tag/paulaner`) |
| `/product/{slug}` | Chi tiết sản phẩm |
| `/search?q=...` | Kết quả tìm kiếm |
| `/kien-thuc`, `/kien-thuc/{articleSlug}` | Kiến thức |
| `/chinh-sach/{policySlug}` | Chính sách (vận chuyển, bảo mật, đổi trả, …) |
| `/khuyen-mai` | Khuyến mãi (placeholder) |

Site bật trailing slash (`trailingSlash: true` trong `next.config.js`).

---

## 6. Mô hình dữ liệu

### Sản phẩm — `src/mockData.js`

Mỗi sản phẩm cần có:

| Trường | Bắt buộc | Ghi chú |
| --- | --- | --- |
| `id` | có | Số duy nhất |
| `name` | có | Dùng để tạo slug URL |
| `image` | có | Ảnh card (từ `clientAssets`) |
| `gallery` | nên có | Gallery chi tiết (hiển thị tối đa 3) |
| `price` | có | Chuỗi hiển thị, vd. `'450.000 đ'` |
| `salePrice` | không | Nếu có thì hiện giá khuyến mãi |
| `origin` | có | Xuất xứ |
| `style` | có | Phong cách (Vang đỏ, Trappist Ale, …) |
| `category` | có | Key trong `CATEGORIES` |
| `type` | có | Key trong `PRODUCT_TYPES` (sub-tab menu) |
| `abv` | có | Nồng độ cồn |
| `description` | có | Mô tả ngắn |

Chi tiết dài (tuỳ chọn) nằm ở `src/data/productDetails.js` (gộp theo `id` trong `lib/products.js`).

### Danh mục — `src/data/categories.js`

Các key: `ruou-vang`, `ruou-manh`, `bia`, `qua-tet`, `phu-kien`.

### Loại (sub-tab) — `src/data/productTypes.js`

Ánh xạ slug thương hiệu/loại → danh mục và nhóm cha (dùng cho mega-menu và `/tag/...`).

### Menu — `src/data/navMenu.js`

Menu phân cấp parent → sub-tab theo từng danh mục (Bia, Vang, Quà Tết, …).

### Thương hiệu — `src/data/brand.js`

Nguồn duy nhất cho tên, tagline, hotline, Facebook, email.

### Assets — `src/data/clientAssets.js`

Map ảnh import dùng cho sản phẩm và banner.

---

## 7. Cách thêm sản phẩm

1. Thêm ảnh vào `src/assets/...` và đăng ký trong `src/data/clientAssets.js`.
2. Thêm object vào `rawProducts` trong `src/mockData.js` với `id` mới, `category` và `type` đúng.
3. Nếu loại/thương hiệu mới:
   - Thêm vào `src/data/productTypes.js`
   - Gắn sub-tab trong `src/data/navMenu.js`
4. (Tuỳ chọn) Thêm nội dung chi tiết dài trong `src/data/productDetails.js` theo `id`.
5. Chạy `npm run dev` và mở `/product/{slug-tự-sinh}` (slug tạo từ tên qua `slugify`).

Không cần CMS hay API — dữ liệu được bundle lúc build.

---

## 8. Ghi chú kiến trúc

### Ưu tiên Server Components

Các trang trong `src/app` mặc định là Server Components. Chỉ dùng `"use client"` khi cần tương tác (carousel, UI tìm kiếm, scroll handler, form).

### Helper sản phẩm — `src/lib/products.js`

- `slugify` / `getProductSlug` / `productPath`
- `getProductBySlug` / `getProductById`
- `getProductGallery`
- URL cũ dạng số `/product/15` có thể redirect sang slug

### SEO — `src/lib/seo.js` + `src/lib/site.js`

- Tiêu đề: `LUVINI & CO. | {trang}`
- `createPageMetadata()` thống nhất title + Open Graph
- `getSiteUrl()` / `isIndexableSite()` kiểm soát robots

### Liên hệ / tư vấn

Chỉ phía client: deep link Zalo + `tel:` từ `src/lib/links.js` và `BRAND.hotline`. Không gửi form lên server.

### Tuân thủ pháp lý

Luôn giữ cảnh báo:

> Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai

Hiển thị ở trang chi tiết sản phẩm và footer.

---

## 9. Design system

Khai báo trong `src/app/globals.css` (`@theme`):

| Token | Giá trị | Dùng với Tailwind |
| --- | --- | --- |
| Premium black | `#111111` | `bg-premium-black` |
| Premium dark | `#212121` | `bg-premium-dark` |
| Premium gold | `#d4a017` | `text-premium-gold`, `bg-premium-gold` |

**Font** (load trong `layout.jsx`):

- **Be Vietnam Pro** — nội dung (`--font-sans`)
- **Playfair Display** — nhấn serif (`--font-serif`)
- **Cormorant Garamond** — brand display (`--font-brand`)

Chiều rộng layout: `.site-container` (max ~1400px, gutter responsive).

---

## 10. Component chính

| Component | Vai trò |
| --- | --- |
| `PageLayout` | Bọc mọi trang (header/footer) |
| `SiteHeader` / `Header` | Nav sticky, menu danh mục, Zalo/Gọi |
| `Footer` | Link, hotline, cảnh báo 18+ |
| `HeroSection` | Hero full-bleed trang chủ + CTA |
| `BestSellersSection` / `ValueDealsSection` | Carousel sản phẩm |
| `ProductCard` / `ProductGrid` | Lưới catalog |
| `ProductFeaturedCarousel` | Hàng nổi bật (Embla) |
| `InquiryForm` | CTA liên hệ nhẹ |
| `ProductJsonLd` | Structured data trang sản phẩm |

---

## 11. Quy ước khi đóng góp

Tuân theo `PROJECT_CONTEXT.md`:

- Mobile-first, CTA dễ bấm bằng ngón cái, ảnh tải nhanh
- Ưu tiên Next.js core + HTML ngữ nghĩa + Tailwind — hạn chế thêm package
- Không database; giữ sản phẩm trong mock data tĩnh
- Ưu tiên Server Components; giảm JS phía client
- Đặt tên rõ nghĩa; tránh layout “flaky”
- Dùng nhất quán utility màu premium

---

## 12. Script hữu ích

| Script | Mục đích |
| --- | --- |
| `npm run dev` | Dev server Next.js local |
| `npm run build` | Production static export → `out/` |
| `npm run start` | Serve build production local |
| `npm run lint` | ESLint (cấu hình Next) |

---

## 13. Tài liệu liên quan

| File | Mục đích |
| --- | --- |
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Quy tắc Cursor AI / coding |
| [README.md](./README.md) | Quick start |
| [DEMO.md](./DEMO.md) | Ghi chú demo cũ (có thể lệch so với migration Next.js) |
| [GUIDE.md](./GUIDE.md) | Bản tiếng Anh |

---

## Audit (tài liệu)

- **Performance:** PASS — hướng dẫn mô tả dữ liệu tĩnh và Server Components; không ảnh hưởng runtime.
- **SEO:** PASS — nêu metadata, sitemap và `NEXT_PUBLIC_SITE_URL`.
- **Accessibility:** PASS — nhắc cảnh báo 18+ và markup ngữ nghĩa.
- **Maintainability:** PASS — hai bản EN/VI giúp onboard thống nhất.
