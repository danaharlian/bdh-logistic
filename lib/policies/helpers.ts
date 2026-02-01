import { redirect } from "next/navigation";
import { createPermissionKey } from "@/lib/rbac";
import type {
  PermissionAction,
  PermissionModule,
  RoleType,
} from "@/lib/generated/prisma/enums";
import type { UserSessionServer } from "@/lib/auth";
import type { Policy } from "@/lib/policies/types";

export function requireAuth(user: UserSessionServer) {
  if (!user) redirect("/login");
}

export function superAdminBypass(user: UserSessionServer) {
  return user.isSuperAdmin;
}

export function requireWarehouse(user: UserSessionServer, warehouseId: string) {
  if (!warehouseId) redirect("/select-warehouse");
  if (!user.warehouseRoles?.[warehouseId]) {
    redirect("/unauthorized");
  }
}

export function requirePermission(
  user: UserSessionServer,
  warehouseId: string,
  module: PermissionModule,
  action: PermissionAction
) {
  const key = createPermissionKey(module, action);

  if (!user.permissions?.[warehouseId]?.[key]) {
    redirect("/unauthorized");
  }
}

export function compose(...policies: Policy[]): Policy {
  return (ctx) => {
    for (const policy of policies) {
      policy(ctx);
    }
  };
}

export function requireRole(
  user: UserSessionServer,
  warehouseId: string,
  allowedRoles: RoleType[]
) {
  if (user.isSuperAdmin) return;

  const role = user.warehouseRoles?.[warehouseId];
  if (!role || !allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }
}
