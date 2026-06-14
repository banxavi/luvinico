'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { HERO_BANNERS } from '../../data/clientAssets';
import { useEmblaNav, useEmblaSelectedIndex } from '../../lib/emblaControls';

const AUTO_PLAY_MS = 4000;

export default function HeroBannerSlider() {
  const slides = HERO_BANNERS;

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTO_PLAY_MS,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Fade(), autoplay]);
  const selectedIndex = useEmblaSelectedIndex(emblaApi);
  const { scrollPrev, scrollNext, scrollTo } = useEmblaNav(emblaApi);

  const onDotClick = useCallback(
    (index) => {
      scrollTo(index);
      autoplay.reset();
    },
    [autoplay, scrollTo],
  );

  if (!slides.length) return null;

  return (
    <section
      id="top"
      className="hero-banner"
      aria-roledescription="carousel"
      aria-label="Banner khuyến mãi"
    >
      <div className="hero-banner-viewport" ref={emblaRef}>
        <div className="hero-banner-container">
          {slides.map((slide, index) => (
            <div key={slide.id} className="hero-banner-slide" aria-hidden={index !== selectedIndex}>
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktop.src ?? slide.desktop} />
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  className="hero-banner-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  sizes="100vw"
                  draggable={false}
                />
              </picture>
            </div>
          ))}
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="hero-banner-nav hero-banner-nav--prev"
              aria-label="Banner trước"
              onClick={scrollPrev}
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              className="hero-banner-nav hero-banner-nav--next"
              aria-label="Banner sau"
              onClick={scrollNext}
            >
              <span aria-hidden>›</span>
            </button>

            <div className="hero-banner-dots" role="tablist" aria-label="Chọn banner">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Banner ${index + 1}`}
                  className={['hero-banner-dot', index === selectedIndex ? 'is-active' : ''].join(' ')}
                  onClick={() => onDotClick(index)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
