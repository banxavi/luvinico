"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "../../data/brand";
import { NAV_ITEMS } from "../../data/nav";
import { getFeaturedTypesForCategory } from "../../lib/types";
import { buildTelHref } from "../../lib/links";
import { formatPhoneDisplay } from "../../lib/formatters";
import IconButton from "../ui/IconButton";
import BrandMark from "./BrandMark";
import NavCategoryDropdown from "./NavCategoryDropdown";
import ProductSearchForm from "./ProductSearchForm";

const HOTLINE = BRAND.hotline;

const navLinkClass = (active) =>
  [
    "inline-flex min-h-9 items-center whitespace-nowrap font-medium uppercase leading-none transition-colors",
    "text-[0.625rem] tracking-wide xl:text-xs 2xl:text-sm",
    active ? "text-brand-amber" : "text-body-muted hover:text-white",
  ].join(" ");

const mobileNavLinkClass = (active) =>
  [
    "flex min-h-11 items-center rounded-md px-4 font-medium uppercase tracking-wide transition-colors",
    "text-base sm:text-lg",
    active
      ? "bg-brand-amber/10 text-brand-amber"
      : "text-body-muted hover:bg-white/5 hover:text-white",
  ].join(" ");

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20L16.5 16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 3.2c.4-.9 1.5-1.3 2.4-.9l2.1 1c.8.4 1.2 1.4.9 2.3l-.7 2.1c-.2.7 0 1.4.5 1.9l2.5 2.5c.5.5 1.2.7 1.9.5l2.1-.7c.9-.3 1.9.1 2.3.9l1 2.1c.4.9 0 2-.9 2.4l-2 .8c-1.2.5-2.5.3-3.6-.4-3.2-2.1-5.8-4.7-7.9-7.9-.7-1.1-.9-2.4-.4-3.6l.8-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closePanels();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-white/10">
      <div className="site-container flex min-h-14 items-center justify-between gap-2 py-2.5 sm:min-h-[3.75rem] sm:py-3">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center"
          aria-label="LUVINI & CO. — về trang chủ"
          onClick={closePanels}
        >
          <BrandMark />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1 xl:flex 2xl:flex-nowrap 2xl:gap-x-3"
          aria-label="Điều hướng chính"
        >
          {NAV_ITEMS.map((item) =>
            item.categoryKey ? (
              <NavCategoryDropdown
                key={item.path}
                item={item}
                active={isActive(item.path)}
              />
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className={navLinkClass(isActive(item.path))}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href={buildTelHref(HOTLINE)}
            className="header-phone-link max-md:hidden max-xl:w-11 max-xl:px-0 max-xl:justify-center"
            aria-label={`Gọi ${HOTLINE}`}
          >
            <PhoneIcon />
            <span className="max-xl:sr-only">{formatPhoneDisplay(HOTLINE)}</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden">
            <IconButton
              label="Tìm kiếm sản phẩm"
              onClick={toggleSearch}
              expanded={searchOpen}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              label={menuOpen ? "Đóng menu" : "Mở menu"}
              onClick={toggleMenu}
              expanded={menuOpen}
            >
              <MenuIcon open={menuOpen} />
            </IconButton>
          </div>
        </div>
      </div>

      {searchOpen ? (
        <div className="site-container border-t border-white/10 pb-3 pt-3 xl:hidden">
          <ProductSearchForm autoFocus onClose={() => setSearchOpen(false)} />
        </div>
      ) : null}

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60 xl:hidden"
            aria-label="Đóng menu"
            onClick={closePanels}
          />
          <nav
            className="absolute inset-x-0 top-full z-40 max-h-[min(85vh,36rem)] overflow-y-auto border-b border-white/10 bg-premium-black shadow-2xl xl:hidden"
            aria-label="Menu di động"
          >
            <div className="site-container flex flex-col gap-1 py-4">
              <Link
                href={buildTelHref(HOTLINE)}
                className="header-phone-link"
                aria-label={`Gọi ${HOTLINE}`}
              >
                <PhoneIcon />
                <span>{formatPhoneDisplay(HOTLINE)}</span>
              </Link>
              {NAV_ITEMS.map((item) => (
                <div key={item.path}>
                  <Link
                    href={item.path}
                    className={mobileNavLinkClass(isActive(item.path))}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    onClick={closePanels}
                  >
                    {item.label}
                  </Link>
                  {item.categoryKey ? (
                    <div className="mb-2 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                      {getFeaturedTypesForCategory(item.categoryKey, 3).map((type) => (
                        <Link
                          key={type.slug}
                          href={`/tag?category=${item.categoryKey}&type=${type.slug}`}
                          className="flex min-h-10 items-center rounded-md px-3 text-sm text-body-muted transition hover:bg-white/5 hover:text-white"
                          onClick={closePanels}
                        >
                          {type.label}
                        </Link>
                      ))}
                      <Link
                        href={`/tag?category=${item.categoryKey}`}
                        className="flex min-h-10 items-center px-3 text-xs font-semibold text-brand-amber"
                        onClick={closePanels}
                      >
                        Xem thêm
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
