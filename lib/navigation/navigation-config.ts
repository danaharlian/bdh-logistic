import { RoleType } from "../generated/prisma/enums";
import { PermissionKey } from "../rbac";
import { IconName } from "./icon-map";

export type NavItem = {
  id: string;
  label: string;
  href: (warehouseId?: string) => string;
  icon?: IconName;
  requiresWarehouse?: boolean;

  /**
   * The menu appears if at least one of these permissions is present.
   */
  permissions?: PermissionKey[];

  /**
   * Role-specific menu (UX only)
   * ("SUPER_ADMIN" | "ADMIN_GUDANG" | "STAF_PENGADAAN" | "STAF_RUANGAN") etc.
   */
  allowedRoles?: RoleType[];

  /**
   * For sub nav
   */
  children?: NavItem[];
};

export type BuiltNavItem = {
  id: string;
  label: string;
  href: string;
  icon?: IconName;
  isActive: boolean;
  children?: BuiltNavItem[];
};
