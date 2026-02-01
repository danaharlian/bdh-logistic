import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { authorize } from "@/lib/auth/authorize";
import { filterSidebar } from "@/lib/navigation/filter-sidebar";
import { sidebarConfig } from "@/lib/navigation/sidebar.config";
import { getCurrentUser } from "@/lib/server";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

export default async function ProcurementLayout({ children, params }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { warehouseId } = await params;

  await authorize("procurement.dashboard", {
    warehouseId,
  });

  const items = await filterSidebar(sidebarConfig, warehouseId);

  return (
    <SidebarProvider>
      <WarehouseSidebar user={user} items={items} />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
