import Link from "next/link";
import Image from "next/image";
import { productPath } from "../../lib/products";
import { getSaleDiscountPercent, isProductOnSale } from "../../lib/pricing";
import ProductPrice from "./ProductPrice";

function resolveImageSrc(image) {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.src ?? image;
}

export default function ProductCard({ product, compact = false, searchQuery }) {
  const href = productPath(
    product,
    searchQuery ? { from: "search", q: searchQuery } : undefined,
  );
  const imageSrc = resolveImageSrc(product.image);
  const onSale = isProductOnSale(product);
  const discountPercent = onSale ? getSaleDiscountPercent(product) : null;

  return (
    <Link
      href={href}
      aria-label={`Xem chi tiết ${product.name}`}
      className={[
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-premium-dark text-left transition",
        onSale
          ? "border-brand-amber/35 shadow-md shadow-brand-amber/10 hover:border-brand-amber/55 hover:shadow-brand-amber/15"
          : "border-white/10 hover:border-brand-amber/45 hover:shadow-lg hover:shadow-black/40",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber",
      ].join(" ")}
    >
      <div
        className={[
          "product-media-well product-card-media",
          compact ? "product-card-media--compact" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {onSale ? (
          <span className="product-sale-badge" aria-hidden>
            {discountPercent ? `-${discountPercent}%` : "GIẢM GIÁ"}
          </span>
        ) : null}
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="product-media-well__img object-contain"
          />
        ) : null}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${compact ? "p-3 sm:p-4" : "p-5"}`}>
        <h3
          className={`line-clamp-2 text-center font-semibold text-white ${compact ? "text-sm sm:text-base" : "text-base"}`}
        >
          {product.name} {product.abv}
        </h3>

        {product.origin ? (
          <p
            className={`mt-1 text-center text-body-muted ${compact ? "text-xs" : "text-sm"}`}
          >
            Xuất xứ: {product.origin}
          </p>
        ) : null}

        <div className="mt-auto min-w-0 pt-3">
          <ProductPrice product={product} layout="stack" size={compact ? "sm" : "md"} />
        </div>
      </div>
    </Link>
  );
}
