import { notFound } from 'next/navigation';
import { CATEGORIES } from '../../data/categories';
import { getProductsByCategory } from '../../lib/catalog';
import CatalogPageHeader from '../../components/layout/CatalogPageHeader';
import ProductGrid from '../../components/product/ProductGrid';

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categoryKey) => ({ categoryKey }));
}

export async function generateMetadata({ params }) {
  const { categoryKey } = await params;
  const meta = CATEGORIES[categoryKey];
  if (!meta) {
    return {
      title: 'Danh mục không tồn tại',
    };
  }
  return {
    title: `${meta.title} — Nhập khẩu chính hãng`,
    description: meta.description || `Xem bộ sưu tập sản phẩm ${meta.title} tại LUVINI & CO.`,
    alternates: {
      canonical: `/${categoryKey}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { categoryKey } = await params;
  const meta = CATEGORIES[categoryKey];

  if (!meta) {
    notFound();
  }

  const products = getProductsByCategory(categoryKey);

  return (
    <div className="site-container pt-10 pb-4">
      <CatalogPageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />

      <div className="mt-6 text-sm text-body-muted">
        {products.length > 0 ? `${products.length} sản phẩm` : 'Chưa có sản phẩm trong danh mục này.'}
      </div>

      <div className="mt-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-8 text-center">
            <p className="text-sm text-body-muted sm:text-base">
              Danh mục đang được chuẩn bị. Vui lòng liên hệ hotline để được tư vấn trực tiếp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
