import Image from "next/image";
import { mockArticles } from "../../data/articles";
import Link from "next/link";

export default function KnowledgeSection() {
  return (
    <section id="knowledge" className="pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-normal text-premium-gold">
            KIẾN THỨC
          </div>
          <h2 className="mt-2 text-2xl font-semibold">Góc chia sẻ</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Một vài bài viết mock để tạo cảm giác “brand content” giống tinh
            thần site mẫu.
          </p>
        </div>
        <Link
          href="#products"
          className="hidden rounded-md border border-premium-gold/60 bg-premium-black/45 px-4 py-2 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0 sm:inline-flex"
        >
          Xem sản phẩm
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {mockArticles.map((a) => (
          <article
            key={a.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-premium-dark"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 text-base font-semibold text-white/95">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                {a.excerpt}
              </p>
              <div className="mt-4 text-xs font-semibold tracking-normal text-premium-gold">
                XEM CHI TIẾT →
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
