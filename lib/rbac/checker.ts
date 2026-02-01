import {
  PermissionAction,
  PermissionModule,
  RoleType,
} from "@/lib/generated/prisma/enums";
import { PermissionMap } from "@/lib/rbac/types";
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
  action: PermissionAction
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
  checks: Array<{ module: PermissionModule; action: PermissionAction }>
): boolean {
  return checks.some(({ module, action }) =>
    can(permissions, warehouseId, module, action)
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
  checks: Array<{ module: PermissionModule; action: PermissionAction }>
): boolean {
  return checks.every(({ module, action }) =>
    can(permissions, warehouseId, module, action)
  );
}
