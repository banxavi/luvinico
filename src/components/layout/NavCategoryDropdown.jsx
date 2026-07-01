'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { NAV_MAX_COLUMNS } from '../../data/navMenu';
import { buildTagHref, getNavMenuSections } from '../../lib/types';

const navLinkClass = (active) =>
  [
    'inline-flex min-h-9 items-center whitespace-nowrap font-medium uppercase leading-none transition-colors',
    'text-[0.625rem] tracking-wide xl:text-xs 2xl:text-sm',
    active ? 'text-brand-amber' : 'text-body-muted hover:text-white',
  ].join(' ');

const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
};

export default function NavCategoryDropdown({ item, active }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const sections = getNavMenuSections(item.categoryKey);
  const hasMenu = sections.length > 0;
  const columnCount = Math.min(sections.length, NAV_MAX_COLUMNS);
  const gridClass = GRID_COLS[columnCount] ?? GRID_COLS[5];

  return (
    <div
      ref={rootRef}
      className="relative flex items-center"
      onMouseEnter={() => hasMenu && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => hasMenu && setOpen(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!next || !rootRef.current?.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={item.path}
        className={navLinkClass(active)}
        aria-current={active ? 'page' : undefined}
        aria-haspopup={hasMenu ? 'true' : undefined}
        aria-expanded={hasMenu ? open : undefined}
      >
        {item.label}
      </Link>

      {hasMenu ? (
        <div
          className={[
            'absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1',
            "before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']",
            open
              ? 'visible translate-y-0 opacity-100 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none'
              : 'pointer-events-none invisible -translate-y-1 opacity-0 duration-0',
          ].join(' ')}
          role="menu"
          aria-hidden={!open}
        >
          <div
            className={[
              'grid w-max max-w-[min(100vw-2rem,56rem)] overflow-hidden rounded-xl border border-white/10 bg-premium-dark shadow-2xl shadow-black/50',
              gridClass,
            ].join(' ')}
          >
            {sections.map((section) => (
              <div
                key={section.key}
                className="max-h-[min(70vh,28rem)] min-w-44 overflow-y-auto"
              >
                {section.label ? (
                  <Link
                    href={section.parentHref}
                    role="menuitem"
                    className="block px-4 pb-1 pt-3 text-sm font-semibold text-white transition hover:text-brand-amber"
                  >
                    {section.label}
                  </Link>
                ) : null}

                <ul className="py-1">
                  {section.subTabs.map((tab) => (
                    <li key={tab.slug} role="none">
                      <Link
                        href={buildTagHref(item.categoryKey, {
                          ...(section.parentHref ? { group: section.key } : {}),
                          type: tab.slug,
                        })}
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-body-muted transition hover:bg-white/5 hover:text-white"
                      >
                        {tab.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {section.hasMore ? (
                  <div className="px-4 py-2.5">
                    <Link
                      href={section.moreHref}
                      className="text-xs font-semibold text-brand-amber hover:underline"
                    >
                      Xem thêm &gt;&gt;
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
