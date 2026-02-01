import type { SidebarItem } from "@/lib/navigation/sidebar.types";

export function isItemActive(item: SidebarItem, pathname: string): boolean {
  if (item.url && "url" in item) {
    return pathname.startsWith(item.url.replace("[id]", ""));
  }

  return item.children?.some((child) => isItemActive(child, pathname)) ?? false;
}
