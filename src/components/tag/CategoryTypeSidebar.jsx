import Link from 'next/link';
import { buildTagHref } from '../../lib/types';

const itemClass = (active) =>
  [
    'flex min-h-11 items-center justify-between rounded-xl px-4 py-2.5 text-sm transition',
    active
      ? 'bg-brand-amber/15 font-semibold text-brand-amber'
      : 'text-body-muted hover:bg-white/5 hover:text-white',
  ].join(' ');

export default function CategoryTypeSidebar({
  categoryKey,
  groupKey = '',
  groupLabel = '',
  types,
  activeType = '',
  totalCount = 0,
  origin = '',
  price = '',
  abv = '',
}) {
  const filters = { origin, price, abv, group: groupKey };
  const allActive = !activeType;

  return (
    <nav aria-label="Loại sản phẩm" className="rounded-2xl border border-white/10 bg-premium-dark/60 p-3">
      {groupLabel ? (
        <p className="px-2 pb-2 text-sm font-semibold text-white">{groupLabel}</p>
      ) : (
        <h2 className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-body-subtle">Loại</h2>
      )}
      <ul className="flex flex-col gap-0.5">
        <li>
          <Link
            href={buildTagHref(categoryKey, filters)}
            className={itemClass(allActive)}
            aria-current={allActive ? 'page' : undefined}
          >
            <span>Tất cả</span>
            <span className="text-xs text-white/35">{totalCount}</span>
          </Link>
        </li>
        {types.map((type) => {
          const active = activeType === type.slug;
          return (
            <li key={type.slug}>
              <Link
                href={buildTagHref(categoryKey, { ...filters, type: type.slug })}
                className={itemClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                <span>{type.label}</span>
                <span className="text-xs text-white/35">
                  {type.productCount > 0 ? type.productCount : '—'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
