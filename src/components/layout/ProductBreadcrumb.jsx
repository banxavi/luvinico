'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '../../data/categories';
import { getProductCategory } from '../../lib/catalog';
import { getSearchParam } from '../../lib/router-utils';

export default function ProductBreadcrumb({ product }) {
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : '';
  const fromSearch = getSearchParam(search, 'from') === 'search';
  const searchQuery = getSearchParam(search, 'q').trim();

  const categoryKey = product ? getProductCategory(product) : null;
  const category = categoryKey ? CATEGORIES[categoryKey] : null;

  const searchCrumb = fromSearch
    ? {
        key: 'search',
        label: searchQuery ? `Tìm kiếm “${searchQuery}”` : 'Tìm kiếm',
        path: searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search',
      }
    : null;

  const crumbs = [
    { key: 'home', label: 'Trang chủ', path: '/' },
    ...(searchCrumb ? [searchCrumb] : []),
    ...(!searchCrumb && category ? [{ key: category.key, label: category.title, path: category.path }] : []),
    ...(product?.name ? [{ key: 'product', label: product.name, current: true }] : []),
  ];

  return (
    <nav aria-label="Đường dẫn" className="product-breadcrumb mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {crumbs.map((crumb, index) => (
          <li key={crumb.key} className="inline-flex min-w-0 max-w-full items-center gap-1.5">
            {index > 0 ? (
              <span className="shrink-0 text-white/20 select-none" aria-hidden>
                /
              </span>
            ) : null}
            {crumb.current ? (
              <span
                aria-current="page"
                className="truncate font-medium text-white/90"
                title={crumb.label}
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="shrink-0 rounded-sm text-body-muted transition-colors hover:text-brand-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
