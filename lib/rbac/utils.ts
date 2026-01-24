import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";
import { PermissionKey } from "@/lib/rbac/types";

/**
 * Creates a permission key from module and action
 * @param module - Permission module
 * @param action - Permission action
 * @returns Permission key in format "MODULE:ACTION"
 */
export function createPermissionKey(
  module: PermissionModule,
  action: PermissionAction,
): PermissionKey {
  return `${module}:${action}` as PermissionKey;
}

/**
 * Parses a permission key into module and action
 * @param key - Permission key in format "MODULE:ACTION"
 * @returns Object with module and action, or null if invalid
 */
export function parsePermissionKey(
  key: string,
): { module: PermissionModule; action: PermissionAction } | null {
  const [module, action] = key.split(":");
  if (!module || !action) return null;

  return {
    module: module as PermissionModule,
    action: action as PermissionAction,
  };
}
