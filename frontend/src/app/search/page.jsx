import { Suspense } from "react";
import { createPageMetadata } from "../../lib/seo";
import { getProducts } from "../../lib/sanity/productStore";
import SearchResults from "./SearchResults";

import { PAGE_REVALIDATE_SECONDS } from '../../lib/revalidate';

export const revalidate = PAGE_REVALIDATE_SECONDS;

export const metadata = createPageMetadata({
  title: "Tìm kiếm sản phẩm",
  description:
    "Tìm kiếm các sản phẩm rượu vang, bia nhập khẩu tại LUVINI & CO.",
  alternates: { canonical: "/search" },
  robots: {
    index: false,
    follow: true,
  },
});

function SearchResultsFallback() {
  return (
    <div className="site-container pt-10 pb-10">
      <div className="h-10 w-56 animate-pulse rounded bg-white/5" aria-hidden />
      <div className="mt-4 h-8 w-64 animate-pulse rounded bg-white/5" aria-hidden />
      <div
        className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40"
        aria-hidden
      />
    </div>
  );
}

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<SearchResultsFallback />}>
      <SearchResults products={products} />
    </Suspense>
  );
}
