const SUPER_ADMIN_ROLES = new Set(['administrator', 'developer'])

export function isStudioSuperAdmin(currentUser) {
  if (!currentUser?.roles?.length) return false
  return currentUser.roles.some((role) => SUPER_ADMIN_ROLES.has(role.name))
}

export function studioRoleDataset(currentUser) {
  return isStudioSuperAdmin(currentUser) ? 'super' : 'editor'
}
