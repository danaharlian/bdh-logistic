"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Hospital } from "lucide-react";
import { NavMain } from "@/modules/warehouse/ui/components/warehouse-sidebar/nav-main";
import { NavUser } from "@/modules/warehouse/ui/components/warehouse-sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserSessionServer } from "@/lib/auth";
import { markActiveSidebarItems } from "@/lib/navigation/adapter-sidebar";
import { BuiltNavItem } from "@/lib/navigation/navigation-types";

type Props = {
  user: UserSessionServer;
  navigation: BuiltNavItem[];
} & React.ComponentProps<typeof Sidebar>;

export const WarehouseSidebar = ({ user, navigation, ...props }: Props) => {
  const pathname = usePathname();

  const sidebarItems = markActiveSidebarItems({
    items: navigation,
    pathname,
  });

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Hospital className="size-auto" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gudang Manajemen</span>
                  <span className="truncate text-xs">
                    RSUD BHAKTI DHARMA HUSADA
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
