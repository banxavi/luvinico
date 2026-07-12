import { BRAND } from '../../data/brand';
import CatalogPageHeader from '../../components/layout/CatalogPageHeader';
import ProductGrid from '../../components/product/ProductGrid';
import { createPageMetadata } from '../../lib/seo';
import { getOnSaleProducts } from '../../lib/pricing';

export const metadata = createPageMetadata({
  title: 'Chương trình ưu đãi',
  description:
    'Các chương trình ưu đãi, khuyến mãi đặc biệt và sản phẩm đang giảm giá từ LUVINI & CO. Cập nhật mới nhất.',
  alternates: {
    canonical: '/khuyen-mai',
  },
});

export default function PromotionsPage() {
  const products = getOnSaleProducts();

  return (
    <div className="site-container pt-10 pb-10">
      <CatalogPageHeader
        eyebrow="ƯU ĐÃI"
        title="Khuyến mãi"
        description={`Sản phẩm đang giảm giá tại ${BRAND.name} — cập nhật theo từng đợt.`}
      />

      <div className="mt-6 text-sm text-body-muted">
        {products.length > 0
          ? `${products.length} sản phẩm đang khuyến mãi`
          : 'Hiện chưa có sản phẩm giảm giá.'}
      </div>

      <div className="mt-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-8 text-center">
            <p className="text-sm text-body-muted sm:text-base">
              Chương trình khuyến mãi sắp cập nhật. Vui lòng liên hệ hotline để được tư vấn ưu đãi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
