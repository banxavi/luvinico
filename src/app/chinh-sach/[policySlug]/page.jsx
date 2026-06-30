import { notFound } from "next/navigation";
import { FOOTER } from "../../../data/footer";
import CatalogPageHeader from "../../../components/layout/CatalogPageHeader";
import { getPolicyHtml } from "../../../lib/policy";
import { createPageMetadata } from "../../../lib/seo";
import PolicyScrollHandler from "./PolicyScrollHandler";

export function generateStaticParams() {
  return FOOTER.policies.map((policy) => ({
    policySlug: policy.href.replace("/chinh-sach/", ""),
  }));
}

export async function generateMetadata({ params }) {
  const { policySlug } = await params;
  const policy = FOOTER.policies.find(
    (p) => p.href === `/chinh-sach/${policySlug}`,
  );
  if (!policy) {
    return createPageMetadata({ title: "Không tìm thấy trang" });
  }
  return createPageMetadata({
    title: policy.label,
    description: `Xem chi tiết điều khoản ${policy.label} của cửa hàng LUVINI & CO.`,
    alternates: {
      canonical: `/chinh-sach/${policySlug}`,
    },
  });
}

export default async function PolicyPage({ params }) {
  const { policySlug } = await params;
  const policy = FOOTER.policies.find(
    (p) => p.href === `/chinh-sach/${policySlug}`,
  );

  if (!policy) {
    notFound();
  }

  const html = await getPolicyHtml(policySlug);

  if (!html) {
    notFound();
  }

  return (
    <div className="site-container pt-10">
      <PolicyScrollHandler policySlug={policySlug} />
      <CatalogPageHeader eyebrow="CHÍNH SÁCH" title={policy.label} />
      <article
        className="policy-content mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
