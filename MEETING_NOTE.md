# LUVINI & CO. — Biên bản sau buổi demo

**Ngày ghi nhận:** sau buổi demo prototype  
**Mục đích:** Thống nhất chỉnh sửa giao diện, nội dung và **danh sách hình ảnh** khách hàng cần chuẩn bị trước go-live.

---

## 1. Tóm tắt buổi demo

Đã trình bày landing page **LUVINI & CO.** (*The Art of Fine Taste* · *Curated Fine Wine & Imported Beer*):

- Giao diện premium dark + gold
- Bộ sưu tập sản phẩm (carousel), tìm kiếm, trang chi tiết
- Liên hệ Zalo / hotline trên trang chi tiết
- Layout responsive (mobile + desktop)

**Dữ liệu hiện tại:** mock (sản phẩm, ảnh, copy) — chờ khách cung cấp bản chính thức.

---

## 2. Thay đổi đã thống nhất (yêu cầu sau demo)

### 2.1 Header


| Hạng mục        | Quyết định                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------- |
| Logo            | Icon **L&Co** phía trên, chữ **Luvini & co.** (Cormorant Garamond, gold gradient) phía dưới |
| Tagline header  | **Bỏ** *The Art of Fine Taste* và dòng *Curated…* trên header                               |
| Zalo            | **Bỏ** khỏi header                                                                          |
| Hotline         | **Giữ** — hiển thị **icon + số điện thoại** (không chỉ icon)                                |
| Menu điều hướng | Đổi thành 7 mục (xem mục 2.5)                                                               |


### 2.2 Footer


| Hạng mục         | Quyết định                                                               |
| ---------------- | ------------------------------------------------------------------------ |
| Phần thương hiệu | Chỉ **logo + *The Art of Fine Taste*** (căn giữa)                        |
| Dòng phụ         | **Bỏ** 2 dòng mô tả dài                                                  |
| Gạch ngang       | Đường kẻ **dưới** block logo/tagline, **kéo xuống** trước MXH & cảnh báo |


### 2.3 Hero & nền từng section


| Hạng mục        | Quyết định                                                                             |
| --------------- | -------------------------------------------------------------------------------------- |
| Hero            | Mỗi section dùng **ảnh nền riêng** do khách cung cấp (không dùng ảnh stock lẻ)         |
| Hero (tạm demo) | **Banner slider** kiểu Cao Minh — fade, dots, mũi tên; PC + mobile riêng (xem mục 3.1) |
| Các section     | Hero, Bộ sưu tập, Vang giá tốt, Câu chuyện, USP, Điểm bán — mỗi section **1 file nền** |
| Trạng thái code | Đã có cơ chế gắn ảnh (`sectionBackgrounds.js`); hiện `null` = nền mặc định             |


### 2.4 Sản phẩm (card + chi tiết)


| Hạng mục     | Quyết định                                                                         |
| ------------ | ---------------------------------------------------------------------------------- |
| Giá          | **Căn giữa**; nếu có giảm giá → **giá sale giữa**, giá gốc **gạch ngang bên trái** |
| Chưa có giá  | Hiển thị **Liên hệ**                                                               |
| Xuất xứ      | **Bỏ** trên card và specs chi tiết                                                 |
| Ảnh chi tiết | **Gallery 3 ảnh** (slide + thumbnail); nền gallery đồng bộ với card                |
| Đánh giá KH  | **Bỏ** section khỏi trang chủ                                                      |


### 2.5 Menu điều hướng (navbar)

Thứ tự đã chốt:

1. Rượu vang
2. Rượu mạnh
3. Bia
4. Quà Tết
5. Phụ kiện
6. Chương trình ưu đãi
7. Kiến thức

*Ghi chú:* Các mục trên sẽ nối trang danh mục riêng ở phase sau; hiện demo dùng anchor / placeholder.

---

## 3. Hình ảnh khách hàng cần cung cấp

### 3.1 Ảnh nền từng section (full-width)


| #   | Section                | Tên file gợi ý        | Kích thước đề xuất | Ghi chú                                                         |
| --- | ---------------------- | --------------------- | ------------------ | --------------------------------------------------------------- |
| 1   | Hero banner (PC)       | `bg-hero-pc.webp`     | **1920 × 740 px**  | Kiểu Cao Minh — banner ngang full width; CTKM/graphic trong ảnh |
| 1b  | Hero banner (Mobile)   | `bg-hero-mobile.webp` | **1080 × 1080 px** | Vuông; bản riêng cho điện thoại (không resize từ PC)            |
| 2   | Bộ sưu tập signature   | `bg-products.webp`    | **1920 × 900 px**  | Tone đồng bộ thương hiệu                                        |
| 3   | Vang ngon giá tốt      | `bg-value-deals.webp` | **1920 × 800 px**  | Có thể nhẹ, ấm                                                  |
| 4   | Câu chuyện thương hiệu | `bg-story.webp`       | **1920 × 800 px**  | Cảm giác curated / cellar                                       |
| 5   | USP / Giá trị          | `bg-usp.webp`         | **1920 × 700 px**  |                                                                 |
| 6   | Đối tác & điểm bán     | `bg-partners.webp`    | **1920 × 700 px**  |                                                                 |


