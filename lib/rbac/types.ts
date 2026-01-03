import {
  PermissionAction,
  PermissionModule,
  RoleType,
} from "@/lib/generated/prisma/enums";

/**
 * Permission key format: "MODULE:ACTION"
 * Example: "WAREHOUSE:VIEW", "ITEM:CREATE"
 */
export type PermissionKey = `${PermissionModule}:${PermissionAction}`;

/**
 * Permission map structure:
 * {
 *   [warehouseId]: {
 *     [permissionKey]: true
 *   }
 * }
 */
export type PermissionMap = Record<
  string,
  Partial<Record<PermissionKey, true>>
>;

/**
 * Type for user warehouse role with nested permissions
 * Used when fetching from database
 */
export type UserWarehouseRoleWithPermissions = {
  warehouse: {
    id: string;
  };
  role: {
    roleType: RoleType;
    rolePermissions: {
      permission: {
        module: PermissionModule;
        action: PermissionAction;
      };
    }[];
  };
};
