import {
  PermissionMap,
  UserWarehouseRoleWithPermissions,
  WarehouseRoleMap,
  UserWarehouseData,
} from "@/lib/rbac/types";
import { createPermissionKey } from "@/lib/rbac/utils";

export const permissionService = {
  /**
   * Transforms user warehouse roles into both permission map and warehouse role map
   * in a single pass for optimal performance.
   * @param rows - Array of user warehouse roles with permissions
   * @returns Object containing both permissions and warehouse roles
   */
  getUserWarehouseData: (
    rows: UserWarehouseRoleWithPermissions[],
  ): UserWarehouseData => {
    const permissions: PermissionMap = {};
    const warehouseRoles: WarehouseRoleMap = {};

    for (const row of rows) {
      const warehouseId = row.warehouse.id;
      const roleType = row.role.roleType;

      // Set warehouse role (last role wins if duplicate warehouse)
      warehouseRoles[warehouseId] = roleType;

      // Build permissions map
      const warehousePermissions = (permissions[warehouseId] ??= {});

      for (const rp of row.role.rolePermissions) {
        const key = createPermissionKey(
          rp.permission.module,
          rp.permission.action,
        );
        warehousePermissions[key] = true;
      }
    }

    return { permissions, warehouseRoles };
  },
};
