import { RoleType } from "@/lib/generated/prisma/enums";
import { hasNavigationPermission, UserWarehouseData } from "@/lib/rbac";
import { BuiltNavItem, NavItem } from "@/lib/navigation/navigation-types";

/**
 * Input args for building sidebar navigation
 */
export type BuildSidebarNavigationArgs = {
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

type BuildNavigationItemArgs = {
  item: NavItem;
  warehouseId?: string;
  role: RoleType;
  data: BuildSidebarNavigationArgs["data"];
};

export function buildSidebarNavigation({
  nav,
  warehouseId,
  role,
  data,
}: BuildSidebarNavigationArgs): BuiltNavItem[] {
  return nav
    .map((item) =>
      buildNavigationItem({
        item,
        warehouseId,
        role,
        data,
      }),
    )
    .filter(Boolean) as BuiltNavItem[];
}

function buildNavigationItem({
  item,
  warehouseId,
  role,
  data,
}: BuildNavigationItemArgs): BuiltNavItem | null {
  /* ---------------- ROLE FILTER (UX ONLY) ---------------- */
  if (item.allowedRoles && !item.allowedRoles.includes(role)) {
    return null;
  }

  /* ---------------- PERMISSION FILTER ---------------- */
  if (item.permissions && item.permissions.length > 0) {
    if (
      !hasNavigationPermission(item.permissions, warehouseId, data.permissions)
    ) {
      return null;
    }
  }

  /* ---------------- GROUP ITEM ---------------- */
  if (item.children && "children" in item) {
    const children = item.children
      .map((child) =>
        buildNavigationItem({
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
      isActive: false,
      children,
    };
  }

  /* ---------------- LEAF ITEM ---------------- */

  return {
    id: item.id,
    title: item.title,
    icon: item.icon,
    url: item.url,
    isActive: false,
  };
}
