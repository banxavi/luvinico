import { formatPrice } from './formatters';

function parsePriceVnd(value) {
  const amount = parseInt(String(value ?? '').replace(/[^\d]/g, ''), 10);
  return Number.isFinite(amount) ? amount : null;
}

export function getSaleDiscountPercent(product) {
  if (!product?.salePrice || !product?.price) return null;

  const original = parsePriceVnd(product.price);
  const sale = parsePriceVnd(product.salePrice);

  if (!original || !sale || sale >= original) return null;

  return Math.round((1 - sale / original) * 100);
}

export function isProductOnSale(product) {
  return Boolean(product?.salePrice && product?.price);
}

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
      discountPercent: getSaleDiscountPercent(product),
    };
  }

  return { mode: 'price', price: formatPrice(raw) };
}
