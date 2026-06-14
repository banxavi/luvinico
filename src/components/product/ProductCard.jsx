import Link from 'next/link';
import Image from 'next/image';
import { productPath } from '../../lib/products';
import ProductPrice from './ProductPrice';

function resolveImageSrc(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return image.src ?? image;
}

export default function ProductCard({ product, compact = false, searchQuery }) {
  const href = productPath(
    product,
    searchQuery ? { from: 'search', q: searchQuery } : undefined,
  );
  const imageSrc = resolveImageSrc(product.image);

  return (
    <Link
      href={href}
      aria-label={`Xem chi tiết ${product.name}`}
      className={[
        'group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-premium-dark text-left transition',
        'hover:border-brand-amber/45 hover:shadow-lg hover:shadow-black/40',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber',
      ].join(' ')}
    >
      <div
        className={['product-media-well product-card-media', compact ? 'product-card-media--compact' : '']
          .filter(Boolean)
          .join(' ')}
      >
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

      <div className={`flex flex-1 flex-col ${compact ? 'p-3 sm:p-4' : 'p-5'}`}>
        <h3 className={`line-clamp-2 text-center font-semibold text-white ${compact ? 'text-sm sm:text-base' : 'text-base'}`}>
          {product.name} {product.abv}
        </h3>

        <div className="mt-auto pt-3">
          <ProductPrice product={product} compact={compact} />
        </div>
      </div>
    </Link>
  );
}
