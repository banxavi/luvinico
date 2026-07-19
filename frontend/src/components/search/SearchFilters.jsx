"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PRICE_FILTERS } from "../../lib/search";

const selectClassName =
  "py-3 h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-premium-dark px-3 text-sm text-white outline-none transition focus:border-brand-amber/55 focus:shadow-[0_0_0_1px_rgba(212,160,23,0.2)]";

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

export default function SearchFilters({ origins = [], categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin") ?? "";
  const category = searchParams.get("category") ?? "";
  const price = searchParams.get("price") ?? "";

  const hasActiveFilters = Boolean(origin || category || price);

  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, val]) => {
        const next = String(val ?? "").trim();
        if (next) params.set(key, next);
        else params.delete(key);
      });

      const query = params.toString();
      router.push(query ? `/search?${query}` : "/search");
    },
    [router, searchParams],
  );

  const clearFilters = () => {
    updateParams({ origin: "", category: "", price: "" });
  };

  return (
    <section
      aria-label="Bộ lọc tìm kiếm"
      className="mt-6 rounded-2xl border border-white/10 bg-premium-dark/60 p-4 sm:p-5"
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
          id="search-filter-price"
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
          id="search-filter-origin"
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
          id="search-filter-category"
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
      </div>
    </section>
  );
}
