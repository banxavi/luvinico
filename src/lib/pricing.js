import { formatPrice } from './formatters';

export function resolveProductPrice(product) {
  if (!product) return { mode: 'contact', label: 'Liên hệ' };

  const raw = product.price;
  const isContact =
    product.contactPrice === true ||
    raw == null ||
    raw === '' ||
    String(raw).toLowerCase() === 'liên hệ' ||
    String(raw).toLowerCase() === 'lien he';

  if (isContact) {
    return { mode: 'contact', label: 'Liên hệ' };
  }

  if (product.salePrice) {
    return {
      mode: 'sale',
      sale: formatPrice(product.salePrice),
      original: formatPrice(raw),
    };
  }

  return { mode: 'price', price: formatPrice(raw) };
}
