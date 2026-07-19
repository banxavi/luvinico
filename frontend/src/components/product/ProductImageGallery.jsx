"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import { useEmblaNav, useEmblaSelectedIndex } from "../../lib/emblaControls";

function resolveImageSrc(image) {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.src ?? image;
}

export default function ProductImageGallery({ images, alt }) {
  const slides = images?.length
    ? images.map(resolveImageSrc).filter(Boolean)
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: "start",
  });
  const selectedIndex = useEmblaSelectedIndex(emblaApi);
  const { scrollPrev, scrollNext, scrollTo } = useEmblaNav(emblaApi);

  const onThumbClick = useCallback(
    (index) => {
      scrollTo(index);
    },
    [scrollTo],
  );

  if (!slides.length) return null;

  return (
    <div className="product-gallery overflow-hidden rounded-2xl border border-white/10 bg-premium-dark">
      <div className="product-gallery-viewport relative">
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="product-gallery-nav product-gallery-nav--prev"
              aria-label="Ảnh trước"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="product-gallery-nav product-gallery-nav--next"
              aria-label="Ảnh sau"
            >
              ›
            </button>
          </>
        ) : null}

        <div className="carousel-viewport" ref={emblaRef}>
          <div className="carousel-track">
            {slides.map((src, index) => (
              <div
                key={index}
                className="carousel-slide"
                aria-hidden={index !== selectedIndex}
              >
                <div className="product-media-well product-detail-media product-gallery-media">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="product-media-well__img object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="flex justify-center gap-2 border-t border-white/[0.06] px-4 py-3">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onThumbClick(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
              className={[
                "relative h-14 w-14 overflow-hidden rounded-md border transition",
                i === selectedIndex
                  ? "border-brand-amber/70 ring-1 ring-brand-amber/30"
                  : "border-white/15 opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="56px"
                className="bg-white object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
