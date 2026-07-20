'use client';

import { createContext, useContext } from 'react';
import { NAV_ITEMS_FALLBACK } from '../data/nav';
import { EMPTY_CATALOG } from '../lib/sanity/catalogStore';

const SiteDataContext = createContext({
  products: [],
  catalog: EMPTY_CATALOG,
  navItems: NAV_ITEMS_FALLBACK,
});

export function SiteDataProvider({
  products = [],
  catalog = EMPTY_CATALOG,
  navItems = NAV_ITEMS_FALLBACK,
  children,
}) {
  return (
    <SiteDataContext.Provider value={{ products, catalog, navItems }}>
      {children}
    </SiteDataContext.Provider>
  );
}

/** @deprecated use useSiteData().products */
export function ProductDataProvider({ products, catalog, navItems, children }) {
  return (
    <SiteDataProvider products={products} catalog={catalog} navItems={navItems}>
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
