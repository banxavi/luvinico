import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatSeoTitle } from '../../../lib/seo';
import RichContent from '../../../components/content/RichContent';
import { getAllArticleSlugs, getArticleBySlug } from '../../../lib/articles';

export function generateStaticParams() {
  return getAllArticleSlugs().map((articleSlug) => ({ articleSlug }));
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);

  if (!article) {
    return { title: 'Bài viết không tồn tại' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/kien-thuc/${articleSlug}`,
    },
    openGraph: {
      title: formatSeoTitle(article.title),
      description: article.excerpt,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }) {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);

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

        <div className="relative mx-auto mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-premium-black sm:w-1/2">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <RichContent content={article.content} />
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
