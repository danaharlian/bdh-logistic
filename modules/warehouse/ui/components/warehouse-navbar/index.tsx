import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavbarBreadcrumb } from "@/modules/warehouse/ui/components/warehouse-navbar/navbar-breadcrumb";

export const WarehouseNavbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <NavbarBreadcrumb />
      </div>
    </header>
  );
};
