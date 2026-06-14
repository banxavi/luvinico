'use client';

import { useEffect } from 'react';

export default function ProductScrollHandler({ slug }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  return null;
}
