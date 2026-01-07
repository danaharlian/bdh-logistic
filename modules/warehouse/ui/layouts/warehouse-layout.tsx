import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WarehouseNavbar } from "@/modules/warehouse/ui/components/warehouse-navbar";
import { WarehouseSidebar } from "@/modules/warehouse/ui/components/warehouse-sidebar";
import { getCurrentUser } from "@/lib/server";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const WarehouseLayout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

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
