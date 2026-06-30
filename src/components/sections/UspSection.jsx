import { BRAND } from '../../data/brand';
import FadeInSection from '../ui/FadeInSection';

const uspItems = [
  {
    title: 'Curated catalog',
    desc: 'Mỗi chai/lon đều qua bộ lọc nguồn gốc, phong cách và độ cân bằng hương vị trước khi lên kệ.',
  },
  {
    title: 'Tư vấn pairing',
    desc: 'Gợi ý theo món ăn, dịp tiệc và khẩu vị — từ vang trắng thanh đến IPA đậm hoa bia.',
  },
  {
    title: 'Trải nghiệm premium',
    desc: 'Giao diện tối ưu mobile, dễ duyệt và đặt hàng — phù hợp thói quen mua sắm hiện đại.',
  },
];

export default function UspSection() {
  return (
    <FadeInSection className="pt-14">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold text-brand-amber">CO / CQ</div>
          <div className="mt-2 text-sm text-body-muted">100% nhập khẩu chính ngạch</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-xs font-semibold text-brand-amber">GIAO NHANH</div>
          <div className="mt-2 text-sm text-body-muted">
            Giao hàng nhanh chóng – Miễn phí nội thành TP.HCM cho đơn hàng từ 1.000.000₫.
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold tracking-normal text-brand-amber">GIÁ TRỊ</div>
        <h2 className="mt-2 text-2xl font-semibold text-white">Vì sao chọn {BRAND.name}</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {uspItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-premium-dark p-5">
            <div className="text-sm font-semibold text-brand-amber">{item.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-body-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}
