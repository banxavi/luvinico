import { BRAND } from '../../data/brand';
import { resolveProductImageUrl } from '../../lib/products';

export default function ProductJsonLd({ product }) {
  if (!product) return null;

  const image = resolveProductImageUrl(product.image);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription ?? product.description,
    image: image ? [image] : undefined,
    brand: {
      '@type': 'Brand',
      name: BRAND.name,
    },
    offers: {
      '@type': 'Offer',
      price: product.contactPrice ? undefined : product.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `/product/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
