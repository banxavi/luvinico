import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '../../data/categories';
import { getProductsByCategory } from '../../lib/catalog';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/search/ProductFilters';
import CategoryTypeSidebar from '../../components/tag/CategoryTypeSidebar';
import { filterProducts, getSearchFilterOptions } from '../../lib/search';
import { createPageMetadata } from '../../lib/seo';
import { getProductType, getTypesWithCounts, resolveTypeSlug } from '../../lib/types';

function buildTagCanonical({ category, type, origin, price, abv }) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (type) params.set('type', type);
  if (origin) params.set('origin', origin);
  if (price) params.set('price', price);
  if (abv) params.set('abv', abv);
  const query = params.toString();
  return query ? `/tag?${query}` : '/tag';
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryKey = (resolvedSearchParams.category || '').trim();
  const typeSlug = resolveTypeSlug(resolvedSearchParams.type || '');
  const meta = categoryKey ? CATEGORIES[categoryKey] : null;
  const canonical = buildTagCanonical({
    category: categoryKey,
    type: typeSlug || '',
    origin: resolvedSearchParams.origin || '',
    price: resolvedSearchParams.price || '',
    abv: resolvedSearchParams.abv || '',
  });

  if (meta && typeSlug) {
    const types = getTypesWithCounts(categoryKey);
    const typeMeta = types.find((t) => t.slug === typeSlug);
    return createPageMetadata({
      title: `${typeMeta?.label ?? typeSlug} — ${meta.title}`,
      description: `Xem sản phẩm loại ${typeMeta?.label?.toLowerCase() ?? typeSlug} trong ${meta.title.toLowerCase()} tại LUVINI & CO.`,
      alternates: { canonical },
    });
  }

  if (meta) {
    return createPageMetadata({
      title: `${meta.title} — Tất cả loại`,
      description: `Xem tất cả sản phẩm ${meta.title.toLowerCase()} theo loại tại LUVINI & CO.`,
      alternates: { canonical },
    });
  }

  return createPageMetadata({
    title: 'Loại sản phẩm',
    description: 'Danh sách loại sản phẩm rượu vang, bia nhập khẩu tại LUVINI & CO.',
    alternates: { canonical: '/tag' },
  });
}

export default async function TagIndexPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryKey = (resolvedSearchParams.category || '').trim();
  const typeSlug = resolveTypeSlug(resolvedSearchParams.type || '');
  const origin = (resolvedSearchParams.origin || '').trim();
  const price = (resolvedSearchParams.price || '').trim();
  const abv = (resolvedSearchParams.abv || '').trim();
  const meta = categoryKey ? CATEGORIES[categoryKey] : null;

  if (categoryKey && !meta) {
    notFound();
  }

  if (!meta) {
    return (
      <div className="site-container pt-10 pb-10">
        <div>
          <div className="brand-logo-gradient text-xs font-semibold tracking-normal">DANH MỤC</div>
          <h1 className="mt-2 text-3xl font-semibold">Loại sản phẩm</h1>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
          Mở menu danh mục và chọn &ldquo;Xem thêm&rdquo; để xem đầy đủ loại sản phẩm.
        </div>
      </div>
    );
  }

  const types = getTypesWithCounts(categoryKey);
  const typeInCategory = typeSlug && types.some((t) => t.slug === typeSlug);

  if (typeSlug && !typeInCategory) {
    notFound();
  }

  const categoryPool = getProductsByCategory(categoryKey);
  const pool = typeSlug
    ? categoryPool.filter((product) => getProductType(product) === typeSlug)
    : categoryPool;
  const filtered = filterProducts(pool, { origin, price, abv });
  const filterOptions = getSearchFilterOptions(pool);
  const activeTypeMeta = typeSlug ? types.find((t) => t.slug === typeSlug) : null;
  const hasExtraFilters = Boolean(origin || price || abv);

  return (
    <div className="site-container pt-10 pb-10">
      <div>
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">{meta.eyebrow}</div>
        <h1 className="mt-2 text-3xl font-semibold">
          {activeTypeMeta ? activeTypeMeta.label : meta.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">
          {activeTypeMeta
            ? `Sản phẩm loại ${activeTypeMeta.label.toLowerCase()} trong ${meta.title.toLowerCase()}`
            : meta.description}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
          <CategoryTypeSidebar
            categoryKey={categoryKey}
            types={types}
            activeType={typeSlug || ''}
            totalCount={categoryPool.length}
            origin={origin}
            price={price}
            abv={abv}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <Suspense
            fallback={
              <div className="h-28 rounded-2xl border border-white/10 bg-premium-dark/40" aria-hidden />
            }
          >
            <ProductFilters
              basePath="/tag"
              origins={filterOptions.origins}
              showCategoryFilter={false}
              preservedKeys={['category', 'type']}
              ariaLabel="Bộ lọc danh mục"
            />
          </Suspense>

          <div className="mt-6 text-sm text-body-muted">
            {filtered.length}/{pool.length} sản phẩm
            {hasExtraFilters ? ' (đã lọc)' : ''}
          </div>

          <div className="mt-6">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
                Chưa có sản phẩm phù hợp. Hãy thử loại hoặc bộ lọc khác.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
