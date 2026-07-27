'use client';

import { createContext, useContext } from 'react';
import { NAV_ITEMS_FALLBACK } from '../data/nav';
import { EMPTY_CATALOG } from '../lib/sanity/catalogStore';

const SiteDataContext = createContext({
  products: [],
  catalog: EMPTY_CATALOG,
  navItems: NAV_ITEMS_FALLBACK,
  /** CMS favicon URL, or null → BrandMark keeps bundled default */
  faviconUrl: null,
});

export function SiteDataProvider({
  products = [],
  catalog = EMPTY_CATALOG,
  navItems = NAV_ITEMS_FALLBACK,
  faviconUrl = null,
  children,
}) {
  return (
    <SiteDataContext.Provider
      value={{ products, catalog, navItems, faviconUrl }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

/** @deprecated use useSiteData().products */
export function ProductDataProvider({
  products,
  catalog,
  navItems,
  faviconUrl,
  children,
}) {
  return (
    <SiteDataProvider
      products={products}
      catalog={catalog}
      navItems={navItems}
      faviconUrl={faviconUrl}
    >
      {children}
    </SiteDataProvider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}

export function useProducts() {
  return useContext(SiteDataContext).products;
}

export function useCatalog() {
  return useContext(SiteDataContext).catalog;
}

export function useNavItems() {
  return useContext(SiteDataContext).navItems;
}

export function useFaviconUrl() {
  return useContext(SiteDataContext).faviconUrl;
}
