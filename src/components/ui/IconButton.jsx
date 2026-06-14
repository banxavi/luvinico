export default function IconButton({ label, onClick, expanded, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 bg-premium-dark text-white transition hover:border-brand-amber/60 hover:text-brand-amber ${className}`.trim()}
    >
      {children}
    </button>
  );
}
