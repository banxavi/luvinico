"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND } from "../../data/brand";
import { mockProducts } from "../../mockData";
import ProductGrid from "../../components/product/ProductGrid";
import SearchFilters from "../../components/search/SearchFilters";
import { filterProducts, getSearchFilterOptions } from "../../lib/search";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();
  const origin = (searchParams.get("origin") || "").trim();
  const category = (searchParams.get("category") || "").trim();
  const price = (searchParams.get("price") || "").trim();
  const abv = (searchParams.get("abv") || "").trim();

  const filtered = filterProducts(mockProducts, {
    q,
    origin,
    category,
    price,
    abv,
  });
  const filterOptions = getSearchFilterOptions(mockProducts);
  const hasSearchOrFilters = Boolean(q || origin || category || price || abv);

  return (
    <div className="site-container pt-10 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="brand-logo-gradient text-xs font-semibold tracking-normal">
            TÌM KIẾM · {BRAND.name}
          </div>
          <h1 className="mt-2 text-3xl font-semibold">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-body-muted">
            Từ khoá:{" "}
            <span className="text-white/85">&ldquo;{q || "—"}&rdquo;</span>
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div
            className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40"
            aria-hidden
          />
        }
      >
        <SearchFilters
          origins={filterOptions.origins}
          categories={filterOptions.categories}
        />
      </Suspense>

      <div className="mt-6 text-sm text-body-muted">
        {hasSearchOrFilters ? (
          <>
            {filtered.length}/{mockProducts.length} sản phẩm
          </>
        ) : (
          "Nhập từ khoá hoặc chọn bộ lọc để bắt đầu."
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
