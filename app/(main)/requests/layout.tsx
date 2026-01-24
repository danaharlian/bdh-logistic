import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { requireRoomStaff } from "@/lib/auth/guards";
import { buildSidebarNavigation } from "@/lib/navigation/build-sidebar";
import { GLOBAL_NAV } from "@/lib/navigation/navigation";
import { RoleType } from "@/lib/generated/prisma/enums";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RoomStaffLayout({ children }: Props) {
  const user = await requireRoomStaff();

  const filtered = buildSidebarNavigation({
    nav: GLOBAL_NAV,
    warehouseId: undefined,
    data: {
      permissions: user.permissions,
      warehouseRoles: user.warehouseRoles,
    },
    role: RoleType.STAF_RUANGAN,
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
