import Link from "next/link";
import { getAllArticles } from "../../lib/articles";
import ArticleCard from "../knowledge/ArticleCard";

export default function KnowledgeSection() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <section id="knowledge" className="pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-normal text-premium-gold">
            KIẾN THỨC
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Góc chia sẻ</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Bài viết về cách chọn, thưởng thức và kết hợp rượu vang, bia nhập khẩu.
          </p>
        </div>
        <Link
          href="/kien-thuc"
          className="hidden rounded-md border border-premium-gold/60 bg-premium-black/45 px-4 py-2 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0 sm:inline-flex"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
