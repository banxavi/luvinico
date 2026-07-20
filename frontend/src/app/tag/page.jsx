import { Suspense } from "react";
import { createPageMetadata } from "../../lib/seo";
import { getProducts } from "../../lib/sanity/productStore";
import TagCatalog from "./TagCatalog";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: "Loại sản phẩm",
  description:
    "Danh sách loại sản phẩm rượu vang, bia nhập khẩu tại LUVINI & CO.",
  alternates: { canonical: "/tag" },
});

function TagCatalogFallback() {
  return (
    <div className="site-container pt-10 pb-10">
      <div className="h-10 w-48 animate-pulse rounded bg-white/5" aria-hidden />
      <div className="mt-4 h-8 w-72 animate-pulse rounded bg-white/5" aria-hidden />
      <div
        className="mt-8 h-64 rounded-2xl border border-white/10 bg-premium-dark/40"
        aria-hidden
      />
    </div>
  );
}

export default async function TagIndexPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<TagCatalogFallback />}>
      <TagCatalog products={products} />
    </Suspense>
  );
}
