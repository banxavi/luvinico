/**
 * Proxy https://[DOMAIN]/admin/* → https://[STUDIO]/  (strip /admin prefix)
 * Studio must be deployed WITHOUT basePath (root).
 */

const ADMIN_PREFIX = '/admin';

export default {
  async fetch(request, env) {
    const studioOrigin = (env.STUDIO_ORIGIN || '').replace(/\/$/, '');
    if (!studioOrigin) {
      return new Response('STUDIO_ORIGIN is not configured', { status: 500 });
    }

    const url = new URL(request.url);
    const publicOrigin = url.origin;

    if (url.pathname === '/' || url.pathname === '') {
      return Response.redirect(`${publicOrigin}${ADMIN_PREFIX}/`, 302);
    }

    if (url.pathname === ADMIN_PREFIX) {
      return Response.redirect(`${publicOrigin}${ADMIN_PREFIX}/`, 308);
    }

    const isAdmin =
      url.pathname === ADMIN_PREFIX || url.pathname.startsWith(`${ADMIN_PREFIX}/`);
    const isAsset =
      url.pathname.startsWith('/static/') || url.pathname.startsWith('/favicons/');

    if (!isAdmin && !isAsset) {
      return new Response('Not found — open /admin/ for Sanity Studio', {
        status: 404,
      });
    }

    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    const studioHost = new URL(studioOrigin).host;
    let upstream = await proxyToStudio(request, url, studioOrigin, studioHost);

    if (
      isAdmin &&
      request.method === 'GET' &&
      upstream.status === 404 &&
      isSpaDocumentPath(url.pathname)
    ) {
      const shellUrl = new URL('/', studioOrigin);
      shellUrl.search = url.search;
      upstream = await proxyToStudio(
        new Request(shellUrl.toString(), {
          method: 'GET',
          headers: request.headers,
        }),
        new URL(`${ADMIN_PREFIX}/${url.search}`, url.origin),
        studioOrigin,
        studioHost,
      );
    }

    return buildClientResponse(upstream, {
      studioOrigin,
      studioHost,
      publicOrigin,
    });
  },
};

function toUpstreamPathname(pathname) {
  if (pathname === ADMIN_PREFIX || pathname === `${ADMIN_PREFIX}/`) return '/';
  if (pathname.startsWith(`${ADMIN_PREFIX}/`)) {
    const rest = pathname.slice(ADMIN_PREFIX.length);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}

async function proxyToStudio(request, url, studioOrigin, studioHost) {
  const targetUrl = new URL(toUpstreamPathname(url.pathname) + url.search, studioOrigin);
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('Host', studioHost);
  headers.set('X-Forwarded-Host', url.host);
  headers.set('X-Forwarded-Proto', url.protocol.replace(':', ''));
  headers.set(
    'X-Forwarded-For',
    request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      '',
  );

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: needsBody(request.method) ? request.body : undefined,
    redirect: 'manual',
  });
}

function isSpaDocumentPath(pathname) {
  const upstream = toUpstreamPathname(pathname);
  if (upstream === '/') return false;
  return !/\.[a-z0-9]+$/i.test(upstream);
}

function needsBody(method) {
  return method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS';
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

function buildClientResponse(upstream, { studioOrigin, studioHost, publicOrigin }) {
  const headers = new Headers(upstream.headers);

  rewriteLocation(headers, studioOrigin, publicOrigin);
  rewriteSetCookie(headers, new URL(publicOrigin).host);
  applyNoCacheForStudio(headers);

  headers.delete('content-encoding');
  headers.delete('content-length');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

function applyNoCacheForStudio(headers) {
  const contentType = headers.get('content-type') || '';
  const isHtml = contentType.includes('text/html');
  const isMutable =
    isHtml ||
    contentType.includes('application/json') ||
    contentType.includes('text/plain');

  if (!isMutable) return;

  const value = 'no-store, must-revalidate, private';
  headers.set('Cache-Control', value);
  headers.set('CDN-Cache-Control', value);
  headers.set('Cloudflare-CDN-Cache-Control', value);
}

function rewriteLocation(headers, studioOrigin, publicOrigin) {
  const location = headers.get('Location');
  if (!location) return;

  try {
    const resolved = new URL(location, studioOrigin);
    const studio = new URL(studioOrigin);
    if (resolved.origin !== studio.origin) return;

    let path = resolved.pathname;
    if (path === '/' || path === '') {
      path = `${ADMIN_PREFIX}/`;
    } else if (!path.startsWith('/static') && !path.startsWith('/favicons')) {
      path = `${ADMIN_PREFIX}${path.startsWith('/') ? path : `/${path}`}`;
    }

    headers.set(
      'Location',
      publicOrigin + path + resolved.search + resolved.hash,
    );
  } catch {
    /* keep original */
  }
}

function rewriteSetCookie(headers, publicHost) {
  const cookies = headers.getSetCookie?.() ?? [];
  if (cookies.length === 0) return;

  headers.delete('Set-Cookie');
  for (const cookie of cookies) {
    headers.append(
      'Set-Cookie',
      cookie.replace(/Domain=[^;]+/gi, `Domain=${publicHost}`),
    );
  }
}
