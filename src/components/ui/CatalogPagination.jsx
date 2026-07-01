import Link from 'next/link';
import { buildPaginatedHref } from '../../lib/pagination';

const navBtnClass =
  'inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-white/10 bg-premium-dark px-3 text-sm font-medium text-white transition hover:border-brand-amber/40 hover:text-brand-amber disabled:pointer-events-none disabled:opacity-40';

const pageLinkClass = (active) =>
  [
    'inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition',
    active
      ? 'bg-brand-amber/15 text-brand-amber ring-1 ring-brand-amber/35'
      : 'text-body-muted hover:bg-white/5 hover:text-white',
  ].join(' ');

function getVisiblePages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
}

export default function CatalogPagination({ basePath, searchParams = {}, page, totalPages }) {
  if (!totalPages || totalPages <= 1) return null;

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Phân trang sản phẩm"
    >
      {page > 1 ? (
        <Link
          href={buildPaginatedHref(basePath, searchParams, page - 1)}
          className={navBtnClass}
          rel="prev"
        >
          ← Trước
        </Link>
      ) : (
        <span className={navBtnClass} aria-disabled="true">
          ← Trước
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1 px-1">
        {visiblePages.map((pageNum, index) => {
          const prev = visiblePages[index - 1];
          const showEllipsis = prev && pageNum - prev > 1;

          return (
            <span key={pageNum} className="flex items-center gap-1">
              {showEllipsis ? <span className="px-1 text-body-subtle">…</span> : null}
              {pageNum === page ? (
                <span className={pageLinkClass(true)} aria-current="page">
                  {pageNum}
                </span>
              ) : (
                <Link
                  href={buildPaginatedHref(basePath, searchParams, pageNum)}
                  className={pageLinkClass(false)}
                >
                  {pageNum}
                </Link>
              )}
            </span>
          );
        })}
      </div>

      {page < totalPages ? (
        <Link
          href={buildPaginatedHref(basePath, searchParams, page + 1)}
          className={navBtnClass}
          rel="next"
        >
          Sau →
        </Link>
      ) : (
        <span className={navBtnClass} aria-disabled="true">
          Sau →
        </span>
      )}
    </nav>
  );
}
