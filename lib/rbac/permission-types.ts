import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";

export type PermissionKey = `${PermissionModule}:${PermissionAction}`;

export type PermissionMap = Record<
  string,
  Partial<Record<PermissionKey, true>>
>;

export type UserWarehouseRoleWithPermissions = {
  warehouse: {
    id: string;
  };
  role: {
    rolePermissions: {
      permission: {
        module: PermissionModule;
        action: PermissionAction;
      };
    }[];
  };
};
