/** Menu chính — static pages + thứ tự mặc định khi CMS chưa có navOrder */
export { NAV_SUBMENU_LIMIT } from './navMenu';

export const STATIC_NAV_LEADING = [{ path: '/khuyen-mai', label: 'Khuyến Mãi' }];

export const STATIC_NAV_TRAILING = [{ path: '/kien-thuc', label: 'Kiến thức' }];

/** Fallback khi Sanity catalog trống hoặc lỗi */
export const NAV_ITEMS_FALLBACK = [
  ...STATIC_NAV_LEADING,
  { path: '/bia', label: 'Bia nhập khẩu', categoryKey: 'bia' },
  { path: '/ruou-vang', label: 'Rượu vang', categoryKey: 'ruou-vang' },
  { path: '/ruou-manh', label: 'Rượu mạnh', categoryKey: 'ruou-manh' },
  { path: '/qua-tet', label: 'Quà Tết', categoryKey: 'qua-tet' },
  { path: '/phu-kien', label: 'Phụ kiện', categoryKey: 'phu-kien' },
  ...STATIC_NAV_TRAILING,
];

/** @deprecated use buildNavItems(catalog) via SiteDataContext */
export const NAV_ITEMS = NAV_ITEMS_FALLBACK;
