import { BRAND } from '../../data/brand';
import { mockProducts } from '../../mockData';
import ProductGrid from '../../components/product/ProductGrid';

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || '').trim();

  if (q) {
    return {
      title: `Tìm kiếm: "${q}"`,
      description: `Kết quả tìm kiếm cho từ khóa "${q}" tại LUVINI & CO.`,
      alternates: {
        canonical: `/search?q=${encodeURIComponent(q)}`,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: 'Tìm kiếm sản phẩm',
    description: 'Tìm kiếm các sản phẩm rượu vang, bia nhập khẩu tại LUVINI & CO.',
    alternates: {
      canonical: '/search',
    },
  };
}

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q || '').trim();

  const query = q.toLowerCase();
  const filtered = query
    ? mockProducts.filter((p) => {
        const haystack = `${p.name ?? ''} ${p.origin ?? ''} ${p.abv ?? ''} ${p.style ?? ''}`.toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <div className="site-container pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="brand-logo-gradient text-xs font-semibold tracking-normal">TÌM KIẾM · {BRAND.name}</div>
          <h1 className="mt-2 text-3xl font-semibold">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-body-muted">
            Từ khoá: <span className="text-white/85">“{q || '—'}”</span>
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-body-muted">
        {q ? (
          <>
            {filtered.length}/{mockProducts.length} sản phẩm
          </>
        ) : (
          'Nhập từ khoá ở thanh tìm kiếm để bắt đầu.'
        )}
      </div>

      <div className="mt-6">
        {q && filtered.length > 0 ? (
          <ProductGrid products={filtered} searchQuery={q} />
        ) : q ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
            Không tìm thấy sản phẩm phù hợp. Hãy thử từ khoá khác.
          </div>
        ) : null}
      </div>
    </div>
  );
}
