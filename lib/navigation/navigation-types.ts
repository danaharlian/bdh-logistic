import { RoleType } from "@/lib/generated/prisma/enums";
import { IconName } from "@/lib/navigation/icon-map";
import { PermissionKey } from "@/lib/rbac";

/**
 * Base properties shared by all nav items
 */
type NavItemBase = {
  id: string;
  title: string;
  icon?: IconName;

  /**
   * Explicit scope marker (optional but recommended)
   */
  requiresWarehouse?: boolean;

  /**
   * Role-specific menu (UX only)
   */
  allowedRoles?: RoleType[];

  /**
   * Permission-based visibility
   */
  permissions?: PermissionKey[];
};

/**
 * Leaf nav (clickable)
 * ✅ has url
 * ❌ no children
 */
export type NavLeafItem = NavItemBase & {
  url: string;
  children?: never;
};

/**
 * Parent nav (group)
 * ✅ has children
 * ❌ no url
 */
export type NavGroupItem = NavItemBase & {
  children: NavItem[];
  url?: never;
};

/**
 * Final NavItem type
 */
export type NavItem = NavLeafItem | NavGroupItem;

/**
 * Built item for sidebar rendering
 */
export type BuiltNavItem = {
  id: string;
  title: string;
  url?: string;
  icon?: IconName;
  isActive: boolean;
  children?: BuiltNavItem[];
};
