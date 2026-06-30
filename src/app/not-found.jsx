import Link from 'next/link';
import { createPageMetadata } from '../lib/seo';

export const metadata = createPageMetadata({
  title: 'Không tìm thấy trang',
  description: 'Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.',
  robots: {
    index: false,
    follow: false,
  },
});

export default function NotFound() {
  return (
    <div className="site-container py-16 text-center">
      <p className="text-xs font-semibold tracking-normal text-brand-amber">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Không tìm thấy trang</h1>
      <p className="mt-3 text-sm text-body-muted sm:text-base">
        Đường dẫn có thể không đúng hoặc sản phẩm đã ngừng hiển thị.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-amber px-6 py-3 text-sm font-semibold text-premium-black transition hover:bg-[#e0ad2a]"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
