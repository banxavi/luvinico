import { BRAND } from '../../data/brand';
import FadeInSection from '../ui/FadeInSection';

export default function BrandStorySection() {
  return (
    <FadeInSection id="story" className="pt-14">
      <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 sm:p-10">
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">CÂU CHUYỆN THƯƠNG HIỆU</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Nghệ thuật của sự tinh tế</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-body-muted text-measure">
          <p>
            <strong className="font-semibold text-white">{BRAND.name}</strong> được hình thành từ niềm đam mê ghép
            nối <strong className="font-semibold text-white">rượu vang tuyển chọn</strong> và{' '}
            <strong className="font-semibold text-white">bia nhập khẩu cao cấp</strong> — không để bán đại trà, mà
            để mỗi chai đều có lý do xuất hiện trên bàn của bạn.
          </p>
          <p>
            Chúng tôi tin <em className="text-white/90">The Art of Fine Taste</em> bắt đầu từ việc lắng nghe: khẩu
            vị, dịp tiệc, món ăn kết hợp và ngân sách. Từ đó, đội ngũ tư vấn gợi ý những nhãn hiệu phù hợp — từ
            champagne sang trọng đến craft beer đậm cá tính.
          </p>
          <p>
            Mỗi sản phẩm trong catalog đều hướng tới tiêu chí{' '}
            <strong className="font-semibold text-white">nguồn gốc rõ ràng, hương vị cân bằng, trải nghiệm đáng nhớ</strong>
            — đúng tinh thần curated mà {BRAND.shortName} theo đuổi.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
