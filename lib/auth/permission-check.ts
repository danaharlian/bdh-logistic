import type { PermissionKey, PermissionMap } from "../rbac";

/**
 * Permission rule:
 * - If warehouseId exists → check that warehouse
 * - If global nav → check ANY warehouse
 */
export function hasPermission(
  required: PermissionKey[],
  warehouseId: string | undefined,
  permissions: PermissionMap,
): boolean {
  // warehouse-scoped
  if (warehouseId) {
    const perms = permissions[warehouseId];
    if (!perms) return false;

    return required.some((p) => perms[p]);
  }

  // global nav → any warehouse
  return Object.values(permissions).some((perms) =>
    required.some((p) => perms?.[p]),
  );
}
