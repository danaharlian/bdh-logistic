/**
 * TODO: Refactor for better folder structure
 */

import {
  PermissionKey,
  PermissionMap,
  UserWarehouseRoleWithPermissions,
} from "@/lib/rbac/permission-types";

export const permissionService = {
  getUserWarehousePermissions: (
    rows: UserWarehouseRoleWithPermissions[]
  ): PermissionMap => {
    const map: PermissionMap = {};

    for (const row of rows) {
      const warehouseId = row.warehouse.id;

      if (!map[warehouseId]) {
        map[warehouseId] = {};
      }

      for (const rp of row.role.rolePermissions) {
        const key =
          `${rp.permission.module}:${rp.permission.action}` as PermissionKey;
        map[warehouseId][key] = true;
      }
    }

    return map;
  },
};
