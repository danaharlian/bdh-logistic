import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";

export type RoutePermission = {
  module: PermissionModule;
  action: PermissionAction;
};

export const routePermissions: Record<string, RoutePermission> = {
  "/requests/create": { module: "REQUEST", action: "CREATE" },
  "/requests/view": { module: "REQUEST", action: "VIEW" },
  "/warehouse/manage": { module: "WAREHOUSE", action: "UPDATE" },
};
