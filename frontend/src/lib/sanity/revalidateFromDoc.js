import { SANITY_CACHE_TAGS } from './cacheTags';

function withTrailingSlash(path) {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

function readSlug(doc) {
  const slug = doc?.slug;
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current ?? '';
}

/** Map Sanity webhook document payload → cache tags + paths to revalidate. */
export function getRevalidationTargets(doc) {
  const type = doc?._type;
  const slug = readSlug(doc);
  const tags = new Set();
  const paths = new Set(['/']);

  switch (type) {
    case 'product':
      tags.add(SANITY_CACHE_TAGS.products);
      paths.add('/khuyen-mai/');
      paths.add('/search/');
      if (slug) paths.add(withTrailingSlash(`/product/${slug}`));
      break;

    case 'category':
      tags.add(SANITY_CACHE_TAGS.catalog);
      tags.add(SANITY_CACHE_TAGS.products);
      if (slug) paths.add(withTrailingSlash(`/${slug}`));
      paths.add('/tag/');
      break;

    case 'article':
      tags.add(SANITY_CACHE_TAGS.articles);
      paths.add('/kien-thuc/');
      if (slug) paths.add(withTrailingSlash(`/kien-thuc/${slug}`));
      break;

    case 'siteSettings':
      tags.add(SANITY_CACHE_TAGS.siteSettings);
      break;

    default:
      tags.add(SANITY_CACHE_TAGS.products);
      tags.add(SANITY_CACHE_TAGS.catalog);
      tags.add(SANITY_CACHE_TAGS.articles);
      tags.add(SANITY_CACHE_TAGS.siteSettings);
      break;
  }

  return {
    tags: [...tags],
    paths: [...paths],
  };
}
