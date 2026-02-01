import type { SidebarItem } from "@/lib/navigation/sidebar.types";

export const sidebarConfig: SidebarItem[] = [
  {
    id: "superadmin-dashboard",
    title: "Dashboard",
    icon: "LayoutDashboard",
    url: "/",
    policy: "admin.super",
  },
  {
    id: "superadmin-master-data",
    title: "Master Data",
    icon: "Blocks",
    children: [
      {
        id: "master-data-items",
        title: "Items",
        url: "/superadmin/master-data/items",
        icon: "Archive",
        policy: "admin.super",
      },
      {
        id: "master-data-categories",
        title: "Categories",
        url: "/superadmin/master-data/categories",
        icon: "Archive",
        policy: "admin.super",
      },
    ],
  },
  {
    id: "admin-warehouse-dashboard",
    title: "Dashboard",
    icon: "LayoutDashboard",
    url: "/warehouse/:warehouseId/admin/dashboard",
    policy: "admin.admin",
  },
  {
    id: "procurement-dashboard",
    title: "Dashboard",
    icon: "LayoutDashboard",
    url: "/warehouse/:warehouseId/procurement/dashboard",
    policy: "procurement.dashboard",
  },
  {
    id: "room-dashboard",
    title: "Dashboard",
    icon: "LayoutDashboard",
    url: "/warehouse/:warehouseId/requests/dashboard",
    policy: "room.dashboard",
  },
];
