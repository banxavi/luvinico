export default function PoliciesSection() {
  return (
    <section id="policies" className="pt-12">
      <div>
        <div className="text-xs font-semibold tracking-normal text-premium-gold">CHÍNH SÁCH</div>
        <h2 className="mt-2 text-2xl font-semibold">Minh bạch & rõ ràng</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Dự án cá nhân nên phần “chính sách” ở mức mô phỏng. Khi triển khai thật bạn có thể thay bằng nội dung pháp lý phù hợp.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-sm font-semibold text-premium-gold">Đổi trả</div>
          <p className="mt-2 text-sm text-white/70">Quy định đổi trả rõ điều kiện, minh bạch chi phí.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-sm font-semibold text-premium-gold">Vận chuyển</div>
          <p className="mt-2 text-sm text-white/70">Tối ưu trải nghiệm giao nhận, đóng gói chắc chắn.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
          <div className="text-sm font-semibold text-premium-gold">Bảo mật</div>
          <p className="mt-2 text-sm text-white/70">Chỉ dùng thông tin để tư vấn, không lưu trữ dài hạn.</p>
        </div>
      </div>
    </section>
  );
}

