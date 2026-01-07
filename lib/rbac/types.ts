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
 * Warehouse role map structure:
 * {
 *   [warehouseId]: 'SUPER_ADMIN'
 * }
 */
export type WarehouseRoleMap = Record<string, RoleType>;

/**
 * Combined result of permissions and warehouse roles
 * Used when both are needed together for better performance
 */
export type UserWarehouseData = {
  permissions: PermissionMap;
  warehouseRoles: WarehouseRoleMap;
};

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
