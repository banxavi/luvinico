'use client';

import { createContext, useContext } from 'react';
import { EMPTY_CATALOG } from '../lib/sanity/catalogStore';

const SiteDataContext = createContext({
  products: [],
  catalog: EMPTY_CATALOG,
});

export function SiteDataProvider({ products = [], catalog = EMPTY_CATALOG, children }) {
  return (
    <SiteDataContext.Provider value={{ products, catalog }}>
      {children}
    </SiteDataContext.Provider>
  );
}

/** @deprecated use useSiteData().products */
export function ProductDataProvider({ products, catalog, children }) {
  return (
    <SiteDataProvider products={products} catalog={catalog}>
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
