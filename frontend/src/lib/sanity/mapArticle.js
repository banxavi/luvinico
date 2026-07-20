import { normalizeBodyContent } from './mapBodyContent';

export function mapSanityArticle(doc) {
  if (!doc?.slug) return null;

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? '',
    category: doc.category ?? '',
    publishedAt: doc.publishedAt ?? '',
    image: doc.image || null,
    imageAlt: doc.imageAlt ?? doc.title,
    content: normalizeBodyContent(doc.body),
  };
}
