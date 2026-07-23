import { Cormorant_Garamond, Playfair_Display, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import RootChrome from '../components/layout/RootChrome';
import { BRAND } from '../data/brand';
import { formatSeoTitle } from '../lib/seo';
import { getSiteUrl, isIndexableSite } from '../lib/site';

/** Live Sanity fetch on Workers — avoid SSG freezing empty/partial CMS data. */
export const dynamic = 'force-dynamic';

const cormorant = Cormorant_Garamond({
  subsets: ['vietnamese', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-brand',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const defaultTitle = formatSeoTitle(BRAND.subtitle);

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
  },
  description: `${BRAND.name} | ${BRAND.tagline}. Rượu vang tuyển chọn và bia nhập khẩu cao cấp.`,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: defaultTitle,
    description: BRAND.description,
    type: 'website',
    siteName: BRAND.name,
    locale: 'vi_VN',
  },
  robots: isIndexableSite()
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${beVietnam.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-premium-black text-white`}
      >
        <RootChrome>{children}</RootChrome>
      </body>
    </html>
  );
}
