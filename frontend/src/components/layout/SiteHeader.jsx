"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Header from "./Header";
import ProductSearchBar from "./ProductSearchBar";

export default function SiteHeader() {
  const headerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const syncHeight = () => {
      const height = Math.ceil(el.getBoundingClientRect().height);
      setSpacerHeight(height);
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${height}px`,
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 w-full bg-premium-black">
        <div ref={headerRef} className="relative border-b border-white/10">
          <Suspense
            fallback={<div className="h-14 bg-premium-black sm:h-[3.75rem]" />}
          >
            <Header />
            <ProductSearchBar />
          </Suspense>
        </div>
      </div>
      <div
        aria-hidden
        className={
          spacerHeight == null
            ? "h-14 shrink-0 sm:h-[3.75rem] lg:h-[6.75rem]"
            : "shrink-0"
        }
        style={spacerHeight != null ? { height: spacerHeight } : undefined}
      />
    </>
  );
}
