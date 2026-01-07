import { UserSessionServer } from "@/lib/auth";

export const resolveHomeUrl = (user: UserSessionServer): string => {
  if (!user) return "/login";

  const roleEntries = Object.entries(user.warehouseRoles ?? []);

  /**
   * Default route for Superadmin
   */

  if (user.isSuperAdmin) {
    return "/dashboard";
  }

  /**
   * Default route for Staf ruangan
   */
  if (roleEntries.some(([, role]) => role === "STAF_RUANGAN")) {
    return "/requests";
  }

  /**
   * Default route for Staf Pengadaan
   */
  const procurementWarehouses = roleEntries
    .filter(([, role]) => role === "STAF_PENGADAAN")
    .map(([warehouseId]) => warehouseId);

  /**
   * procurementWarehouses.length > 0 = ['warehouseId', 'warehouseId']
   * TODO: In the future, change this to select warehouse.
   * Example:
   * if (procurementWarehouses.length > 0) {
   *   return "/select-warehouse";
   * }
   */
  if (procurementWarehouses.length > 0) {
    return `/w/${procurementWarehouses[0]}/procurement/dashboard`;
  }

  if (procurementWarehouses.length === 1) {
    return `/w/${procurementWarehouses[0]}/procurement/dashboard`;
  }

  /**
   * Default route for Admin gudang
   */
  const adminWarehouse = roleEntries.find(
    ([, role]) => role === "ADMIN_GUDANG"
  )?.[0];

  if (adminWarehouse) {
    return `/w/${adminWarehouse}/admin/dashboard`;
  }

  /**
   * Fallback
   */

  return "/unauthorized";
};
