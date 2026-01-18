import { hasPermission } from "../auth/permission-check";
import { RoleType } from "../generated/prisma/enums";
import { UserWarehouseData } from "../rbac";
import { NavItem } from "./navigation-config";

type Props = {
  nav: NavItem[];
  warehouseId?: string;
  data: UserWarehouseData;
  role?: RoleType;
};

export function buildSidebarNav({
  nav,
  warehouseId,
  data,
  role,
}: Props): NavItem[] {
  console.log({nav, data, role})
  return nav
    .filter((item) => {
      // role-based UX filtering
      if (item.allowedRoles && role) {
        if (!item.allowedRoles.includes(role)) return false;
      }

      // permission-based filtering
      if (item.permissions) {
        return hasPermission(data.permissions, warehouseId, item.permissions);
      } 

      return true;
    })
    .map((item) => ({
      ...item,
      children: item.children
        ? buildSidebarNav({
            nav: item.children,
            warehouseId,
            data,
            role,
          })
        : undefined,
    }))
    .filter((item) => !item.children || item.children.length > 0);
}
