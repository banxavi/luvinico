export function buildTelHref(phone) {
  const digits = String(phone ?? '').replace(/[^\d]/g, '');
  return digits ? `tel:${digits}` : '#';
}

export function buildMailtoHref({ to, subject, body }) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const qs = params.toString();
  return `mailto:${to ?? ''}${qs ? `?${qs}` : ''}`;
}

export function buildZaloHref(phone) {
  const digits = String(phone ?? '').replace(/[^\d]/g, '');
  return digits ? `https://zalo.me/${digits}` : 'https://zalo.me';
}

