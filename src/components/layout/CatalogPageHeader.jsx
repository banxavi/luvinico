import Link from 'next/link';
import { BRAND } from '../../data/brand';

export default function CatalogPageHeader({ eyebrow, title, description }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 md:gap-10">
      <div className="flex-1">
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal sm:text-sm">
          {eyebrow} · {BRAND.name}
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-body-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
