/** Gán danh mục — ưu tiên field `category`, fallback theo style */
export function getProductCategory(product) {
  if (product?.category) return product.category;
  const style = String(product?.style ?? '').toLowerCase();
  if (style.includes('vang')) return 'ruou-vang';
  return 'bia';
}

export function getProductsByCategory(products, categoryKey) {
  return (products ?? []).filter((p) => getProductCategory(p) === categoryKey);
}
