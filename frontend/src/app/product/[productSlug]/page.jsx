import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import facebookIcon from "../../../assets/facebook-icon.svg";
import { BRAND } from "../../../data/brand";
import { formatPhoneDisplay } from "../../../lib/formatters";
import { buildTelHref, buildZaloHref } from "../../../lib/links";
import {
  getProductGallery,
  getRedirectSlugFromLegacyPath,
  getRelatedProducts,
  resolveProductImageUrl,
} from "../../../lib/products";
import { createPageMetadata } from '../../../lib/seo';
import { portableTextToPlain } from '../../../lib/portableText';
import { getSaleDiscountPercent, isProductOnSale } from '../../../lib/pricing';
import {
  getProductBySlugFromStore,
  getProducts,
} from '../../../lib/sanity/productStore';
import ProductBreadcrumb from "../../../components/layout/ProductBreadcrumb";
import ProductImageGallery from "../../../components/product/ProductImageGallery";
import ProductPrice from "../../../components/product/ProductPrice";
import BodyContent from "../../../components/content/BodyContent";
import ProductJsonLd from "../../../components/seo/ProductJsonLd";
import ProductScrollHandler from "./ProductScrollHandler";
import RelatedProducts from "./RelatedProducts";
import Link from "next/link";

const HOTLINE = BRAND.hotline;

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const product = await getProductBySlugFromStore(productSlug);
  if (!product) {
    return createPageMetadata({ title: 'Không tìm thấy sản phẩm' });
  }
  const title = `${product.name} | Rượu vang & Bia nhập khẩu`;
  const description =
    portableTextToPlain(product.description) ||
    `Chi tiết sản phẩm ${product.name} tại LUVINI & CO.`;
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

export default async function ProductDetailPage({ params }) {
  const { productSlug } = await params;

  if (/^\d+$/.test(productSlug)) {
    const products = await getProducts();
    const legacySlug = getRedirectSlugFromLegacyPath(products, productSlug);
    if (legacySlug) {
      redirect(`/product/${legacySlug}`);
    }
  }

  const [product, products] = await Promise.all([
    getProductBySlugFromStore(productSlug),
    getProducts(),
  ]);
  const related = product ? getRelatedProducts(products, product.id) : [];
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

            <BodyContent value={product.description} className="mt-4" />

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

        {product.content?.length ? (
          <section className="mt-12 border-t border-white/10 pt-10">
            <BodyContent value={product.content} />
          </section>
        ) : null}

        {related.length > 0 ? (
          <Suspense fallback={null}>
            <RelatedProducts related={related} />
          </Suspense>
        ) : null}
      </div>
    </article>
  );
}
