/**
 * Menu phân cấp parent / sub-tab — theo file doc khách
 * (BEER NHẬP KHẨU TAB, RƯỢU VANG TAB).
 * Parent click → tất cả sản phẩm trong các sub-tab của nhóm.
 * Sub-tab click → chỉ sản phẩm thuộc sub-tab đó.
 */
export const NAV_SUBMENU_LIMIT = 12;
export const NAV_MAX_COLUMNS = 5;

/** @typedef {{ slug: string, label: string }} NavSubTab */
/** @typedef {{ key: string, label: string, subTabs: NavSubTab[] }} NavMenuGroup */

/** @type {Record<string, NavMenuGroup[]>} */
export const CATEGORY_NAV_MENUS = {
  bia: [
    {
      key: 'bia-duc',
      label: 'Bia Đức',
      subTabs: [
        { slug: 'eibauer', label: 'Bia Eibauer' },
        { slug: 'feldschloesschen', label: 'Bia Feldschloesschen' },
        { slug: 'kaiserdom', label: 'Bia Kaiserdom' },
        { slug: 'paulaner', label: 'Bia Paulaner' },
        { slug: 'weihenstephaner', label: 'Bia Weihenstephaner' },
        { slug: 'dinkelacker', label: 'Bia Dinkelacker' },
        { slug: 'paderborner', label: 'Bia Paderborner' },
        { slug: 'hofbrau', label: 'Bia Hofbrau' },
        { slug: 'schwaben-brau', label: 'Bia Schwaben Bräu' },
        { slug: 'arcobrau', label: 'Bia Arcobräu' },
        { slug: 'warsteiner', label: 'Bia Warsteiner' },
        { slug: 'schorsch', label: 'Bia Schorsch' },
        { slug: 'bitburger', label: 'Bia Bitburger' },
        { slug: 'sanwald', label: 'Bia Sanwald' },
      ],
    },
    {
      key: 'bia-mexico',
      label: 'Bia Mexico',
      subTabs: [
        { slug: 'coronita-extra', label: 'Bia Coronita Extra' },
      ],
    },
  ],
  'qua-tet': [
    {
      key: 'hop-qua-bia',
      label: 'Hộp quà bia',
      subTabs: [
        { slug: 'chimay', label: 'Bia Chimay' },
        { slug: 'duvel', label: 'Bia Duvel' },
      ],
    },
  ],
  'ruou-vang': [
    {
      key: 'ruou-vang',
      label: 'Rượu vang',
      subTabs: [
        { slug: 'ruou-vang-phap', label: 'Rượu Vang Pháp' },
        { slug: 'ruou-vang-y', label: 'Rượu Vang Ý' },
        { slug: 'ruou-vang-uc', label: 'Rượu Vang Úc' },
      ],
    },
  ],
};

export function getCategoryNavMenus(categoryKey) {
  return CATEGORY_NAV_MENUS[categoryKey] ?? [];
}

export function getNavMenuGroup(categoryKey, groupKey) {
  return getCategoryNavMenus(categoryKey).find((group) => group.key === groupKey) ?? null;
}

export function getSubTabSlugsForGroup(categoryKey, groupKey) {
  const group = getNavMenuGroup(categoryKey, groupKey);
  return group?.subTabs.map((tab) => tab.slug) ?? [];
}

export function isTypeInGroup(categoryKey, groupKey, typeSlug) {
  if (!typeSlug) return false;
  return getSubTabSlugsForGroup(categoryKey, groupKey).includes(typeSlug);
}
