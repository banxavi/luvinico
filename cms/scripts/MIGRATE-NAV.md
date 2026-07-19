# Migrate nav-menu content → Sanity

Migrates hardcoded data for **header navigation pages only**:

- 5 **Danh mục** documents (slug, title, description, embedded menus)
- Menu items embedded in categories (`dropdownMenus` + `standardMenus`)
- 13 products + detail content blocks
- 1 knowledge article (`/kien-thuc/...`)

**Not migrated:** home, brand, nav labels, `/khuyen-mai` page text, policies, search.

---

## Unified category schema

Each **Danh mục** document contains:

| Field | Purpose |
|-------|---------|
| `slug` | Route key (`bia`, `ruou-vang`, …) |
| `title`, `description` | Catalog page copy |
| `dropdownMenus[]` | Header dropdown groups + sub-tabs |
| `standardMenus[]` | Flat product type slugs (e.g. Cognac, Whisky) |

When adding a **Sản phẩm**, pick:

1. **Danh mục** (reference)
2. **Loại sản phẩm (menu slug)** — slug from sub-tab or standard menu in that category

There is no separate `productType` collection.

---

## Prerequisites

1. Sanity Studio schemas deployed (`category`, `product`, `article`, menu object types)
2. **Editor** API token for project `sfqhf74q`
3. Node.js 18+

---

## Fresh install (empty dataset)

```bash
cd cms
npm install
npm run migrate:nav
```

Uses `sanity exec … --with-user-token` (browser login) or set `SANITY_API_TOKEN` in `cms/.env`.

---

## Upgrade existing dataset (had productType docs)

```bash
cd cms
npm run migrate:category-unified
```

Converts legacy `navGroups` + `productType` → embedded menus, removes `productType` documents.

---

## Verify in Studio

```bash
cd cms
npm run dev
```

Check each **Danh mục**:

- **Bia** — 2 dropdown menus (Bia Đức, Bia Mexico) with sub-tabs
- **Rượu vang** — 1 dropdown (Rượu vang → Pháp / Ý / Úc)
- **Rượu mạnh** — standard menus only (Cognac, Whisky)

Products should have `category` + `type` (slug string), no `productType` reference.

---

## Files

| File | Purpose |
|------|---------|
| `scripts/migrate-nav-content.js` | Full seed from mock data |
| `scripts/migrate-category-unified.js` | Upgrade legacy → unified schema |
| `scripts/nav-migration-data.js` | Source data |
| `schemaTypes/category.js` | Unified category + menus |
