export const dynamic = "force-static";

import { getSitemapEntries } from '../lib/sitemapRoutes';

export default function sitemap() {
  return getSitemapEntries();
}
