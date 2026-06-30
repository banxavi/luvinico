import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import facebookIcon from "../../../assets/facebook-icon.svg";
import { BRAND } from "../../../data/brand";
import { formatPhoneDisplay } from "../../../lib/formatters";
import { buildTelHref, buildZaloHref } from "../../../lib/links";
import {
  getAllProductSlugs,
  getProductBySlug,
  getProductGallery,
  getRelatedProducts,
  getRedirectSlugFromLegacyPath,
  resolveProductImageUrl,
} from "../../../lib/products";
import { createPageMetadata } from '../../../lib/seo';
import { getSaleDiscountPercent, isProductOnSale } from '../../../lib/pricing';
import ProductBreadcrumb from "../../../components/layout/ProductBreadcrumb";
import ProductCard from "../../../components/product/ProductCard";
import ProductImageGallery from "../../../components/product/ProductImageGallery";
import ProductPrice from "../../../components/product/ProductPrice";
import ProductDetailContent from "../../../components/product/ProductDetailContent";
import ProductJsonLd from "../../../components/seo/ProductJsonLd";
import ProductScrollHandler from "./ProductScrollHandler";
import Link from "next/link";

const HOTLINE = BRAND.hotline;

export function generateStaticParams() {
  return getAllProductSlugs().map((productSlug) => ({ productSlug }));
}

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product) {
    return createPageMetadata({ title: 'Không tìm thấy sản phẩm' });
  }
  const title = `${product.name} — Rượu vang & Bia nhập khẩu`;
  const description =
    product.description || `Chi tiết sản phẩm ${product.name} tại LUVINI & CO.`;
  const image = resolveProductImageUrl(product.image);

  return createPageMetadata({
    title,
    description,
    alternates: {
      canonical: `/product/${productSlug}`,
    },
    openGraph: {
      images: image ? [{ url: image, alt: product.name }] : [],
    },
  });
}

export default async function ProductDetailPage({ params, searchParams }) {
  const { productSlug } = await params;

  if (/^\d+$/.test(productSlug)) {
    const legacySlug = getRedirectSlugFromLegacyPath(productSlug);
    if (legacySlug) {
      redirect(`/product/${legacySlug}`);
    }
  }

  const resolvedSearchParams = await searchParams;
  const searchQuery =
    resolvedSearchParams.from === "search"
      ? (resolvedSearchParams.q || "").trim()
      : "";

  const product = getProductBySlug(productSlug);
  const related = product ? getRelatedProducts(product.id) : [];
  const gallery = product ? getProductGallery(product) : [];

  if (!product) {
    notFound();
  }

  const onSale = isProductOnSale(product);
  const discountPercent = onSale ? getSaleDiscountPercent(product) : null;

  const specs = [
    { label: "Xuất xứ", value: product.origin },
    { label: "Phong cách", value: product.style },
    { label: "ABV", value: product.abv },
    { label: "IBU", value: product.ibu ?? "—" },
    { label: "Dung tích", value: product.volume ?? "—" },
    { label: "Nhiệt độ uống", value: product.serveTemp ?? "—" },
  ].filter((s) => s.value && s.value !== "—");

  return (
    <article className="pb-16">
      <ProductJsonLd product={product} />
      <ProductScrollHandler slug={productSlug} />
      <div className="site-container pt-10 sm:pt-12">
        <Suspense fallback={<div className="mb-6 h-5 sm:mb-8" aria-hidden />}>
          <ProductBreadcrumb product={product} />
        </Suspense>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductImageGallery images={gallery} alt={product.name} />

          <div>
            <p className="text-xs font-semibold tracking-normal text-brand-amber">
              CHI TIẾT SẢN PHẨM
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {product.name}
            </h1>
            {product.origin ? (
              <p className="mt-2 text-sm text-body-muted">
                Xuất xứ: <span className="text-white/90">{product.origin}</span>
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {onSale && discountPercent ? (
                <span className="product-sale-badge product-sale-badge--detail">
                  Giảm {discountPercent}%
                </span>
              ) : null}
              <ProductPrice product={product} size="lg" layout="inline" />
            </div>

            <p className="mt-4 text-base leading-relaxed text-body-muted">
              {product.description}
            </p>

            {specs.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map((s, index) => (
                  <div
                    key={`spec-${index}-${s.label}`}
                    className="rounded-xl border border-white/10 bg-premium-dark/80 px-3 py-3"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-amber/80">
                      {s.label}
                    </div>
                    <div className="mt-1 text-sm font-medium text-white">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                href={buildTelHref(HOTLINE)}
                className="contact-btn contact-btn--phone"
              >
                Gọi {formatPhoneDisplay(HOTLINE)}
              </Link>
              <Link
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                className="contact-btn contact-btn--facebook"
              >
                <Image
                  src={facebookIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 object-contain"
                />
                Facebook
              </Link>
              <Link
                href={buildZaloHref(HOTLINE)}
                target="_blank"
                rel="noreferrer"
                className="contact-btn contact-btn--zalo"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 object-contain"
                />
                Zalo tư vấn
              </Link>
            </div>

            <p className="mt-4 text-xs text-body-subtle sm:text-[14px]">
              Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.
            </p>
          </div>
        </div>

        <ProductDetailContent content={product.content} />

        {!product.content?.length && product.longDescription ? (
          <section className="mt-12 border-t border-white/10 pt-10">
            <p className="text-base leading-relaxed text-body-muted">
              {product.longDescription}
            </p>
          </section>
        ) : null}

        {related.length > 0 ? (
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
        ) : null}
      </div>
    </article>
  );
}
