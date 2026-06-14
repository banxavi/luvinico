'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function SearchSubmitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProductSearchFormFields({ urlQuery, autoFocus = false, onClose }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const [query, setQuery] = useState(urlQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      if (pathname === '/search') router.push('/');
      onClose?.();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose?.();
  };

  const clearQuery = () => {
    setQuery('');
    if (pathname === '/search') router.push('/');
  };

  return (
    <form onSubmit={onSubmit} className="search-field group w-full">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-field-input"
        placeholder="Tìm tên bia, xuất xứ, ABV…"
        inputMode="search"
        autoComplete="off"
        aria-label="Tìm kiếm sản phẩm"
      />

      {query.trim() ? (
        <button
          type="button"
          onClick={clearQuery}
          className="search-field-clear"
          aria-label="Xoá từ khoá"
        >
          ×
        </button>
      ) : null}

      <button type="submit" className="search-field-submit" aria-label="Tìm kiếm">
        <SearchSubmitIcon />
      </button>
    </form>
  );
}

export default function ProductSearchForm({ autoFocus = false, onClose }) {
  const searchParams = useSearchParams();
  const urlQuery = (searchParams?.get('q') ?? '').trim();

  return (
    <ProductSearchFormFields
      key={urlQuery}
      urlQuery={urlQuery}
      autoFocus={autoFocus}
      onClose={onClose}
    />
  );
}
