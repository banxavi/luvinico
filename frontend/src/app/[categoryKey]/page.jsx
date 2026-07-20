import { Suspense } from "react";
import { notFound } from "next/navigation";
import CatalogPageHeader from "../../components/layout/CatalogPageHeader";
import { createPageMetadata } from "../../lib/seo";
import { getCategoryByKey, getAllCategoryKeys } from "../../lib/sanity/catalogStore";
import { getProducts } from "../../lib/sanity/productStore";
import CategoryCatalog from "./CategoryCatalog";

import { PAGE_REVALIDATE_SECONDS } from '../../lib/revalidate';

export const revalidate = PAGE_REVALIDATE_SECONDS;

export async function generateStaticParams() {
  const keys = await getAllCategoryKeys();
  return keys.map((categoryKey) => ({ categoryKey }));
}

export async function generateMetadata({ params }) {
  const { categoryKey } = await params;
  const meta = await getCategoryByKey(categoryKey);
  if (!meta) {
    return createPageMetadata({ title: "Danh mục không tồn tại" });
  }
  return createPageMetadata({
    title: `${meta.title} | Nhập khẩu chính hãng`,
    description: (
      meta.description ||
      `Xem bộ sưu tập sản phẩm ${meta.title} tại LUVINI & CO.`
    ).replace(/\s+/g, " "),
    alternates: {
      canonical: `/${categoryKey}`,
    },
  });
}

function CategoryCatalogFallback() {
  return (
    <>
      <div
        className="mt-6 h-28 rounded-2xl border border-white/10 bg-premium-dark/40"
        aria-hidden
      />
      <div
        className="mt-6 h-64 rounded-2xl border border-white/10 bg-premium-dark/40"
        aria-hidden
      />
    </>
  );
}

export default async function CategoryPage({ params }) {
  const { categoryKey } = await params;
  const meta = await getCategoryByKey(categoryKey);

  if (!meta) {
    notFound();
  }

  const products = await getProducts();

  return (
    <div className="site-container pt-10 pb-10">
      <CatalogPageHeader
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={meta.description}
      />

      <Suspense fallback={<CategoryCatalogFallback />}>
        <CategoryCatalog categoryKey={categoryKey} products={products} />
      </Suspense>
    </div>
  );
}
