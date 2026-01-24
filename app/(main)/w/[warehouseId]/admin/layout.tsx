import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { requireWarehouseAdmin } from "@/lib/auth/guards";
import { buildSidebarNav } from "@/lib/navigation/build-sidebar";
import { WAREHOUSE_NAV } from "@/lib/navigation/navigation";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

const Layout = async ({ children, params }: Props) => {
  const { warehouseId } = await params;

  const user = await requireWarehouseAdmin(warehouseId);

  const role = user.warehouseRoles[warehouseId];

  const filteredNav = buildSidebarNav({
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
};

export default Layout;
