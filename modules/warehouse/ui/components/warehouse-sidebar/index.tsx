"use client";

import * as React from "react";
import { Hospital } from "lucide-react";
import { NavMain } from "@/modules/warehouse/ui/components/warehouse-sidebar/nav-main";
// import { NavProjects } from "@/modules/warehouse/ui/components/warehouse-sidebar/nav-projects";
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
import { BuiltNavItem } from "@/lib/navigation/navigation-config";

type Props = {
  user: UserSessionServer;
  navigation: BuiltNavItem[];
} & React.ComponentProps<typeof Sidebar>;

// const data = {
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// };

export const WarehouseSidebar = ({ user, navigation, ...props }: Props) => {
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
        <NavMain items={navigation} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
