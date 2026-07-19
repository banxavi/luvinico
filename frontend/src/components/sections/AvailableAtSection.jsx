import { mockPartners } from '../../data/partners';
import FadeInSection from '../ui/FadeInSection';

export default function AvailableAtSection() {
  return (
    <FadeInSection id="partners" className="pt-14">
      <div>
        <div className="text-xs font-semibold tracking-normal text-brand-amber">CÓ MẶT TẠI</div>
        <h2 className="mt-2 text-2xl font-semibold text-white">Đối tác & điểm bán</h2>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">
          Mạng lưới đối tác và điểm trải nghiệm — dữ liệu mẫu, sẽ thay logo thật khi go-live.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {mockPartners.map((p) => (
          <div
            key={p.id}
            className="flex min-h-[72px] items-center justify-center rounded-xl border border-white/10 bg-premium-dark px-3 py-4 text-center text-xs font-semibold text-body-muted sm:text-sm"
          >
            {p.name}
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}
