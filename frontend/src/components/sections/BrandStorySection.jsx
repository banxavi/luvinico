import { BRAND } from '../../data/brand';
import FadeInSection from '../ui/FadeInSection';

export default function BrandStorySection() {
  return (
    <FadeInSection id="story" className="pt-14">
      <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 sm:p-10">
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">CÂU CHUYỆN THƯƠNG HIỆU</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">The Story of Luvini &amp; Co.</h2>
        <div className="mt-5 w-full space-y-4 text-base leading-relaxed text-body-muted">
          <p>
            <strong className="font-semibold text-white">{BRAND.name}</strong> được hình thành từ một niềm tin đơn
            giản: một chai rượu ngon không chỉ là một thức uống, mà còn là một trải nghiệm đáng nhớ để kết nối con
            người với nhau.
          </p>
          <p>
            Sau nhiều năm làm việc trong lĩnh vực công nghệ và luôn theo đuổi sự chỉn chu trong từng chi tiết, chúng
            tôi nhận ra rằng thế giới rượu vang và bia nhập khẩu cũng cần một cách tiếp cận tương tự: lựa chọn kỹ
            lưỡng, minh bạch nguồn gốc và đặt trải nghiệm khách hàng lên hàng đầu.
          </p>
          <p>
            Thay vì cố gắng mang đến hàng trăm lựa chọn, {BRAND.name} tập trung vào việc tuyển chọn những dòng rượu
            vang và bia nhập khẩu có chất lượng tốt, hương vị đặc trưng và phù hợp với nhiều dịp thưởng thức khác
            nhau. Mỗi sản phẩm xuất hiện trong bộ sưu tập của chúng tôi đều được cân nhắc dựa trên giá trị thực,
            câu chuyện thương hiệu và trải nghiệm mà nó mang lại.
          </p>
          <p>
            Chúng tôi tin rằng nghệ thuật thưởng thức không nằm ở giá trị của chai rượu, mà nằm ở khoảnh khắc được
            chia sẻ cùng gia đình, bạn bè và những người quan trọng.
          </p>
          <p>
            Đó cũng là ý nghĩa đằng sau khẩu hiệu của chúng tôi:
            <br />
            <em className="mt-2 block text-white/90">
              {BRAND.tagline} – Nghệ thuật của gu thưởng thức tinh tế.
            </em>
          </p>
          <p>
            {BRAND.name} mong muốn trở thành người đồng hành đáng tin cậy cho những ai yêu thích rượu vang, bia nhập
            khẩu và những trải nghiệm được chọn lọc bằng sự tận tâm.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}
