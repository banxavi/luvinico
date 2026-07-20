import {
  legacyContentSectionProjection,
  portableTextProjection,
} from './portableTextQuery.js';

const pt = portableTextProjection.trim();
const legacy = legacyContentSectionProjection.trim();

const mixedBodyField = (fieldName) => `
  "${fieldName}": select(
    ${fieldName}[0]._type == "contentSection" => ${fieldName}[] {
      ${legacy}
    },
    ${fieldName}[] {
      ${pt}
    }
  )
`;

const productFields = /* groq */ `

  _id,

  name,

  "slug": slug.current,

  price,

  salePrice,

  contactPrice,

  origin,

  style,

  abv,

  ibu,

  volume,

  serveTemp,

  description[] {
    ${pt}
  },

  longDescription[] {
    ${pt}
  },

  "category": coalesce(category->slug.current, category->key),

  menuSelection {
    menuKind,
    groupSlug,
    itemSlug,
    itemName
  },

  "type": coalesce(menuSelection.itemSlug, type),

  "image": coalesce(image.asset->url, ""),

  "imageAlt": image.alt,

  "gallery": gallery[].asset->url,

  ${mixedBodyField('content')}

`;



export const ALL_PRODUCTS_QUERY = /* groq */ `
  *[_type == "product"] | order(name asc) { ${productFields} }
`;

/** Products with a promotional sale price set in CMS */
export const ON_SALE_PRODUCTS_QUERY = /* groq */ `
  *[
    _type == "product"
    && defined(salePrice)
    && salePrice != ""
    && !contactPrice
  ] | order(name asc) { ${productFields} }
`;



export const PRODUCT_BY_SLUG_QUERY = /* groq */ `

  *[_type == "product" && slug.current == $slug][0] { ${productFields} }

`;



export const ALL_PRODUCT_SLUGS_QUERY = /* groq */ `

  *[_type == "product" && defined(slug.current)].slug.current

`;



export const ALL_CATEGORIES_QUERY = /* groq */ `
  *[_type == "category"] | order(coalesce(slug.current, key) asc) {
    _id,
    "slug": coalesce(slug.current, key),
    key,
    title,
    eyebrow,
    description,
    showInNav,
    navOrder,
    navLabel,
    dropdownMenus[] {
      _key,
      name,
      "slug": slug.current,
      showEmptySubTabs,
      subTabs[] {
        _key,
        name,
        "slug": slug.current
      }
    },
    standardMenus[] {
      _key,
      name,
      "slug": slug.current
    },
    navGroups[] {
      _key,
      key,
      label,
      showEmptySubTabs,
      "subTabs": subTabs[]-> {
        "slug": slug.current,
        label,
        groupKey
      }
    }
  }
`;



export const ALL_ARTICLES_QUERY = /* groq */ `

  *[_type == "article"] | order(publishedAt desc) {

    _id,

    title,

    "slug": slug.current,

    excerpt,

    category,

    publishedAt,

    "image": coalesce(coverImage.asset->url, ""),

    "imageAlt": coverImage.alt,

    ${mixedBodyField('body')}

  }

`;



export const ARTICLE_BY_SLUG_QUERY = /* groq */ `

  *[_type == "article" && slug.current == $slug][0] {

    _id,

    title,

    "slug": slug.current,

    excerpt,

    category,

    publishedAt,

    "image": coalesce(coverImage.asset->url, ""),

    "imageAlt": coverImage.alt,

    ${mixedBodyField('body')}

  }

`;



export const ALL_ARTICLE_SLUGS_QUERY = /* groq */ `

  *[_type == "article" && defined(slug.current)].slug.current

`;

