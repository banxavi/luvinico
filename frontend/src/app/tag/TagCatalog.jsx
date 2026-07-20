"use client";



import { Suspense } from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import ProductGrid from "../../components/product/ProductGrid";

import ProductFilters from "../../components/search/ProductFilters";

import CategoryTypeSidebar from "../../components/tag/CategoryTypeSidebar";

import { filterProducts, getSearchFilterOptions } from "../../lib/search";

import {

  CATALOG_PAGE_SIZE,

  formatPaginatedProductCount,

  paginateItems,

  parsePageParam,

} from "../../lib/pagination";

import CatalogPagination from "../../components/ui/CatalogPagination";

import {

  getCatalogSidebarTypes,

  getProductType,

  getProductsForNavGroup,

  getTypeMeta,

  resolveGroupKey,

  resolveTypeSlug,

} from "../../lib/types";

import { getNavMenuGroupFromCatalog } from "../../lib/sanity/catalogStore";

import { getProductsByCategory } from "../../lib/catalog";

import { useProducts, useCatalog } from "../../context/SiteDataContext";



function TagNotFound() {

  return (

    <div className="site-container py-16 text-center">

      <p className="text-xs font-semibold tracking-normal text-brand-amber">404</p>

      <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Không tìm thấy trang</h1>

      <p className="mt-3 text-sm text-body-muted sm:text-base">

        Đường dẫn có thể không đúng hoặc sản phẩm đã ngừng hiển thị.

      </p>

      <Link

        href="/"

        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-amber px-6 py-3 text-sm font-semibold text-premium-black transition hover:bg-[#e0ad2a]"

      >

        Về trang chủ

      </Link>

    </div>

  );

}



function TagCatalogContent({ products: productsProp }) {

  const contextProducts = useProducts();

  const catalog = useCatalog();

  const products = productsProp ?? contextProducts;

  const searchParams = useSearchParams();

  const categoryKey = (searchParams.get("category") || "").trim();

  const groupKey = resolveGroupKey(catalog, categoryKey, searchParams.get("group") || "");

  const rawType = (searchParams.get("type") || "").trim();

  const typeSlug = resolveTypeSlug(rawType, catalog, {

    categoryKey,

    groupKey: groupKey || "",

  });

  const origin = (searchParams.get("origin") || "").trim();

  const price = (searchParams.get("price") || "").trim();

  const abv = (searchParams.get("abv") || "").trim();

  const pageParam = (searchParams.get("page") || "").trim();

  const meta = categoryKey ? catalog.categories[categoryKey] : null;

  const groupMeta = groupKey ? getNavMenuGroupFromCatalog(catalog, categoryKey, groupKey) : null;



  if (categoryKey && !meta) {

    return <TagNotFound />;

  }



  if (groupKey && !groupMeta) {

    return <TagNotFound />;

  }



  if (!meta) {

    return (

      <div className="site-container pt-10 pb-10">

        <div>

          <div className="brand-logo-gradient text-xs font-semibold tracking-normal">

            DANH MỤC

          </div>

          <h1 className="mt-2 text-3xl font-semibold">Loại sản phẩm</h1>

        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">

          Mở menu danh mục và chọn &ldquo;Xem thêm&rdquo; để xem đầy đủ loại sản

          phẩm.

        </div>

      </div>

    );

  }



  if (rawType && !typeSlug) {

    return <TagNotFound />;

  }



  const types = getCatalogSidebarTypes(products, catalog, categoryKey, groupKey || "");



  const categoryPool = groupKey

    ? getProductsForNavGroup(products, catalog, categoryKey, groupKey)

    : getProductsByCategory(products, categoryKey);

  const pool = typeSlug

    ? categoryPool.filter((product) => getProductType(product, catalog) === typeSlug)

    : categoryPool;

  const filtered = filterProducts(pool, { origin, price, abv });

  const pagination = paginateItems(filtered, {

    page: parsePageParam(pageParam),

    limit: CATALOG_PAGE_SIZE,

  });

  const displayProducts = pagination.items;

  const filterOptions = getSearchFilterOptions(pool, { catalog });

  const activeTypeMeta = typeSlug ? getTypeMeta(catalog, typeSlug) : null;

  const hasExtraFilters = Boolean(origin || price || abv);

  const paginationSearchParams = {

    category: categoryKey,

    ...(groupKey ? { group: groupKey } : {}),

    ...(typeSlug ? { type: typeSlug } : {}),

    origin,

    price,

    abv,

  };



  const pageTitle = activeTypeMeta

    ? activeTypeMeta.label

    : groupMeta

      ? groupMeta.label

      : meta.title;



  const pageDescription = activeTypeMeta

    ? `Sản phẩm ${activeTypeMeta.label}${groupMeta ? ` — ${groupMeta.label}` : ""}`

    : groupMeta

      ? `Tất cả sản phẩm ${groupMeta.label}`

      : meta.description;



  return (

    <div className="site-container pt-10 pb-10">

      <div>

        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">

          {meta.eyebrow}

        </div>

        <h1 className="mt-2 text-3xl font-semibold">{pageTitle}</h1>

        <p className="mt-2 max-w-2xl text-sm text-body-muted">{pageDescription}</p>

      </div>



      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">

        <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-60">

          <CategoryTypeSidebar

            categoryKey={categoryKey}

            groupKey={groupKey || ""}

            groupLabel={groupMeta?.label ?? ""}

            types={types}

            activeType={typeSlug || ""}

            totalCount={categoryPool.length}

            origin={origin}

            price={price}

            abv={abv}

          />

        </aside>



        <div className="min-w-0 flex-1">

          <Suspense

            fallback={

              <div

                className="h-28 rounded-2xl border border-white/10 bg-premium-dark/40"

                aria-hidden

              />

            }

          >

            <ProductFilters

              basePath="/tag"

              origins={filterOptions.origins}

              showCategoryFilter={false}

              preservedKeys={["category", "group", "type"]}

              ariaLabel="Bộ lọc danh mục"

            />

          </Suspense>



          <div className="mt-6 text-sm text-body-muted">

            {formatPaginatedProductCount(pagination)}

            {hasExtraFilters ? " (đã lọc)" : ""}

          </div>



          <div className="mt-6">

            {displayProducts.length > 0 ? (

              <>

                <ProductGrid products={displayProducts} />

                <CatalogPagination

                  basePath="/tag"

                  searchParams={paginationSearchParams}

                  page={pagination.page}

                  totalPages={pagination.totalPages}

                />

              </>

            ) : (

              <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">

                Chưa có sản phẩm phù hợp. Hãy thử loại hoặc bộ lọc khác.

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}



export default function TagCatalog({ products }) {

  return <TagCatalogContent products={products} />;

}


