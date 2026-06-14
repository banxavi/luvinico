'use client';

import { useMemo } from 'react';
import { mockProducts } from '../../mockData';
import ProductFeaturedCarousel from '../product/ProductFeaturedCarousel';
import FadeInSection from '../ui/FadeInSection';

export default function BestSellersSection() {
  const products = useMemo(() => mockProducts ?? [], []);

  return (
    <FadeInSection id="products" className="pt-10 sm:pt-12">
      <div>
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">BỘ SƯU TẬP SIGNATURE</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Rượu vang &amp; bia được tuyển chọn</h2>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">
          Nhãn hiệu nổi bật từ châu Âu, Mỹ và châu Á — từ vang đỏ đậm vị đến ale thủ công và lager thanh mát.
        </p>
      </div>

      <div className="mt-6">
        <ProductFeaturedCarousel products={products} />
      </div>
    </FadeInSection>
  );
}
