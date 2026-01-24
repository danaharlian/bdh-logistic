import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { requireProcurementStaff } from "@/lib/auth/guards";
import { buildSidebarNavigation } from "@/lib/navigation/build-sidebar";
import { WAREHOUSE_NAV } from "@/lib/navigation/navigation";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

export default async function ProcurementLayout({ children, params }: Props) {
  const { warehouseId } = await params;

  const user = await requireProcurementStaff(warehouseId);

  const role = user.warehouseRoles[warehouseId];

  const filteredNav = buildSidebarNavigation({
    nav: WAREHOUSE_NAV,
    warehouseId,
    data: {
      permissions: user.permissions,
      warehouseRoles: user.warehouseRoles,
    },
    role,
  });

  return (
    <SidebarProvider>
      <WarehouseSidebar user={user} navigation={filteredNav} />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
