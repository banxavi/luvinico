'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { isHomePath } from '../lib/router-utils';
import { scrollToSection } from '../lib/scroll';

export default function HomeScrollHandler() {
  const pathname = usePathname() ?? '/';
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [pathname]);

  const key = useMemo(() => `${pathname}${hash}`, [pathname, hash]);

  useEffect(() => {
    if (!isHomePath(pathname)) return;
    const id = (hash ?? '').replace(/^#/, '');
    if (id) scrollToSection(id);
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, key]);

  return null;
}
