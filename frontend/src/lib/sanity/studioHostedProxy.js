/**
 * Proxy hosted Sanity Studio (/admin) through the site Worker.
 * Used on workers.dev (cannot split path routes to a second Worker).
 * Local Vite Studio: do NOT set SANITY_STUDIO_ORIGIN — use iframe + SANITY_STUDIO_DEV_ORIGIN.
 */

const ADMIN_PREFIX = '/admin';

const STRIP_REQUEST_HEADERS = [
  'if-none-match',
  'if-modified-since',
  'if-match',
  'if-unmodified-since',
  'if-range',
];

export function getHostedStudioOrigin() {
  return (process.env.SANITY_STUDIO_ORIGIN || '').trim().replace(/\/$/, '');
}

export function isAdminPath(pathname) {
  return pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
}

function needsBody(method) {
  return method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS';
}

function isSpaDocumentPath(pathname) {
  if (pathname === ADMIN_PREFIX || pathname === `${ADMIN_PREFIX}/`) return false;
  return !/\.[a-z0-9]+$/i.test(pathname);
}

function handleOptions(request) {
  const origin = request.headers.get('Origin') || '*';
  const requestHeaders =
    request.headers.get('Access-Control-Request-Headers') || '*';

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods':
        'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': requestHeaders,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin, Access-Control-Request-Headers',
    },
  });
}

async function proxyToStudio(request, url, studioOrigin, studioHost) {
  const targetUrl = new URL(url.pathname + url.search, studioOrigin);
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('Host', studioHost);
  headers.set('X-Forwarded-Host', url.host);
  headers.set('X-Forwarded-Proto', url.protocol.replace(':', ''));
  for (const name of STRIP_REQUEST_HEADERS) {
    headers.delete(name);
  }

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: needsBody(request.method) ? request.body : undefined,
    redirect: 'manual',
  });
}

function rewriteLocation(headers, studioOrigin, publicOrigin) {
  const location = headers.get('Location');
  if (!location) return;

  try {
    const resolved = new URL(location, studioOrigin);
    const studio = new URL(studioOrigin);
    if (resolved.origin === studio.origin) {
      headers.set(
        'Location',
        publicOrigin + resolved.pathname + resolved.search + resolved.hash,
      );
    }
  } catch {
    /* keep */
  }
}

function rewriteSetCookie(headers, publicHost) {
  const getSetCookie = headers.getSetCookie?.bind(headers);
  const cookies = getSetCookie ? getSetCookie() : [];
  if (!cookies.length) return;

  headers.delete('Set-Cookie');
  for (const cookie of cookies) {
    headers.append(
      'Set-Cookie',
      cookie.replace(/Domain=[^;]+/gi, `Domain=${publicHost}`),
    );
  }
}

function applyNoCache(headers) {
  const contentType = headers.get('content-type') || '';
  const mutable =
    contentType.includes('text/html') ||
    contentType.includes('application/json') ||
    contentType.includes('text/plain');
  if (!mutable) return;

  const value = 'no-store, must-revalidate, private';
  headers.set('Cache-Control', value);
  headers.set('CDN-Cache-Control', value);
  headers.set('Cloudflare-CDN-Cache-Control', value);
}

export async function proxyHostedStudio(request) {
  const studioOrigin = getHostedStudioOrigin();
  if (!studioOrigin) {
    return null;
  }

  const url = request.nextUrl;
  const publicOrigin = url.origin;

  if (url.pathname === ADMIN_PREFIX) {
    return Response.redirect(`${publicOrigin}${ADMIN_PREFIX}/`, 308);
  }

  if (!isAdminPath(url.pathname)) {
    return null;
  }

  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  const studioHost = new URL(studioOrigin).host;
  let upstream = await proxyToStudio(request, url, studioOrigin, studioHost);

  if (
    request.method === 'GET' &&
    upstream.status === 404 &&
    isSpaDocumentPath(url.pathname)
  ) {
    const shellUrl = new URL(`${ADMIN_PREFIX}/`, studioOrigin);
    shellUrl.search = url.search;
    upstream = await proxyToStudio(
      new Request(shellUrl.toString(), {
        method: 'GET',
        headers: request.headers,
      }),
      new URL(shellUrl.pathname + shellUrl.search, url.origin),
      studioOrigin,
      studioHost,
    );
  }

  if (upstream.status === 304 && request.method === 'GET') {
    upstream = await proxyToStudio(
      new Request(url.toString(), { method: 'GET' }),
      url,
      studioOrigin,
      studioHost,
    );
  }

  const headers = new Headers(upstream.headers);
  rewriteLocation(headers, studioOrigin, publicOrigin);
  rewriteSetCookie(headers, url.host);
  applyNoCache(headers);
  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.delete('etag');
  headers.delete('last-modified');

  return new Response(upstream.body, {
    status: upstream.status === 304 ? 200 : upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}
