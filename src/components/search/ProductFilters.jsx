"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ABV_FILTERS, PRICE_FILTERS } from "../../lib/search";

const selectClassName =
  "h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-premium-dark px-3 py-3 text-sm text-white outline-none transition focus:border-brand-amber/55 focus:shadow-[0_0_0_1px_rgba(212,160,23,0.2)]";

function FilterField({ id, label, value, onChange, children }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-body-subtle">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={selectClassName}
      >
        {children}
      </select>
    </div>
  );
}

export default function ProductFilters({
  basePath = "/search",
  origins = [],
  categories = [],
  types = [],
  preservedKeys = [],
  showCategoryFilter = true,
  showTypeFilter = false,
  ariaLabel = "Bộ lọc sản phẩm",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin") ?? "";
  const category = searchParams.get("category") ?? "";
  const price = searchParams.get("price") ?? "";
  const abv = searchParams.get("abv") ?? "";
  const type = searchParams.get("type") ?? "";

  const hasActiveFilters = Boolean(origin || category || price || abv || type);

  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, val]) => {
        const next = String(val ?? "").trim();
        if (next) params.set(key, next);
        else params.delete(key);
      });

      preservedKeys.forEach((key) => {
        const val = searchParams.get(key);
        if (val) params.set(key, val);
      });

      const query = params.toString();
      router.push(query ? `${basePath}?${query}` : basePath);
    },
    [basePath, preservedKeys, router, searchParams],
  );

  const clearFilters = () => {
    updateParams({ origin: "", category: "", price: "", abv: "", type: "" });
  };

  return (
    <section
      aria-label={ariaLabel}
      className="rounded-2xl mt-5 border border-white/10 bg-premium-dark/60 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Lọc kết quả</h2>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-brand-amber underline-offset-2 hover:underline"
          >
            Xoá bộ lọc
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <FilterField
          id="filter-price"
          label="Giá"
          value={price}
          onChange={(e) => updateParams({ price: e.target.value })}
        >
          {PRICE_FILTERS.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterField>

        <FilterField
          id="filter-origin"
          label="Xuất xứ"
          value={origin}
          onChange={(e) => updateParams({ origin: e.target.value })}
        >
          <option value="">Tất cả xuất xứ</option>
          {origins.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </FilterField>

        <FilterField
          id="filter-abv"
          label="ABV"
          value={abv}
          onChange={(e) => updateParams({ abv: e.target.value })}
        >
          {ABV_FILTERS.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterField>

        {showTypeFilter && types.length > 0 ? (
          <FilterField
            id="filter-type"
            label="Loại"
            value={type}
            onChange={(e) => updateParams({ type: e.target.value })}
          >
            <option value="">Tất cả loại</option>
            {types.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterField>
        ) : null}

        {showCategoryFilter ? (
          <FilterField
            id="filter-category"
            label="Danh mục"
            value={category}
            onChange={(e) => updateParams({ category: e.target.value })}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterField>
        ) : null}
      </div>
    </section>
  );
}
