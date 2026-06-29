import { getAllArticles } from '../../lib/articles';
import CatalogPageHeader from '../../components/layout/CatalogPageHeader';
import ArticleCard from '../../components/knowledge/ArticleCard';

export const metadata = {
  title: 'Kiến thức thưởng thức rượu vang & bia nhập khẩu',
  description:
    'Chia sẻ kiến thức về rượu vang, bia nhập khẩu cao cấp, cách kết hợp món ăn và văn hóa thưởng thức từ LUVINI & CO.',
  alternates: {
    canonical: '/kien-thuc',
  },
};

export default function KnowledgePage() {
  const articles = getAllArticles();

  return (
    <div className="site-container pt-10 pb-16">
      <CatalogPageHeader
        eyebrow="KIẾN THỨC"
        title="Kiến thức rượu vang & bia"
        description="Bài viết về cách chọn, thưởng thức và kết hợp rượu vang, bia nhập khẩu — cập nhật từ LUVINI & CO."
      />

      {articles.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-body-muted">Chưa có bài viết. Vui lòng quay lại sau.</p>
      )}
    </div>
  );
}
