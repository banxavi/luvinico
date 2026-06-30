import { Suspense } from 'react';
import { BRAND } from '../../data/brand';
import { mockProducts } from '../../mockData';
import ProductGrid from '../../components/product/ProductGrid';
import SearchFilters from '../../components/search/SearchFilters';
import { createPageMetadata } from '../../lib/seo';
import { filterProducts, getSearchFilterOptions } from '../../lib/search';

function buildSearchCanonical({ q, origin, category, price, abv }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (origin) params.set('origin', origin);
  if (category) params.set('category', category);
  if (price) params.set('price', price);
  if (abv) params.set('abv', abv);
  const query = params.toString();
  return query ? `/search?${query}` : '/search';
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || '').trim();
  const canonical = buildSearchCanonical({
    q,
    origin: resolvedSearchParams.origin || '',
    category: resolvedSearchParams.category || '',
    price: resolvedSearchParams.price || '',
    abv: resolvedSearchParams.abv || '',
  });

  if (q) {
    return createPageMetadata({
      title: `Tìm kiếm: "${q}"`,
      description: `Kết quả tìm kiếm cho từ khóa "${q}" tại LUVINI & CO.`,
      alternates: { canonical },
      robots: {
        index: false,
        follow: true,
      },
    });
  }

  return createPageMetadata({
    title: 'Tìm kiếm sản phẩm',
    description: 'Tìm kiếm các sản phẩm rượu vang, bia nhập khẩu tại LUVINI & CO.',
    alternates: { canonical },
  });
}

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || '').trim();
  const origin = (resolvedSearchParams.origin || '').trim();
  const category = (resolvedSearchParams.category || '').trim();
  const price = (resolvedSearchParams.price || '').trim();

  const abv = (resolvedSearchParams.abv || '').trim();

  const filtered = filterProducts(mockProducts, { q, origin, category, price, abv });
  const filterOptions = getSearchFilterOptions(mockProducts);
  const hasSearchOrFilters = Boolean(q || origin || category || price || abv);

  return (
    <div className="site-container pt-10 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="brand-logo-gradient text-xs font-semibold tracking-normal">TÌM KIẾM · {BRAND.name}</div>
          <h1 className="mt-2 text-3xl font-semibold">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-body-muted">
            Từ khoá: <span className="text-white/85">&ldquo;{q || '—'}&rdquo;</span>
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40" aria-hidden />}>
        <SearchFilters origins={filterOptions.origins} categories={filterOptions.categories} />
      </Suspense>

      <div className="mt-6 text-sm text-body-muted">
        {hasSearchOrFilters ? (
          <>
            {filtered.length}/{mockProducts.length} sản phẩm
          </>
        ) : (
          'Nhập từ khoá hoặc chọn bộ lọc để bắt đầu.'
        )}
      </div>

      <div className="mt-6">
        {hasSearchOrFilters && filtered.length > 0 ? (
          <ProductGrid products={filtered} searchQuery={q || undefined} />
        ) : hasSearchOrFilters ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
            Không tìm thấy sản phẩm phù hợp. Hãy thử từ khoá hoặc bộ lọc khác.
          </div>
        ) : null}
      </div>
    </div>
  );
}
