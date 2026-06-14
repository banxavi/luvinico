import Link from 'next/link';
import { BRAND } from '../../data/brand';

export default function CatalogPageHeader({ eyebrow, title, description }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal sm:text-sm">
          {eyebrow} · {BRAND.name}
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 text-sm leading-relaxed text-body-muted sm:text-base">{description}</p> : null}
      </div>
      <Link
        href="/"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-premium-dark px-4 text-sm font-semibold text-white/90 transition hover:border-brand-amber/60"
      >
        ← Trang chủ
      </Link>
    </div>
  );
}
