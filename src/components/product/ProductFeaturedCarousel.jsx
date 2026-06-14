'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { useEmblaNav, useEmblaSelectedIndex } from '../../lib/emblaControls';

const AUTO_PLAY_MS = 10_000;

const PRESETS = {
  featured: {
    perPage: { lg: 10, sm: 6, default: 4 },
    gridClass:
      'grid grid-cols-2 grid-rows-2 gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 lg:grid-cols-5 lg:grid-rows-2 lg:gap-5',
    ariaLabel: 'Bộ sưu tập signature',
  },
  row: {
    perPage: { lg: 5, sm: 3, default: 2 },
    gridClass:
      'grid grid-cols-2 grid-rows-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:grid-rows-1 lg:gap-5',
    ariaLabel: 'Vang ngon giá tốt',
  },
};

function chunk(array, size) {
  const pages = [];
  for (let i = 0; i < array.length; i += size) {
    pages.push(array.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}

function usePerPage(perPageConfig) {
  const [perPage, setPerPage] = useState(perPageConfig.default);

  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const mqSm = window.matchMedia('(min-width: 640px)');

    const update = () => {
      if (mqLg.matches) setPerPage(perPageConfig.lg);
      else if (mqSm.matches) setPerPage(perPageConfig.sm);
      else setPerPage(perPageConfig.default);
    };

    update();
    mqLg.addEventListener('change', update);
    mqSm.addEventListener('change', update);
    return () => {
      mqLg.removeEventListener('change', update);
      mqSm.removeEventListener('change', update);
    };
  }, [perPageConfig.default, perPageConfig.lg, perPageConfig.sm]);

  return perPage;
}

function NavButton({ direction, onClick, disabled, className = '' }) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Trang sản phẩm trước' : 'Trang sản phẩm sau'}
      className={[
        'absolute top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-premium-black/90 text-white shadow-xl shadow-black/50 backdrop-blur-sm transition',
        'hover:border-brand-amber/70 hover:bg-premium-dark hover:text-brand-amber',
        'disabled:pointer-events-none disabled:opacity-30',
        'sm:h-12 sm:w-12',
        className,
      ].join(' ')}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={isPrev ? 'M15 6L9 12L15 18' : 'M9 6L15 12L9 18'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function ProductFeaturedCarousel({ products, variant = 'featured' }) {
  const preset = PRESETS[variant] ?? PRESETS.featured;
  const perPage = usePerPage(preset.perPage);
  const pages = useMemo(() => chunk(products, perPage), [products, perPage]);

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTO_PLAY_MS,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplay]);
  const selectedIndex = useEmblaSelectedIndex(emblaApi);
  const { scrollPrev, scrollNext, scrollTo } = useEmblaNav(emblaApi);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, pages.length, perPage]);

  const onNavClick = useCallback(
    (action) => {
      action();
      autoplay.reset();
    },
    [autoplay],
  );

  const onDotClick = useCallback(
    (index) => {
      scrollTo(index);
      autoplay.reset();
    },
    [autoplay, scrollTo],
  );

  const canNavigate = pages.length > 1;

  return (
    <div className="relative">
      <p className="mb-4 text-center text-sm text-body-muted sm:text-left">
        Trang {selectedIndex + 1}/{pages.length}
        <span className="hidden sm:inline"> · {products.length} sản phẩm</span>
      </p>

      <div className="relative px-11 sm:px-14 lg:px-16">
        <NavButton
          direction="prev"
          onClick={() => onNavClick(scrollPrev)}
          disabled={!canNavigate}
          className="left-0 sm:left-1"
        />
        <NavButton
          direction="next"
          onClick={() => onNavClick(scrollNext)}
          disabled={!canNavigate}
          className="right-0 sm:right-1"
        />

        <div
          className="carousel-viewport"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${preset.ariaLabel}, trang ${selectedIndex + 1}`}
          aria-live="polite"
        >
          <div className="carousel-track">
            {pages.map((pageProducts, pageIdx) => (
              <div key={`${perPage}-page-${pageIdx}`} className="carousel-slide" aria-hidden={pageIdx !== selectedIndex}>
                <div className={preset.gridClass}>
                  {pageProducts.map((p) => (
                    <ProductCard key={p.id} product={p} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {canNavigate ? (
        <div className="mt-5 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onDotClick(i)}
              aria-label={`Đến trang ${i + 1}`}
              aria-current={i === selectedIndex ? 'true' : undefined}
              className={[
                'h-2 rounded-full transition-all duration-500',
                i === selectedIndex ? 'w-6 bg-brand-amber' : 'w-2 bg-white/25 hover:bg-white/40',
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
