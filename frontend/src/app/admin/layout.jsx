export default function AdminLayout({ children }) {
  return (
    <div className="min-h-[100dvh] bg-[var(--card-bg-color,var(--card-bg,#fff))] text-[var(--card-fg-color,#000)]">
      {children}
    </div>
  );
}
