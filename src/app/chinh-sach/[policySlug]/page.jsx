import { notFound } from 'next/navigation';
import { FOOTER } from '../../../data/footer';
import CatalogPageHeader from '../../../components/layout/CatalogPageHeader';

export function generateStaticParams() {
  return FOOTER.policies.map((policy) => ({
    policySlug: policy.href.replace('/chinh-sach/', ''),
  }));
}

export async function generateMetadata({ params }) {
  const { policySlug } = await params;
  const policy = FOOTER.policies.find((p) => p.href === `/chinh-sach/${policySlug}`);
  if (!policy) {
    return {
      title: 'Không tìm thấy trang',
    };
  }
  return {
    title: policy.label,
    description: `Xem chi tiết điều khoản ${policy.label} của cửa hàng LUVINI & CO.`,
    alternates: {
      canonical: `/chinh-sach/${policySlug}`,
    },
  };
}

export default async function PolicyPage({ params }) {
  const { policySlug } = await params;
  const policy = FOOTER.policies.find((p) => p.href === `/chinh-sach/${policySlug}`);

  if (!policy) {
    notFound();
  }

  return (
    <div className="site-container pt-10 pb-16">
      <CatalogPageHeader eyebrow="CHÍNH SÁCH" title={policy.label} />
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-body-muted sm:text-base">
        Nội dung chính sách đang được chuẩn bị. Vui lòng liên hệ hotline để được hỗ trợ trực tiếp.
      </p>
    </div>
  );
}