- **Định dạng:** WebP (ưu tiên) hoặc JPG chất lượng cao  
- **Dung lượng:** ≤ 400 KB / ảnh nền (đã nén)  
- **Giao file:** folder `backgrounds/` hoặc Drive có cấu trúc trên

### 3.2 Ảnh sản phẩm (card + chi tiết — đồng bộ)

Mỗi SKU cần **tối thiểu 3 ảnh** cho trang chi tiết + **1 ảnh** (hoặc dùng ảnh 1) cho card listing.


| Loại                 | Kích thước canvas       | Định dạng  | Quy tắc                                                         |
| -------------------- | ----------------------- | ---------- | --------------------------------------------------------------- |
| **Card (listing)**   | **800 × 1000 px** (4:5) | WebP / PNG | Cùng góc chụp 3/4, nền `#2c2924` → `#1e1e1e`, chai căn giữa–đáy |
| **Chi tiết — ảnh 1** | **1200 × 1200 px**      | WebP / PNG | Mặt trước nhãn / toàn chai                                      |
| **Chi tiết — ảnh 2** | **1200 × 1200 px**      | WebP / PNG | Góc nghiêng hoặc close-up nhãn                                  |
| **Chi tiết — ảnh 3** | **1200 × 1200 px**      | WebP / PNG | Bối cảnh tối giản hoặc hộp (nếu có)                             |


**Đặt tên file** (trùng slug sản phẩm):

```
assets/products/
├── vang/
│   ├── ten-san-pham.webp           ← card
│   ├── ten-san-pham-1.webp         ← gallery
│   ├── ten-san-pham-2.webp
│   └── ten-san-pham-3.webp
└── bia/
    └── ...
```


| Quy tắc    | Chi tiết                                            |
| ---------- | --------------------------------------------------- |
| Góc chụp   | **Một góc duy nhất** cho toàn catalog               |
| Nền        | Đồng bộ, không lifestyle rối mắt                    |
| Không dùng | Ảnh lẻ Unsplash, watermark lớn, nền trắng lệch tông |
| Pilot      | Làm **5 SKU mẫu** → duyệt → scale cả catalog        |


### 3.3 Logo & icon (đã có / bổ sung)


| Asset                     | Trạng thái | Ghi chú                                         |
| ------------------------- | ---------- | ----------------------------------------------- |
| Logo L&Co (`L&Co.png`)    | ✅ Đã có    | Dùng header + footer                            |
| Favicon                   | ⏳ Cần      | File `.ico` / `.svg` từ logo                    |
| OG image (share Facebook) | ⏳ Cần      | **1200 × 630 px** — logo + tagline trên nền tối |


---

## 4. Dữ liệu nội dung chờ khách (ngoài hình ảnh)


| Hạng mục             | Mô tả                                                              |
| -------------------- | ------------------------------------------------------------------ |
| Danh mục sản phẩm    | Rượu vang, rượu mạnh, bia, quà Tết, phụ kiện — SKU + giá / Liên hệ |
| Giá & khuyến mãi     | Giá gốc, giá sale, % giảm (nếu có)                                 |
| Hotline / Zalo / MXH | Số chính thức, link Zalo OA, Instagram / Facebook / TikTok         |
| Chính sách           | Đổi trả, vận chuyển, thanh toán (cho footer / trang riêng)         |
| Điểm bán             | Địa chỉ showroom (nếu có)                                          |
| Blog Kiến thức       | Bài viết cho mục menu *Kiến thức*                                  |


---

## 5. Việc làm tiếp theo (phía dev)


| Ưu tiên | Công việc                                       | Phụ thuộc khách    |
| ------- | ----------------------------------------------- | ------------------ |
| P0      | Gắn ảnh nền section vào `sectionBackgrounds.js` | File `bg-*.webp`   |
| P0      | Import catalog + ảnh 3 góc / SKU                | Excel + folder ảnh |
| P1      | Trang danh mục: Rượu vang, Bia, Quà Tết…        | Danh mục + filter  |
| P1      | Trang Kiến thức + Khuyến mãi                    | Nội dung bài viết  |
| P2      | Giỏ hàng & thanh toán                           | Chốt flow bán hàng |


---

## 6. Checklist gửi khách (copy-paste)

**Khách hàng vui lòng chuẩn bị:**

