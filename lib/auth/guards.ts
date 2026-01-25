import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server";
import { UserSessionServer } from "@/lib/auth";
import { RoleType } from "@/lib/generated/prisma/enums";
import { can, canAll, canAny } from "@/lib/rbac";
import type {
  PermissionModule,
  PermissionAction,
} from "@/lib/generated/prisma/enums";

type PermissionCheck = {
  module: PermissionModule;
  action: PermissionAction;
};

type GuardOptions = {
  requireAuth?: boolean;
  requireSuperAdmin?: boolean;
  requireRole?: RoleType;
  requireWarehouseAccess?: boolean;
  requirePermission?: PermissionCheck;
  requireAllPermissions?: PermissionCheck[];
  requireAnyPermissions?: PermissionCheck[];
};

/**
 * Generic authentication and authorization guard
 * Returns user if authorized, redirects otherwise
 */
export async function withGuard(
  warehouseId?: string,
  options: GuardOptions = {},
): Promise<UserSessionServer> {
  const { requireAuth = true } = options;

  if (!requireAuth) {
    throw new Error(
      "Invalid guard configuration: requireAuth must be true for now",
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Superadmin Checks
  if (checkSuperAdminAccess(user, options)) {
    return user;
  }

  // 2. Warehouse Level Checks (Role & Access)
  if (warehouseId) {
    checkWarehouseAccess(user, warehouseId, options);
  }

  // 3. Permission Checks
  if (warehouseId) {
    checkPermissions(user, warehouseId, options);
  }

  return user;
}

function checkSuperAdminAccess(
  user: UserSessionServer,
  options: GuardOptions,
): boolean {
  const { requireSuperAdmin = false } = options;

  // Superadmin bypass (except when explicitly requiring superadmin, which is handled below)
  // Actually, if requireSuperAdmin is false, and user IS superadmin, they pass everything?
  // The original logic was:
  // if (user.isSuperAdmin && !requireSuperAdmin) return user;
  if (user.isSuperAdmin && !requireSuperAdmin) {
    return true;
  }

  // Check superadmin requirement
  if (requireSuperAdmin && !user.isSuperAdmin) {
    redirect("/unauthorized");
  }

  return false;
}

function checkWarehouseAccess(
  user: UserSessionServer,
  warehouseId: string,
  options: GuardOptions,
) {
  const { requireWarehouseAccess = false, requireRole } = options;

  // Check warehouse access
  if (requireWarehouseAccess) {
    if (!user.warehouseRoles?.[warehouseId]) {
      redirect("/unauthorized");
    }
  }

  // Check specific role
  if (requireRole) {
    const userRole = user.warehouseRoles?.[warehouseId];
    if (userRole !== requireRole) {
      redirect("/unauthorized");
    }
  }
}

function checkPermissions(
  user: UserSessionServer,
  warehouseId: string,
  options: GuardOptions,
) {
  const { requirePermission, requireAllPermissions, requireAnyPermissions } =
    options;

  // Check single permission
  if (requirePermission) {
    const hasPermission = can(
      user.permissions,
      warehouseId,
      requirePermission.module,
      requirePermission.action,
    );
    if (!hasPermission) {
      redirect("/unauthorized");
    }
  }

  // Check all permissions
  if (requireAllPermissions) {
    const hasAllPermissions = canAll(
      user.permissions,
      warehouseId,
      requireAllPermissions,
    );
    if (!hasAllPermissions) {
      redirect("/unauthorized");
    }
  }

  // Check any permission
  if (requireAnyPermissions) {
    const hasAnyPermission = canAny(
      user.permissions,
      warehouseId,
      requireAnyPermissions,
    );
    if (!hasAnyPermission) {
      redirect("/unauthorized");
    }
  }
}

/**
 * Shorthand guard for superadmin-only routes
 */
export async function requireSuperAdmin(): Promise<UserSessionServer> {
  return withGuard(undefined, { requireSuperAdmin: true });
}

/**
 * Shorthand guard for warehouse admin routes
 */
export async function requireWarehouseAdmin(
  warehouseId: string,
): Promise<UserSessionServer> {
  return withGuard(warehouseId, {
    requireWarehouseAccess: true,
    requireRole: "ADMIN_GUDANG",
  });
}

/**
 * Shorthand guard for procurement staff routes
 */
export async function requireProcurementStaff(
  warehouseId: string,
): Promise<UserSessionServer> {
  return withGuard(warehouseId, {
    requireWarehouseAccess: true,
    requireRole: "STAF_PENGADAAN",
  });
}

/**
 * Shorthand guard for room staff routes
 */
export async function requireRoomStaff(): Promise<UserSessionServer> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const hasRoomStaffRole = Object.values(user.warehouseRoles ?? {}).includes(
    "STAF_RUANGAN",
  );

  if (!hasRoomStaffRole && !user.isSuperAdmin) {
    redirect("/unauthorized");
  }

  return user;
}

/**
 * Guard that requires specific permission
 */
export async function requirePermission(
  warehouseId: string,
  module: PermissionModule,
  action: PermissionAction,
): Promise<UserSessionServer> {
  return withGuard(warehouseId, {
    requireWarehouseAccess: true,
    requirePermission: { module, action },
  });
}
