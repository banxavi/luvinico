export function formatPhoneDisplay(phone) {
  const digits = String(phone ?? '').replace(/[^\d]/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  if (digits.length === 11) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  return digits;
}

export function formatPrice(price) {
  return String(price ?? '');
}