- [ ] **6 ảnh nền section** (theo bảng mục 3.1)  
- [ ] **Ảnh sản phẩm chuẩn hóa** — 3 ảnh/SKU + 1 ảnh card (mục 3.2)  
- [ ] **5 sản phẩm pilot** để duyệt trước khi làm hàng loạt  
- [ ] **File Excel/Google Sheet** sản phẩm: tên, slug, danh mục, giá, giá sale, Liên hệ (Y/N), ABV, dung tích…  
- [ ] **Hotline, Zalo, link MXH** chính thức  
- [ ] **Favicon + OG image** share mạng xã hội  

---

## 7. Liên hệ kỹ thuật

Mọi file gửi qua **Google Drive / WeTransfer** kèm cấu trúc thư mục như mục 3.  
Sau khi nhận **pilot 5 SKU + 6 ảnh nền**, team sẽ cập nhật staging để khách duyệt lần 2 trước go-live.

---

## 8. Ghi chú sau khi nhận ảnh mẫu (pilot — quay lại khi cần)

**Ngày ghi nhận:** sau khi gắn `bg-hero*.webp` + 2 card + ảnh chi tiết vào staging.

### 8.1 Kích thước file — đã đúng chuẩn


| File                                        | Pixel thực tế     | Chuẩn dự án        | Kết luận |
| ------------------------------------------- | ----------------- | ------------------ | -------- |
| `ruou_nho_card.webp`, `ruou_vang_card.webp` | 800 × 1000 (4:5)  | Card 800 × 1000    | ✓ Đúng   |
| `ruou_*_chi_tiet*.webp`                     | 1200 × 1200 (1:1) | Detail 1200 × 1200 | ✓ Đúng   |


→ **Pixel/tỉ lệ file không phải nguyên nhân** ảnh trông lệch trên card.

### 8.2 Vì sao ảnh mẫu vẫn chưa “vừa” card UI

1. **Nền trắng trong file** vs nền tối card (`.product-media-well` gradient `#2c2924` → `#1e1e1e`) → lộ “hộp trắng” quanh chai.
2. **Chai nhỏ trong canvas** (~50–60% chiều cao) + CSS `object-fit: contain` + `max-width: 86%` → chai trông nhỏ thêm lần nữa.
3. **Carousel dùng khung compact 3:4** (`ProductCard compact`) trong khi ảnh card là **4:5** → thêm khoảng trống.
4. `**ruou_vang_card.webp` có logo LUVINI nhúng** góc trên trái — trùng vị trí badge style trên card.

### 8.3 Yêu cầu chỉnh lại ảnh (gửi khách)

- [ ] Xóa nền trắng → nền `**#2c2924`** (hoặc PNG trong suốt, hòa với card)
- [ ] Chai cao **75–85%** khung 800 × 1000, căn giữa ngang + **đáy thẳng hàng** giữa các SKU
- [ ] **Không** gắn logo thương hiệu lên ảnh card (logo đã có header/footer)
- [ ] Góc chụp **3/4 thống nhất** cho toàn catalog
- [ ] Pilot: làm lại **2 card mẫu** → duyệt trên staging → mới scale hàng loạt

### 8.4 Việc dev có thể làm sau (khi khách duyệt ảnh mới)

- [ ] Carousel: đổi compact card từ **3:4 → 4:5** (nếu muốn khớp file card)
- [ ] Tùy chọn CSS “full-bleed” khi ảnh card đã có nền brand đúng màu
- [ ] Khôi phục copy hero từ `brand.js` khi đã chốt ảnh nền hero (hiện hero **chỉ slideshow**)

**File code liên quan:** `src/data/clientAssets.js`, `src/mockData.js` (SP mẫu id 1–2), `HeroBannerSlider.jsx`.

### 8.5 Hero banner — chuẩn Cao Minh (tham chiếu ruouvangcaominh.vn)


|                | Desktop (PC)                        | Mobile                                  |
| -------------- | ----------------------------------- | --------------------------------------- |
| **Kích thước** | **1920 × 740 px** (≈ tỉ lệ 2,6:1)   | **1080 × 1080 px** (vuông)              |
| **Định dạng**  | WebP hoặc JPG                       | WebP hoặc JPG                           |
| **Dung lượng** | ≤ 400 KB                            | ≤ 300 KB                                |
| **Nội dung**   | Toàn bộ copy/CTKM **nằm trong ảnh** | Bản thiết kế riêng, không thu nhỏ từ PC |
| **Tên file**   | `banner-*-pc.webp`                  | `banner-*-mobile.webp`                  |


Ảnh mẫu hiện tại `bg-hero*.webp` là **1920×1080 (16:9)** — **chưa đúng** tỉ lệ banner Cao Minh; sẽ bị crop khi hiển thị. Cần export lại theo bảng trên.

---

*Tài liệu này bổ sung cho `DEMO.md` (mục 13 — quy chuẩn ảnh chi tiết kỹ thuật).*