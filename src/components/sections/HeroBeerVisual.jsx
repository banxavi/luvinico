/** Decorative beer glass — pure SVG, no raster images */
export default function HeroBeerVisual({ className = '' }) {
  return (
    <div className={`hero-beer-visual ${className}`.trim()} aria-hidden>
      <svg
        viewBox="0 0 200 320"
        className="h-full w-full max-h-[min(52vh,420px)] drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beerLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8B84A" />
            <stop offset="45%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#8B5A12" />
          </linearGradient>
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <clipPath id="glassClip">
            <path d="M58 95 L72 280 Q100 295 128 280 L142 95 Q100 78 58 95 Z" />
          </clipPath>
        </defs>

        {/* Glass body */}
        <path
          d="M52 92 L68 285 Q100 302 132 285 L148 92 Q100 72 52 92 Z"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M58 95 L72 280 Q100 295 128 280 L142 95 Q100 78 58 95 Z"
          fill="url(#glassShine)"
        />

        {/* Beer liquid */}
        <g clipPath="url(#glassClip)">
          <rect x="50" y="130" width="100" height="170" fill="url(#beerLiquid)" className="hero-beer-liquid-shimmer" />
          {/* In-glass bubbles */}
          <circle cx="78" cy="200" r="3" fill="rgba(255,255,255,0.35)" className="hero-glass-bubble hero-glass-bubble-1" />
          <circle cx="95" cy="230" r="2" fill="rgba(255,255,255,0.3)" className="hero-glass-bubble hero-glass-bubble-2" />
          <circle cx="112" cy="185" r="2.5" fill="rgba(255,255,255,0.28)" className="hero-glass-bubble hero-glass-bubble-3" />
          <circle cx="88" cy="250" r="1.5" fill="rgba(255,255,255,0.25)" className="hero-glass-bubble hero-glass-bubble-4" />
        </g>

        {/* Foam head */}
        <ellipse cx="100" cy="118" rx="38" ry="14" fill="#F5E6C8" opacity="0.95" />
        <ellipse cx="82" cy="112" rx="14" ry="9" fill="#FFF8EC" />
        <ellipse cx="118" cy="110" rx="16" ry="10" fill="#FFF8EC" />
        <ellipse cx="100" cy="105" rx="22" ry="8" fill="#FFFFFF" opacity="0.9" />

        {/* Rim highlight */}
        <path
          d="M58 95 Q100 82 142 95"
          stroke="rgba(212,160,23,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Second glass silhouette — decorative */}
        <g opacity="0.35" transform="translate(118, 40) scale(0.55)">
          <path
            d="M52 92 L68 285 Q100 302 132 285 L148 92 Q100 72 52 92 Z"
            stroke="rgba(212,160,23,0.5)"
            strokeWidth="2"
            fill="rgba(212,160,23,0.06)"
          />
          <ellipse cx="100" cy="118" rx="38" ry="14" fill="rgba(245,230,200,0.4)" />
        </g>
      </svg>

      <span className="hero-beer-glow" />
    </div>
  );
}
