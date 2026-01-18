import { PermissionAction, PermissionModule } from "../generated/prisma/enums";
import { createPermissionKey } from "../rbac";
import { NavItem } from "./navigation-config";

/**
 * GLOBAL NAVIGATION (no warehouse)
 */
export const GLOBAL_NAV: NavItem[] = [
  {
    id: "superadmin-dashboard",
    label: "Dashboard",
    href: () => "/dashboard",
    icon: "LayoutDashboard",
    allowedRoles: ["SUPER_ADMIN"],
  },
  {
    id: "superadmin-master-data",
    label: "Master Data",
    href: () => '/master-data',
    icon: "Blocks",
    allowedRoles: ["SUPER_ADMIN"],
    children: [
      {
        id: "superadmin-items",
        label: "Items",
        href: () => '/master-data/items',
      },
      {
        id: "categories",
        label: "Categories",
        href: () => '/master-data/categories',
      },
    ],
  },
  {
    id: "helper-staff-requests",
    label: "My Requests",
    href: () => "/requests",
    icon: "ClipboardList",
    allowedRoles: ["STAF_RUANGAN"],
  },
  {
    id: "profile",
    label: "My Profile",
    href: () => "/profile",
    icon: "Users",
    allowedRoles: ["SUPER_ADMIN", "STAF_PENGADAAN", "STAF_RUANGAN"],
  },
];

/**
 * WAREHOUSE SCOPED NAVIGATION
 */
export const WAREHOUSE_NAV: NavItem[] = [
  {
    id: "admin-warehouse-dashboard",
    label: "Dashboard",
    href: (warehouseId) => `/w/${warehouseId}/admin/dashboard`,
    icon: "LayoutDashboard",
    permissions: [
      createPermissionKey(PermissionModule.DASHBOARD, PermissionAction.VIEW),
    ],
    allowedRoles: ["ADMIN_GUDANG", "SUPER_ADMIN"],
  },
  {
    id: "procurement-staff-dashboard",
    label: "Dashboard",
    icon: "ShoppingCart",
    href: (warehouseId) => `/w/${warehouseId}/procurement/dashboard`,
    permissions: [
      createPermissionKey(PermissionModule.PROCUREMENT, PermissionAction.VIEW),
    ],
    allowedRoles: ["STAF_PENGADAAN", "SUPER_ADMIN"],
  },
];
