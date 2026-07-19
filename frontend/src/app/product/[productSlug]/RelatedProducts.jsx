"use client";

import { useSearchParams } from "next/navigation";
import { BRAND } from "../../../data/brand";
import ProductCard from "../../../components/product/ProductCard";

export default function RelatedProducts({ related }) {
  const searchParams = useSearchParams();
  const searchQuery =
    searchParams.get("from") === "search"
      ? (searchParams.get("q") || "").trim()
      : "";

  if (!related?.length) return null;

  return (
    <section className="mt-14 border-t border-white/10 pt-12">
      <h2 className="text-xl font-semibold text-white">
        Có thể bạn cũng thích
      </h2>
      <p className="mt-2 text-sm text-body-muted">
        Gợi ý thêm từ bộ sưu tập {BRAND.shortName}.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            compact
            searchQuery={searchQuery || undefined}
          />
        ))}
      </div>
    </section>
  );
}
