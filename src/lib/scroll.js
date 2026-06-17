export function scrollToTop({ behavior = 'auto' } = {}) {
  if (typeof window === 'undefined') return;

  const apply = () => {
    window.scrollTo({ top: 0, left: 0, behavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  apply();
  requestAnimationFrame(() => {
    apply();
    requestAnimationFrame(apply);
  });
}

export function scrollToSection(sectionId) {
  if (typeof window === 'undefined') return;
  const id = (sectionId ?? '').replace(/^#/, '');
  if (!id) {
    scrollToTop();
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
