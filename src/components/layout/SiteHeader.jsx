import { Suspense } from 'react';
import Header from './Header';
import ProductSearchBar from './ProductSearchBar';

export default function SiteHeader() {
  return (
    <div className="site-header-sticky sticky top-0 z-40 border-b border-white/10 bg-premium-black/90 shadow-lg shadow-black/25 backdrop-blur-md">
      <Suspense fallback={<div className="h-16 bg-premium-black" />}>
        <Header />
        <ProductSearchBar />
      </Suspense>
    </div>
  );
}
