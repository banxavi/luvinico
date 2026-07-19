"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters from "../../components/search/ProductFilters";
import { filterProducts, getSearchFilterOptions } from "../../lib/search";
import {
  CATALOG_PAGE_SIZE,
  formatPaginatedProductCount,
  paginateItems,
  parsePageParam,
} from "../../lib/pagination";
import { resolveTypeSlug } from "../../lib/types";
import CatalogPagination from "../../components/ui/CatalogPagination";
import { getProductsByCategory } from "../../lib/catalog";
import { useProducts, useCatalog } from "../../context/SiteDataContext";

export default function CategoryCatalog({ categoryKey, products: productsProp }) {
  const contextProducts = useProducts();
  const catalog = useCatalog();
  const products = productsProp ?? contextProducts;
  const searchParams = useSearchParams();
  const origin = (searchParams.get("origin") || "").trim();
  const price = (searchParams.get("price") || "").trim();
  const abv = (searchParams.get("abv") || "").trim();
  const typeSlug = resolveTypeSlug(searchParams.get("type") || "", catalog, {
    categoryKey,
  });
  const pageParam = (searchParams.get("page") || "").trim();

  const pool = getProductsByCategory(products, categoryKey);
  const filtered = filterProducts(pool, {
    origin,
    price,
    abv,
    type: typeSlug || "",
  });
  const pagination = paginateItems(filtered, {
    page: parsePageParam(pageParam),
    limit: CATALOG_PAGE_SIZE,
  });
  const displayProducts = pagination.items;
  const filterOptions = getSearchFilterOptions(pool, { includeTypes: true, catalog });
  const hasActiveFilters = Boolean(origin || price || abv || typeSlug);
  const paginationSearchParams = {
    origin,
    price,
    abv,
    ...(typeSlug ? { type: typeSlug } : {}),
  };
  const basePath = `/${categoryKey}`;

  return (
    <>
      <Suspense
        fallback={
          <div
            className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40"
            aria-hidden
          />
        }
      >
        <ProductFilters
          basePath={basePath}
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
            {formatPaginatedProductCount(pagination)}
            {hasActiveFilters ? " (đã lọc)" : ""}
          </>
        ) : (
          "Chưa có sản phẩm trong danh mục này."
        )}
      </div>

      <div className="mt-6">
        {displayProducts.length > 0 ? (
          <>
            <ProductGrid products={displayProducts} />
            <CatalogPagination
              basePath={basePath}
              searchParams={paginationSearchParams}
              page={pagination.page}
              totalPages={pagination.totalPages}
            />
          </>
        ) : pool.length > 0 ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
            Không tìm thấy sản phẩm phù hợp. Hãy thử bộ lọc khác.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-8 text-center">
            <p className="text-sm text-body-muted sm:text-base">
              Danh mục đang được chuẩn bị. Vui lòng liên hệ hotline để được tư
              vấn trực tiếp.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
