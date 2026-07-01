/** Số sản phẩm mỗi trang — trang danh mục & tag (không áp dụng homepage) */
export const CATALOG_PAGE_SIZE = 20;

export function parsePageParam(page, { maxPage = Infinity } = {}) {
  const parsed = Number.parseInt(String(page ?? ''), 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  if (Number.isFinite(maxPage) && maxPage >= 1 && parsed > maxPage) return maxPage;
  return parsed;
}

/**
 * Cắt mảng theo trang — clamp page về [1, totalPages].
 * @returns {{ items, page, limit, total, totalPages, hasPrevious, hasNext, startIndex, endIndex }}
 */
export function paginateItems(items, { page = 1, limit = CATALOG_PAGE_SIZE } = {}) {
  const list = items ?? [];
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * limit;

  const pageItems = list.slice(offset, offset + limit);

  return {
    items: pageItems,
    page: safePage,
    limit,
    total,
    pageCount: pageItems.length,
    totalPages,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    startIndex: total === 0 ? 0 : offset + 1,
    endIndex: Math.min(offset + limit, total),
  };
}

/** Hiển thị: 2/20 sản phẩm · Tổng 2 */
export function formatPaginatedProductCount(pagination) {
  if (!pagination || pagination.total === 0) return '0 sản phẩm';

  const { pageCount, limit, total, page, totalPages } = pagination;
  const base = `${pageCount}/${limit} sản phẩm · Tổng ${total}`;
  return totalPages > 1 ? `${base} · Trang ${page}/${totalPages}` : base;
}

/** Ghép query string, giữ filter hiện tại; page=1 thì bỏ param page */
export function buildPaginatedHref(basePath, searchParams = {}, page = 1) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === 'page') return;
    const next = String(value ?? '').trim();
    if (next) params.set(key, next);
  });

  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
