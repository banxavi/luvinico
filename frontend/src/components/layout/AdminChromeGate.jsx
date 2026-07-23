'use client';

import { usePathname } from 'next/navigation';

export default function AdminChromeGate({ children, siteShell }) {
  const pathname = usePathname() ?? '';

  if (pathname.startsWith('/admin')) {
    return children;
  }

  return siteShell;
}
