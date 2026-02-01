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
}>;

const Layout = async ({ children }: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await authorize("admin.super");

  const items = await filterSidebar(sidebarConfig);

  return (
    <SidebarProvider>
      <WarehouseSidebar user={user} items={items} />
      <SidebarInset>
        <WarehouseNavbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
