import { Cormorant_Garamond, Playfair_Display, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import PageLayout from '../components/layout/PageLayout';
import { Suspense } from 'react';
import { getSiteUrl } from '../lib/site';

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

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'LUVINI & CO.',
    template: '%s | LUVINI & CO.',
  },
  description: 'LUVINI & CO. — The Art of Fine Taste. Rượu vang tuyển chọn và bia nhập khẩu cao cấp.',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LUVINI & CO. — Curated Fine Wine & Imported Beer',
    description: 'Curated Fine Wine & Imported Beer — rượu vang và bia nhập khẩu tuyển chọn.',
    type: 'website',
    siteName: 'LUVINI & CO.',
    locale: 'vi_VN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${beVietnam.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-premium-black text-white`}
      >
        <PageLayout>
          <Suspense fallback={<div className="site-container py-16 text-center text-body-muted">Đang tải...</div>}>
            {children}
          </Suspense>
        </PageLayout>
      </body>
    </html>
  );
}
