import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";
import { PermissionMap, PermissionKey } from "@/lib/rbac/permission-types";

export const can = (
  permissions: PermissionMap,
  warehouseId: string,
  module: PermissionModule,
  action: PermissionAction
): boolean => {
  return !!permissions[warehouseId]?.[`${module}:${action}` as PermissionKey];
};
