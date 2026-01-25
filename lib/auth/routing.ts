import { redirect } from "next/navigation";
import { UserSessionServer } from "@/lib/auth";
import { RoleType } from "@/lib/generated/prisma/enums";

// Configuration for role-based routing
const ROLE_HOME_URLS: Record<string, (id: string) => string> = {
  ADMIN_GUDANG: (id) => `/w/${id}/admin/dashboard`,
  STAF_PENGADAAN: (id) => `/w/${id}/procurement/dashboard`,
  STAF_RUANGAN: () => `/requests`,
};

// Priority order for resolving home URL (higher index = lower priority?)
// Actually let's do: element 0 is highest priority.
const ROLE_PRIORITY: RoleType[] = [
  "ADMIN_GUDANG",
  "STAF_PENGADAAN",
  "STAF_RUANGAN",
];

/**
 * Resolves the home URL for a user based on their roles and permissions
 */
export function resolveHomeUrl(user: UserSessionServer): string {
  if (!user) return "/login";

  // Superadmin gets access to superadmin dashboard
  if (user.isSuperAdmin) {
    return "/dashboard";
  }

  const roleEntries = Object.entries(user.warehouseRoles ?? {});

  // If no roles, unauthorized
  if (roleEntries.length === 0) {
    return "/unauthorized";
  }

  // Iterate through priority list to find the first matching role
  for (const roleType of ROLE_PRIORITY) {
    // specific logic for procurement having multiple warehouses
    if (roleType === "STAF_PENGADAAN") {
      const procurementWarehouses = roleEntries
        .filter(([, role]) => role === "STAF_PENGADAAN")
        .map(([warehouseId]) => warehouseId);

      if (procurementWarehouses.length > 1) {
        return "/select-warehouse";
      }
      if (procurementWarehouses.length === 1) {
        return ROLE_HOME_URLS["STAF_PENGADAAN"](procurementWarehouses[0]);
      }
    } else {
      // For other roles, just find the first warehouse with that role
      // Note: This logic assumes if you have ADMIN_GUDANG in ANY warehouse, you go there.
      // If you have it in multiple, we pick the first one found.
      const warehouseId = roleEntries.find(
        ([, role]) => role === roleType,
      )?.[0];
      const urlBuilder = ROLE_HOME_URLS[roleType];

      if (warehouseId && urlBuilder) {
        return urlBuilder(warehouseId);
      }
    }
  }

  // Fallback for users without proper roles that match our priority list
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
  role: RoleType,
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
  warehouseId: string,
): boolean {
  if (user.isSuperAdmin) return true;
  return !!user.warehouseRoles?.[warehouseId];
}

/**
 * Gets user's role for a specific warehouse
 */
export function getWarehouseRole(
  user: UserSessionServer,
  warehouseId: string,
): RoleType | null {
  return user.warehouseRoles?.[warehouseId] ?? null;
}
