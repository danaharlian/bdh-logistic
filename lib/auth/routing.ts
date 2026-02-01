import { redirect } from "next/navigation";
import { authorize } from "@/lib/auth/authorize";
import type { UserSessionServer } from "@/lib/auth";
import type { PolicyKey } from "@/lib/policies";

/**
 * Ordered list of landing intents
 * Order = Priority
 */
const LANDING_POLICIES = [
  {
    policy: "admin.admin",
    resolveUrl: (warehouseId: string) =>
      `/warehouse/${warehouseId}/admin/dashboard`,
  },
  {
    policy: "procurement.dashboard",
    resolveUrl: (warehouseId: string) =>
      `/warehouse/${warehouseId}/procurement/dashboard`,
  },
  {
    policy: "room.dashboard",
    resolveUrl: (warehouseId: string) =>
      `/warehouse/${warehouseId}/requests/dashboard`,
  },
] satisfies readonly {
  policy: PolicyKey;
  resolveUrl: (warehouseId: string) => string;
}[];

function resolveDefaultWarehouse(user: UserSessionServer): string | null {
  const warehouseIds = Object.keys(user.warehouseRoles ?? {});
  if (warehouseIds.length === 0) return null;

  // Can be replaced with lastActiveWarehouse, preference, etc.
  return warehouseIds[0];
}

export async function resolveHomeUrl(user: UserSessionServer): Promise<string> {
  if (user.isSuperAdmin) {
    return "/superadmin";
  }

  const warehouseId = resolveDefaultWarehouse(user);

  if (!warehouseId) return "/unauthorized";

  for (const entry of LANDING_POLICIES) {
    const allowed = await authorize(entry.policy, {
      warehouseId,
      silent: true,
    });

    if (allowed) {
      return entry.resolveUrl(warehouseId);
    }
  }

  return "/unauthorized";
}

export async function redirectToHome(user: UserSessionServer): Promise<never> {
  const url = await resolveHomeUrl(user);
  redirect(url);
}
