export function isHomePath(pathname) {
  return !pathname || pathname === '/';
}

export function getSearchParam(search, name) {
  try {
    const sp = new URLSearchParams(search ?? '');
    return sp.get(name) ?? '';
  } catch {
    return '';
  }
}
