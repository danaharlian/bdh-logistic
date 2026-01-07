import { RoleType } from "@/lib/generated/prisma/enums";

export const hasRoleInWarehouse = (
  roles: Record<string, RoleType>,
  warehouseId: string,
  role: RoleType
) => {
  if (!roles) return false;
  return roles[warehouseId] === role;
};
