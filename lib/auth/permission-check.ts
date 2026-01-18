import type { PermissionKey, PermissionMap } from "../rbac";

export function hasPermission(
  permissions: PermissionMap,
  warehouseId: string | undefined,
  required: PermissionKey[] | undefined
): boolean {
  if (!required || required.length === 0) return true;

  // super admin already has everything in map
  if (!warehouseId) return false;

  const warehousePerms = permissions[warehouseId];
  if (!warehousePerms) return false;

  return required.some((key) => warehousePerms[key]);
}
