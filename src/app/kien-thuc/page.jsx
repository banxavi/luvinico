import { mockArticles } from "../../data/articles";
import CatalogPageHeader from "../../components/layout/CatalogPageHeader";
import Image from "next/image";

export const metadata = {
  title: "Kiến thức thưởng thức rượu vang & bia nhập khẩu",
  description:
    "Chia sẻ kiến thức về rượu vang, bia nhập khẩu cao cấp, cách kết hợp món ăn và văn hóa thưởng thức từ các chuyên gia LUVINI & CO.",
  alternates: {
    canonical: "/kien-thuc",
  },
};

export default function KnowledgePage() {
  return (
    <div className="site-container pt-10 pb-4">
      <CatalogPageHeader
        eyebrow="KIẾN THỨC"
        title="Kiến thức"
        description="Bài viết về rượu vang, bia nhập khẩu và cách thưởng thức — nội dung mẫu, sẽ thay bằng bài từ khách."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockArticles.map((article) => (
          <article
            key={article.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-premium-dark transition hover:border-brand-amber/35"
          >
            <div className=" overflow-hidden bg-premium-black">
              <Image
                src={article.image}
                fill
                alt=""
                className="h-full w-full object-cover aspect-16/10"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h2 className="text-base font-semibold leading-snug text-white sm:text-lg">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body-muted">
                {article.excerpt}
              </p>
              <span className="mt-4 inline-block text-xs font-semibold text-brand-amber">
                Sắp có bài đầy đủ
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
