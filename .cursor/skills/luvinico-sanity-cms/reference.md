# Sanity ↔ Frontend Data Mapping

## Product fields

| Frontend (`mockData.js`) | Sanity schema field | Type |
|--------------------------|---------------------|------|
| `id` | `_id` | auto |
| `name` | `name` | string |
| slug (derived) | `slug.current` | slug |
| `image` | `image` | image |
| `gallery` | `gallery` | array of images |
| `price` | `price` | string |
| `origin` | `origin` | string |
| `style` | `style` | string |
| `category` | `category` → `key` | reference |
| `type` | `type` | string |
| `abv` | `abv` | string |
| `description` | `description` | text |

Detail extras in `frontend/src/data/productDetails.js` can become inline Portable Text blocks or a `details` object on the product schema.

## Category fields

| Frontend (`categories.js`) | Sanity field |
|----------------------------|--------------|
| `key` | `key` |
| `path` | derived: `/${key}/` |
| `title` | `title` |
| `eyebrow` | `eyebrow` |
| `description` | `description` |

## Brand (singleton)

Model `frontend/src/data/brand.js` as a singleton document (`brandSettings`):

- `name`, `shortName`, `tagline`, `subtitle`, `est`, `hotline`, `facebook`, `email`, `description`

Use explicit document ID: `brandSettings`.

## Article fields

Match `frontend/src/lib/articles.js` expectations:

- `title`, `slug`, `excerpt`, `date`/`publishedAt`, `coverImage`, `content`

## Policy fields

Match markdown files in `frontend/src/data/policy/`:

- `title`, `slug`, `content` (Portable Text)

Existing slugs: `chinh-sach-van-chuyen`, `chinh-sach-thanh-toan`, `huong-dan-mua-hang`, `chinh-sach-doi-tra-hang-hoa`.

## Slug rules

Frontend `slugify()` strips Vietnamese diacritics and lowercases:

```
"Rượu Vang Pháp Le Pacha" → "ruou-vang-phap-le-pacha"
```

Sanity slug fields should produce the same ASCII output. Validate slugs match before cutover.

## Studio structure (recommended)

```javascript
// cms/structure.js — optional desk structure
S.list()
  .title('Luvinico')
  .items([
    S.listItem().title('Brand').child(S.document().schemaType('brandSettings').documentId('brandSettings')),
    S.documentTypeListItem('product').title('Sản phẩm'),
    S.documentTypeListItem('category').title('Danh mục'),
    S.documentTypeListItem('article').title('Kiến thức'),
    S.documentTypeListItem('policy').title('Chính sách'),
    S.documentTypeListItem('banner').title('Banner'),
  ])
```
