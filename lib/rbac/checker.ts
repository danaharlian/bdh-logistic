import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";
import { PermissionMap, PermissionKey } from "@/lib/rbac/types";
import { createPermissionKey } from "@/lib/rbac/utils";

/**
 * Checks if a user has a specific permission for a warehouse
 * @param permissions - Permission map from user session
 * @param warehouseId - Warehouse ID to check permission for
 * @param module - Permission module (e.g., WAREHOUSE, ITEM)
 * @param action - Permission action (e.g., VIEW, CREATE, UPDATE)
 * @returns true if user has the permission, false otherwise
 */
export function can(
  permissions: PermissionMap,
  warehouseId: string,
  module: PermissionModule,
  action: PermissionAction,
): boolean {
  const key = createPermissionKey(module, action);
  return !!permissions[warehouseId]?.[key];
}

/**
 * Checks if a user has any of the specified permissions for a warehouse
 * @param permissions - Permission map from user session
 * @param warehouseId - Warehouse ID to check permission for
 * @param checks - Array of permission checks
 * @returns true if user has at least one of the permissions
 */
export function canAny(
  permissions: PermissionMap,
  warehouseId: string,
  checks: Array<{ module: PermissionModule; action: PermissionAction }>,
): boolean {
  return checks.some(({ module, action }) =>
    can(permissions, warehouseId, module, action),
  );
}

/**
 * Checks if a user has all of the specified permissions for a warehouse
 * @param permissions - Permission map from user session
 * @param warehouseId - Warehouse ID to check permission for
 * @param checks - Array of permission checks
 * @returns true if user has all of the permissions
 */
export function canAll(
  permissions: PermissionMap,
  warehouseId: string,
  checks: Array<{ module: PermissionModule; action: PermissionAction }>,
): boolean {
  return checks.every(({ module, action }) =>
    can(permissions, warehouseId, module, action),
  );
}

/**
 * Checks if a user has a specific role in a warehouse
 */
export function hasRoleInWarehouse(
  roles: Record<string, import("@/lib/generated/prisma/enums").RoleType>,
  warehouseId: string,
  role: import("@/lib/generated/prisma/enums").RoleType,
): boolean {
  if (!roles) return false;
  return roles[warehouseId] === role;
}

/**
 * Checks if user has navigation permission(s)
 * Permission rule:
 * - If warehouseId exists → check that warehouse
 * - If global nav → check ANY warehouse
 */
export function hasNavigationPermission(
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
