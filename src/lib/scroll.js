export function scrollToSection(sectionId) {
  if (typeof window === 'undefined') return;
  const id = (sectionId ?? '').replace(/^#/, '');
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const tryScroll = (attemptsLeft) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (attemptsLeft > 0) {
      requestAnimationFrame(() => tryScroll(attemptsLeft - 1));
    }
  };

  tryScroll(40);
}
