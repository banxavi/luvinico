import { resolveProductPrice } from '../../lib/pricing';

export default function ProductPrice({ product, size = 'md', className = '' }) {
  const resolved = resolveProductPrice(product);

  const mainClass =
    size === 'lg'
      ? 'text-2xl font-bold sm:text-3xl'
      : size === 'sm'
        ? 'text-sm font-bold sm:text-base'
        : 'text-lg font-bold';

  if (resolved.mode === 'contact') {
    return (
      <div className={`text-center ${className}`.trim()}>
        <span className={`${mainClass} tracking-wide text-brand-amber`}>{resolved.label}</span>
      </div>
    );
  }

  if (resolved.mode === 'sale') {
    const originalClass =
      size === 'lg'
        ? 'text-base text-body-muted line-through sm:text-lg'
        : 'text-sm text-body-muted line-through sm:text-base';
    const gapClass = size === 'lg' ? 'gap-3 sm:gap-4' : size === 'sm' ? 'gap-2' : 'gap-2.5 sm:gap-3';
    const saleOffset = size === 'lg' ? 'ml-2 sm:ml-3' : 'ml-1.5 sm:ml-2';

    return (
      <div className={`flex min-h-[2.5rem] items-center justify-center ${gapClass} ${className}`.trim()}>
        <span className={`shrink-0 ${originalClass}`}>{resolved.original}</span>
        <span className={`shrink-0 ${mainClass} ${saleOffset} text-brand-amber`}>{resolved.sale}</span>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`.trim()}>
      <span className={`${mainClass} text-brand-amber`}>{resolved.price}</span>
    </div>
  );
}
