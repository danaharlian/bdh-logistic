import { redirect } from "next/navigation";
import { UserSessionServer } from "@/lib/auth";
import { RoleType } from "@/lib/generated/prisma/enums";

/**
 * Resolves the home URL for a user based on their roles and permissions
 */
export function resolveHomeUrl(user: UserSessionServer): string {
  if (!user) return "/login";

  const roleEntries = Object.entries(user.warehouseRoles ?? {});

  // Superadmin gets access to superadmin dashboard
  if (user.isSuperAdmin) {
    return "/dashboard";
  }

  // Priority: ADMIN_GUDANG > STAF_PENGADAAN > STAF_RUANGAN

  // 1. Admin Gudang (highest priority warehouse role)
  const adminWarehouse = roleEntries.find(
    ([, role]) => role === "ADMIN_GUDANG"
  )?.[0];

  if (adminWarehouse) {
    return `/w/${adminWarehouse}/admin/dashboard`;
  }

  // 2. Staf Pengadaan
  const procurementWarehouses = roleEntries
    .filter(([, role]) => role === "STAF_PENGADAAN")
    .map(([warehouseId]) => warehouseId);

  if (procurementWarehouses.length > 0) {
    return `/w/${procurementWarehouses[0]}/procurement/dashboard`;
  }

  // If multiple warehouses, redirect to selection page
  if (procurementWarehouses.length > 1) {
    return "/select-warehouse";
  }

  // 3. Staf Ruangan (lowest priority)
  if (roleEntries.some(([, role]) => role === "STAF_RUANGAN")) {
    return "/requests";
  }

  // Fallback for users without proper roles
  return "/unauthorized";
}

/**
 * Redirects user to their home page (never returns)
 */
export function redirectToHome(user: UserSessionServer): never {
  const homeUrl = resolveHomeUrl(user);
  redirect(homeUrl);
}

/**
 * Gets all warehouses where user has a specific role
 */
export function getWarehousesByRole(
  user: UserSessionServer,
  role: RoleType
): string[] {
  return Object.entries(user.warehouseRoles ?? {})
    .filter(([, r]) => r === role)
    .map(([warehouseId]) => warehouseId);
}

/**
 * Checks if user has access to a specific warehouse
 */
export function hasWarehouseAccess(
  user: UserSessionServer,
  warehouseId: string
): boolean {
  if (user.isSuperAdmin) return true;
  return !!user.warehouseRoles?.[warehouseId];
}

/**
 * Gets user's role for a specific warehouse
 */
export function getWarehouseRole(
  user: UserSessionServer,
  warehouseId: string
): RoleType | null {
  return user.warehouseRoles?.[warehouseId] ?? null;
}
