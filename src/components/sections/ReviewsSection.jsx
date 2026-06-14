import { mockReviews } from '../../data/reviews';
import FadeInSection from '../ui/FadeInSection';

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-brand-amber' : 'text-white/25'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <FadeInSection id="reviews" className="pt-14">
      <div>
        <div className="text-xs font-semibold tracking-normal text-brand-amber">ĐÁNH GIÁ KHÁCH HÀNG</div>
        <h2 className="mt-2 text-2xl font-semibold text-white">Khách hàng nói gì về chúng tôi</h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {mockReviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-white/10 bg-premium-dark p-5">
            <Stars rating={r.rating} />
            <p className="mt-4 text-sm leading-relaxed text-body-muted">“{r.text}”</p>
            <p className="mt-4 text-sm font-semibold text-brand-amber">{r.name}</p>
          </article>
        ))}
      </div>
    </FadeInSection>
  );
}
