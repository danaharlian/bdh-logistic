"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { BuiltNavItem } from "@/lib/navigation/navigation-config";
import { getIcon } from "@/lib/navigation/icon-map";

type Props = {
  items: BuiltNavItem[];
};

export const NavMain = ({ items }: Props) => {
  // const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = getIcon(item.icon!);
          // const isActive =
          //   pathname === item.href || pathname.startsWith(item.href + "/");
          // const hasActiveChild = item.children?.some(
          //   (subItem) =>
          //     pathname === subItem.href ||
          //     pathname.startsWith(subItem.href + "/")
          // );
          return (
            <Collapsible
              key={item.id}
              asChild
              defaultOpen={item.isActive}
              // defaultOpen={item.isActive || isActive || hasActiveChild}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={item.isActive}
                >
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.label}</span>
                    {/* {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )} */}
                  </Link>
                </SidebarMenuButton>
                {item.children?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((subItem) => {
                          // const isSubActive =
                          //   pathname === subItem.href ||
                          //   pathname.startsWith(subItem.href + "/");

                          return (
                            <SidebarMenuSubItem key={subItem.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                              >
                                <Link href={subItem.href}>
                                  <span>{subItem.label}</span>
                                  {/* {subItem.badge && (
                                    <SidebarMenuBadge>
                                      {subItem.badge}
                                    </SidebarMenuBadge>
                                  )} */}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
