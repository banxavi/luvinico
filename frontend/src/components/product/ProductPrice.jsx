import { resolveProductPrice } from '../../lib/pricing';

export default function ProductPrice({
  product,
  size = 'md',
  layout = 'auto',
  className = '',
}) {
  const resolved = resolveProductPrice(product);

  const mainClass =
    size === 'lg'
      ? 'text-2xl font-bold sm:text-3xl'
      : size === 'sm'
        ? 'text-sm font-bold sm:text-base'
        : 'text-base font-bold sm:text-lg';

  const originalClass =
    size === 'lg'
      ? 'text-base text-body-muted line-through sm:text-lg'
      : size === 'sm'
        ? 'text-[0.7rem] text-body-muted line-through sm:text-xs'
        : 'text-xs text-body-muted line-through sm:text-sm';

  const useStackLayout = layout === 'stack' || (layout === 'auto' && size !== 'lg');

  if (resolved.mode === 'contact') {
    return (
      <div className={`text-center ${className}`.trim()}>
        <span className={`${mainClass} tracking-wide text-brand-amber`}>{resolved.label}</span>
      </div>
    );
  }

  if (resolved.mode === 'sale') {
    if (useStackLayout) {
      return (
        <div
          className={`product-price product-price--sale product-price--stack w-full min-w-0 ${className}`.trim()}
        >
          <span className={originalClass}>{resolved.original}</span>
          <span className={`${mainClass} text-brand-amber`}>{resolved.sale}</span>
        </div>
      );
    }

    return (
      <div
        className={`product-price product-price--sale product-price--inline flex w-full min-w-0 flex-wrap items-baseline justify-center gap-x-2 gap-y-1 sm:gap-x-3 ${className}`.trim()}
      >
        <span className={originalClass}>{resolved.original}</span>
        <span className={`${mainClass} text-brand-amber`}>{resolved.sale}</span>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`.trim()}>
      <span className={`${mainClass} text-brand-amber`}>{resolved.price}</span>
    </div>
  );
}
