import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '../../data/categories';
import { getProductsByCategory } from '../../lib/catalog';
import CatalogPageHeader from '../../components/layout/CatalogPageHeader';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/search/ProductFilters';
import { filterProducts, getSearchFilterOptions } from '../../lib/search';
import { resolveTypeSlug } from '../../lib/types';

function buildCategoryCanonical(categoryKey, { origin, price, abv, type }) {
  const params = new URLSearchParams();
  if (origin) params.set('origin', origin);
  if (price) params.set('price', price);
  if (abv) params.set('abv', abv);
  if (type) params.set('type', type);
  const query = params.toString();
  return query ? `/${categoryKey}?${query}` : `/${categoryKey}`;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categoryKey) => ({ categoryKey }));
}

export async function generateMetadata({ params, searchParams }) {
  const { categoryKey } = await params;
  const resolvedSearchParams = await searchParams;
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
      canonical: buildCategoryCanonical(categoryKey, {
        origin: resolvedSearchParams.origin || '',
        price: resolvedSearchParams.price || '',
        abv: resolvedSearchParams.abv || '',
        type: resolvedSearchParams.type || '',
      }),
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { categoryKey } = await params;
  const resolvedSearchParams = await searchParams;
  const meta = CATEGORIES[categoryKey];

  if (!meta) {
    notFound();
  }

  const origin = (resolvedSearchParams.origin || '').trim();
  const price = (resolvedSearchParams.price || '').trim();
  const abv = (resolvedSearchParams.abv || '').trim();
  const typeSlug = resolveTypeSlug(resolvedSearchParams.type || '');

  const pool = getProductsByCategory(categoryKey);
  const filtered = filterProducts(pool, { origin, price, abv, type: typeSlug || '' });
  const filterOptions = getSearchFilterOptions(pool, { includeTypes: true });
  const hasActiveFilters = Boolean(origin || price || abv || typeSlug);

  return (
    <div className="site-container pt-10 pb-10">
      <CatalogPageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />

      <Suspense
        fallback={
          <div className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40" aria-hidden />
        }
      >
        <ProductFilters
          basePath={`/${categoryKey}`}
          origins={filterOptions.origins}
          types={filterOptions.types}
          showCategoryFilter={false}
          showTypeFilter
          ariaLabel="Bộ lọc danh mục"
        />
      </Suspense>

      <div className="mt-6 text-sm text-body-muted">
        {pool.length > 0 ? (
          <>
            {filtered.length}/{pool.length} sản phẩm
            {hasActiveFilters ? ' (đã lọc)' : ''}
          </>
        ) : (
          'Chưa có sản phẩm trong danh mục này.'
        )}
      </div>

      <div className="mt-6">
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : pool.length > 0 ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
            Không tìm thấy sản phẩm phù hợp. Hãy thử bộ lọc khác.
          </div>
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
