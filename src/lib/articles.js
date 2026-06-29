import { articleBodies, articles } from '../data/articles';

export function getAllArticles() {
  return articles;
}

export function getAllArticleSlugs() {
  return articles.map((article) => article.slug);
}

export function getArticleBySlug(slug) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;

  return {
    ...article,
    content: articleBodies[slug] ?? [],
  };
}
