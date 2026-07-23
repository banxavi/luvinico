import { NextResponse } from 'next/server';

import {
  getHostedStudioOrigin,
  isAdminPath,
  proxyHostedStudio,
} from './lib/sanity/studioHostedProxy';

export async function middleware(request) {
  if (!getHostedStudioOrigin() || !isAdminPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const proxied = await proxyHostedStudio(request);
  return proxied ?? NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
