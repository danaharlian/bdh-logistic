import {
  requireAuth,
  requirePermission,
  requireRole,
  requireWarehouse,
  superAdminBypass,
} from "@/lib/policies//helpers";
import type { Policy } from "@/lib/policies/types";
import type {
  PermissionAction,
  PermissionModule,
  RoleType,
} from "@/lib/generated/prisma/enums";

type DefinePolicyArgs = {
  roles?: RoleType[];
  permission?: {
    module: PermissionModule;
    action: PermissionAction;
  };
};

export function definePolicy(args: DefinePolicyArgs): Policy {
  return ({ user, warehouseId }) => {
    requireAuth(user);
    if (superAdminBypass(user)) return;

    requireWarehouse(user, warehouseId);

    if (args.roles) {
      requireRole(user, warehouseId, args.roles);
    }

    if (args.permission) {
      requirePermission(
        user,
        warehouseId,
        args.permission.module,
        args.permission.action
      );
    }
  };
}
