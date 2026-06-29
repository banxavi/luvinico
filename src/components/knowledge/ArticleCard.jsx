import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-premium-dark transition hover:border-brand-amber/35">
      <Link href={`/kien-thuc/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-premium-black">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-5">
          {article.category ? (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-amber">
              {article.category}
            </span>
          ) : null}
          <h2 className="mt-1 text-base font-semibold leading-snug text-white transition group-hover:text-brand-amber sm:text-lg">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body-muted">
            {article.excerpt}
          </p>
          <span className="mt-4 inline-block text-xs font-semibold text-brand-amber">
            Đọc thêm →
          </span>
        </div>
      </Link>
    </article>
  );
}
