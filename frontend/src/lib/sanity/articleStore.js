import { cache } from 'react';
import { isSanityConfigured, sanityClient, getSanityFetchOptions, SANITY_CACHE_TAGS } from './client';
import {
  ALL_ARTICLES_QUERY,
  ALL_ARTICLE_SLUGS_QUERY,
  ARTICLE_BY_SLUG_QUERY,
} from './queries';
import { mapSanityArticle } from './mapArticle';

const fetchOptions = getSanityFetchOptions(SANITY_CACHE_TAGS.articles);

async function fetchAllArticles() {
  const docs = await sanityClient.fetch(ALL_ARTICLES_QUERY, {}, fetchOptions);
  if (!Array.isArray(docs)) return [];
  return docs.map(mapSanityArticle).filter(Boolean);
}

export const getAllArticles = cache(async () => {
  if (!isSanityConfigured()) return [];

  try {
    return await fetchAllArticles();
  } catch (error) {
    console.error('[sanity] fetchAllArticles failed', error);
    return [];
  }
});

export const getArticleBySlug = cache(async (slug) => {
  const normalized = slug?.toLowerCase?.() ?? '';
  if (!normalized) return null;

  if (isSanityConfigured()) {
    try {
      const doc = await sanityClient.fetch(
        ARTICLE_BY_SLUG_QUERY,
        { slug: normalized },
        fetchOptions,
      );
      const article = mapSanityArticle(doc);
      if (article) return article;
    } catch (error) {
      console.error('[sanity] fetchArticleBySlug failed', error);
    }
  }

  const articles = await getAllArticles();
  return articles.find((item) => item.slug === normalized) ?? null;
});

export async function getAllArticleSlugs() {
  if (isSanityConfigured()) {
    try {
      const slugs = await sanityClient.fetch(ALL_ARTICLE_SLUGS_QUERY, {}, fetchOptions);
      if (Array.isArray(slugs) && slugs.length > 0) return slugs.filter(Boolean);
    } catch (error) {
      console.error('[sanity] fetchArticleSlugs failed', error);
    }
  }

  const articles = await getAllArticles();
  return articles.map((article) => article.slug).filter(Boolean);
}
