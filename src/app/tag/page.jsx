import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '../../data/categories';
import { getNavMenuGroup } from '../../data/navMenu';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/search/ProductFilters';
import CategoryTypeSidebar from '../../components/tag/CategoryTypeSidebar';
import { filterProducts, getSearchFilterOptions } from '../../lib/search';
import { createPageMetadata } from '../../lib/seo';
import { CATALOG_PAGE_SIZE, formatPaginatedProductCount, paginateItems, parsePageParam } from '../../lib/pagination';
import CatalogPagination from '../../components/ui/CatalogPagination';
import {
  getProductType,
  getProductsForNavGroup,
  getTypesWithCounts,
  resolveGroupKey,
  resolveTypeSlug,
} from '../../lib/types';
import { getProductsByCategory } from '../../lib/catalog';

function buildTagCanonical({ category, group, type, origin, price, abv, page }) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (group) params.set('group', group);
  if (type) params.set('type', type);
  if (origin) params.set('origin', origin);
  if (price) params.set('price', price);
  if (abv) params.set('abv', abv);
  if (page && Number(page) > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/tag?${query}` : '/tag';
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categoryKey = (resolvedSearchParams.category || '').trim();
  const groupKey = resolveGroupKey(categoryKey, resolvedSearchParams.group || '');
  const typeSlug = resolveTypeSlug(resolvedSearchParams.type || '', {
    categoryKey,
    groupKey: groupKey || '',
  });
  const meta = categoryKey ? CATEGORIES[categoryKey] : null;
  const groupMeta = groupKey ? getNavMenuGroup(categoryKey, groupKey) : null;
  const canonical = buildTagCanonical({
    category: categoryKey,
    group: groupKey || '',
    type: typeSlug || '',
    origin: resolvedSearchParams.origin || '',
    price: resolvedSearchParams.price || '',
    abv: resolvedSearchParams.abv || '',
    page: resolvedSearchParams.page || '',
  });

  if (meta && typeSlug) {
    const types = getTypesWithCounts(categoryKey, groupKey || '');
    const typeMeta = types.find((t) => t.slug === typeSlug);
    const scope = groupMeta?.label ?? meta.title;
    return createPageMetadata({
      title: `${typeMeta?.label ?? typeSlug} — ${scope}`,
      description: `Xem sản phẩm ${typeMeta?.label?.toLowerCase() ?? typeSlug} tại LUVINI & CO.`,
      alternates: { canonical },
    });
  }

  if (meta && groupMeta) {
    return createPageMetadata({
      title: `${groupMeta.label} — ${meta.title}`,
      description: `Xem tất cả sản phẩm ${groupMeta.label.toLowerCase()} tại LUVINI & CO.`,
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
  const groupKey = resolveGroupKey(categoryKey, resolvedSearchParams.group || '');
  const typeSlug = resolveTypeSlug(resolvedSearchParams.type || '', {
    categoryKey,
    groupKey: groupKey || '',
  });
  const origin = (resolvedSearchParams.origin || '').trim();
  const price = (resolvedSearchParams.price || '').trim();
  const abv = (resolvedSearchParams.abv || '').trim();
  const pageParam = (resolvedSearchParams.page || '').trim();
  const meta = categoryKey ? CATEGORIES[categoryKey] : null;
  const groupMeta = groupKey ? getNavMenuGroup(categoryKey, groupKey) : null;

  if (categoryKey && !meta) {
    notFound();
  }

  if (groupKey && !groupMeta) {
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

  const types = getTypesWithCounts(categoryKey, groupKey || '');
  const typeInScope = typeSlug && types.some((t) => t.slug === typeSlug);

  if (typeSlug && !typeInScope) {
    notFound();
  }

  const categoryPool = groupKey
    ? getProductsForNavGroup(categoryKey, groupKey)
    : getProductsByCategory(categoryKey);
  const pool = typeSlug
    ? categoryPool.filter((product) => getProductType(product) === typeSlug)
    : categoryPool;
  const filtered = filterProducts(pool, { origin, price, abv });
  const pagination = paginateItems(filtered, {
    page: parsePageParam(pageParam),
    limit: CATALOG_PAGE_SIZE,
  });
  const displayProducts = pagination.items;
  const filterOptions = getSearchFilterOptions(pool);
  const activeTypeMeta = typeSlug ? types.find((t) => t.slug === typeSlug) : null;
  const hasExtraFilters = Boolean(origin || price || abv);
  const paginationSearchParams = {
    category: categoryKey,
    ...(groupKey ? { group: groupKey } : {}),
    ...(typeSlug ? { type: typeSlug } : {}),
    origin,
    price,
    abv,
  };

  const pageTitle = activeTypeMeta
    ? activeTypeMeta.label
    : groupMeta
      ? groupMeta.label
      : meta.title;

  const pageDescription = activeTypeMeta
    ? `Sản phẩm ${activeTypeMeta.label}${groupMeta ? ` — ${groupMeta.label}` : ''}`
    : groupMeta
      ? `Tất cả sản phẩm ${groupMeta.label}`
      : meta.description;

  return (
    <div className="site-container pt-10 pb-10">
      <div>
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">{meta.eyebrow}</div>
        <h1 className="mt-2 text-3xl font-semibold">{pageTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">{pageDescription}</p>
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
          <CategoryTypeSidebar
            categoryKey={categoryKey}
            groupKey={groupKey || ''}
            groupLabel={groupMeta?.label ?? ''}
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
              preservedKeys={['category', 'group', 'type']}
              ariaLabel="Bộ lọc danh mục"
            />
          </Suspense>

          <div className="mt-6 text-sm text-body-muted">
            {formatPaginatedProductCount(pagination)}
            {hasExtraFilters ? ' (đã lọc)' : ''}
          </div>

          <div className="mt-6">
            {displayProducts.length > 0 ? (
              <>
                <ProductGrid products={displayProducts} />
                <CatalogPagination
                  basePath="/tag"
                  searchParams={paginationSearchParams}
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                />
              </>
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
