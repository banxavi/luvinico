'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getFeaturedTypesForCategory } from '../../lib/types';
const navLinkClass = (active) =>
  [
    'whitespace-nowrap font-medium transition-colors',
    'text-sm xl:text-[0.95rem] 2xl:text-base',
    active ? 'text-brand-amber' : 'text-body-muted hover:text-white',
  ].join(' ');

export default function NavCategoryDropdown({ item, active }) {
  const [open, setOpen] = useState(false);
  const featuredTypes = getFeaturedTypesForCategory(item.categoryKey, 3);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.path}
        className={navLinkClass(active)}
        aria-current={active ? 'page' : undefined}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
      </Link>

      {open ? (
        <div className="absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-premium-dark shadow-2xl shadow-black/50">
            <ul className="py-1.5" role="menu">
              {featuredTypes.map((type) => (
                <li key={type.slug} role="none">
                  <Link
                    href={`/tag?category=${item.categoryKey}&type=${type.slug}`}
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm text-body-muted transition hover:bg-white/5 hover:text-white"
                  >
                    {type.label}
                    {type.productCount > 0 ? (
                      <span className="ml-1 text-xs text-white/35">({type.productCount})</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-4 py-2.5">
              <Link
                href={`/tag?category=${item.categoryKey}`}
                className="text-xs font-semibold text-brand-amber underline-offset-2 hover:underline"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
