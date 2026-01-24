import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { buildSidebarNav } from "@/lib/navigation/build-sidebar";
import { GLOBAL_NAV } from "@/lib/navigation/navigation";
import { RoleType } from "@/lib/generated/prisma/enums";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function SuperAdminLayout({ children }: Props) {
  const user = await requireSuperAdmin();

  const filtered = buildSidebarNav({
    nav: GLOBAL_NAV,
    warehouseId: undefined,
    data: {
      permissions: user.permissions,
      warehouseRoles: user.warehouseRoles,
    },
    role: RoleType.SUPER_ADMIN,
  });

  return (
    <SidebarProvider>
      <WarehouseSidebar user={user} navigation={filtered} />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
