import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '../../../lib/seo';
import BodyContent from '../../../components/content/BodyContent';
import {
  getAllArticleSlugs,
  getArticleBySlug,
} from '../../../lib/sanity/articleStore';

import { PAGE_REVALIDATE_SECONDS } from '../../../lib/revalidate';

export const revalidate = PAGE_REVALIDATE_SECONDS;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((articleSlug) => ({ articleSlug }));
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;
  const article = await getArticleBySlug(articleSlug);

  if (!article) {
    return createPageMetadata({ title: 'Bài viết không tồn tại' });
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/kien-thuc/${articleSlug}`,
    },
    openGraph: {
      type: 'article',
    },
  });
}

export default async function ArticlePage({ params }) {
  const { articleSlug } = await params;
  const article = await getArticleBySlug(articleSlug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pb-16">
      <div className="site-container pt-10 sm:pt-12">
        <nav className="mb-6 text-sm text-body-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden className="text-body-subtle">
              /
            </li>
            <li>
              <Link href="/kien-thuc" className="transition hover:text-white">
                Kiến thức
              </Link>
            </li>
            <li aria-hidden className="text-body-subtle">
              /
            </li>
            <li className="text-white/90 line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-body-muted">{article.excerpt}</p>
        </header>

        <div className="mt-10 border-t border-white/10 pt-10">
          <BodyContent value={article.content} variant="article" />
        </div>

        <div className="mt-12">
          <Link
            href="/kien-thuc"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-amber transition hover:text-white"
          >
            ← Quay lại Kiến thức
          </Link>
        </div>
      </div>
    </article>
  );
}
