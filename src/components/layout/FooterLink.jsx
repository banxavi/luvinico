'use client';

import Link from 'next/link';
import { scrollToTop } from '../../lib/scroll';

const linkClassName =
  'text-sm text-body-muted transition hover:text-brand-amber';

export default function FooterLink({ href, children }) {
  const isInternal = href.startsWith('/') && !href.startsWith('//');

  return (
    <Link
      href={href}
      className={linkClassName}
      scroll={false}
      onClick={isInternal ? () => scrollToTop() : undefined}
    >
      {children}
    </Link>
  );
}
