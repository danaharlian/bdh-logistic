import { PermissionMap, UserWarehouseRoleWithPermissions } from "./types";
import { createPermissionKey } from "./utils";

export const permissionService = {
  /**
   * Transforms user warehouse roles into a permission map
   * @param rows - Array of user warehouse roles with permissions
   * @returns Permission map organized by warehouse ID
   */
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
        const key = createPermissionKey(
          rp.permission.module,
          rp.permission.action
        );
        map[warehouseId][key] = true;
      }
    }

    return map;
  },
};
