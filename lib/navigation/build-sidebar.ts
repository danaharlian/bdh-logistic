import { hasPermission } from "../auth/permission-check";
import { RoleType } from "../generated/prisma/enums";
import { UserWarehouseData } from "../rbac";
import { BuiltNavItem, NavItem } from "./navigation-types";

/**
 * Input args for building sidebar navigation
 */
export type BuildSidebarNavArgs = {
  nav: NavItem[];
  /**
   * undefined = global nav
   * string = warehouse scoped nav
   */
  warehouseId?: string;

  /**
   * Current role context (UX-level)
   */
  role: RoleType;

  /**
   * Permission & role data from session
   */
  data: UserWarehouseData;
};

type BuildItemArgs = {
  item: NavItem;
  warehouseId?: string;
  role: RoleType;
  data: BuildSidebarNavArgs["data"];
};

export function buildSidebarNav({
  nav,
  warehouseId,
  role,
  data,
}: BuildSidebarNavArgs): BuiltNavItem[] {
  return nav
    .map((item) =>
      buildNavItem({
        item,
        warehouseId,
        role,
        data,
      }),
    )
    .filter(Boolean) as BuiltNavItem[];
}

function buildNavItem({
  item,
  warehouseId,
  role,
  data,
}: BuildItemArgs): BuiltNavItem | null {
  /* ---------------- ROLE FILTER (UX ONLY) ---------------- */
  if (item.allowedRoles && !item.allowedRoles.includes(role)) {
    return null;
  }

  /* ---------------- PERMISSION FILTER ---------------- */
  if (item.permissions && item.permissions.length > 0) {
    if (!hasPermission(item.permissions, warehouseId, data.permissions)) {
      return null;
    }
  }

  /* ---------------- GROUP ITEM ---------------- */
  if (item.children && "children" in item) {
    const children = item.children
      .map((child) =>
        buildNavItem({
          item: child,
          warehouseId,
          role,
          data,
        }),
      )
      .filter(Boolean) as BuiltNavItem[];

    // hide empty groups
    if (children.length === 0) return null;

    return {
      id: item.id,
      title: item.title,
      icon: item.icon,
      isActive: false, // handled later
      children,
    };
  }

  /* ---------------- LEAF ITEM ---------------- */

  return {
    id: item.id,
    title: item.title,
    icon: item.icon,
    url: item.url,
    isActive: false, // handled later
  };
}
