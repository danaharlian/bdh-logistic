import {
  PermissionAction,
  PermissionModule,
} from "@/lib/generated/prisma/enums";
import { createPermissionKey } from "@/lib/rbac";
import { NavItem } from "@/lib/navigation/navigation-types";

/**
 * GLOBAL NAVIGATION (no warehouse)
 */
export const GLOBAL_NAV: NavItem[] = [
  {
    id: "superadmin-dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: "LayoutDashboard",
    allowedRoles: ["SUPER_ADMIN"],
  },
  {
    id: "superadmin-master-data",
    title: "Master Data",
    icon: "Blocks",
    allowedRoles: ["SUPER_ADMIN"],
    children: [
      {
        id: "superadmin-items",
        title: "Items",
        url: "/master-data/items",
      },
      {
        id: "categories",
        title: "Categories",
        url: "/master-data/categories",
      },
    ],
  },
  {
    id: "helper-staff-requests",
    title: "My Requests",
    url: "/requests",
    icon: "ClipboardList",
    allowedRoles: ["STAF_RUANGAN"],
  },
];

/**
 * WAREHOUSE SCOPED NAVIGATION
 */
export const WAREHOUSE_NAV: NavItem[] = [
  {
    id: "admin-warehouse-dashboard",
    title: "Dashboard",
    url: "/w/:warehouseId/admin/dashboard",
    icon: "LayoutDashboard",
    requiresWarehouse: true,
    permissions: [
      createPermissionKey(PermissionModule.DASHBOARD, PermissionAction.VIEW),
    ],
    allowedRoles: ["ADMIN_GUDANG", "SUPER_ADMIN"],
  },
  {
    id: "procurement-staff-dashboard",
    title: "Dashboard",
    icon: "ShoppingCart",
    url: "/w/:warehouseId/procurement/dashboard",
    requiresWarehouse: true,
    permissions: [
      createPermissionKey(PermissionModule.PROCUREMENT, PermissionAction.VIEW),
    ],
    allowedRoles: ["STAF_PENGADAAN", "SUPER_ADMIN"],
  },
];
