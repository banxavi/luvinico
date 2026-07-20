import { normalizeBodyContent } from './mapBodyContent';

/** Map a Sanity product document to the frontend product shape. */
export function mapSanityProduct(doc) {
  if (!doc) return null;

  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    image: doc.image || null,
    gallery: Array.isArray(doc.gallery) ? doc.gallery.filter(Boolean) : [],
    price: doc.price,
    salePrice: doc.salePrice,
    contactPrice: doc.contactPrice,
    origin: doc.origin,
    style: doc.style,
    category: doc.category,
    type: doc.type ?? doc.menuSelection?.itemSlug ?? null,
    abv: doc.abv,
    ibu: doc.ibu,
    volume: doc.volume,
    serveTemp: doc.serveTemp,
    description: doc.description ?? null,
    longDescription: doc.longDescription ?? null,
    content: normalizeBodyContent(doc.content),
  };
}
