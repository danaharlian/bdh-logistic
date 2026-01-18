import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { buildSidebarNav } from "@/lib/navigation/build-sidebar";
import { adapterSidebarNav } from "@/lib/navigation/adapter-sidebar";
import { GLOBAL_NAV } from "@/lib/navigation/navigation";
import { RoleType } from "@/lib/generated/prisma/enums";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function SuperAdminLayout({ children }: Props) {
  const user = await requireSuperAdmin();

  const pathname = "/dashboard";

  const filtered = buildSidebarNav({
    nav: GLOBAL_NAV,
    warehouseId: undefined,
    data: {
      permissions: user.permissions,
      warehouseRoles: user.warehouseRoles,
    },
    role: RoleType.SUPER_ADMIN,
  });

  const sidebarItems = adapterSidebarNav({
    items: filtered,
    pathname,
  });

  return (
    <SidebarProvider>
      <WarehouseSidebar user={user} navigation={sidebarItems} />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
