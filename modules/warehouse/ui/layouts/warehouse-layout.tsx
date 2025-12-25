import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const WarehouseLayout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <WarehouseSidebar />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
