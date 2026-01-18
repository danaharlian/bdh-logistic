import type { NavItem, BuiltNavItem } from "./navigation-config";
import { isActivePath } from "./is-active";

export function adapterSidebarNav({
  items,
  warehouseId,
  pathname,
}: {
  items: NavItem[];
  warehouseId?: string;
  pathname: string;
}): BuiltNavItem[] {
  return items.map((item) => {
    const href = item.href(warehouseId);
    const selfActive = isActivePath(pathname, href);

    const children = item.children
    ? adapterSidebarNav({
        items: item.children,
        warehouseId,
        pathname,
      })
    : undefined;


    // Parent active if one of the children is active
    const childActive =
      children?.some(
        (c) => c.isActive || c.children?.some(cc => cc.isActive)
      ) ?? false;

    return {
      id: item.id,
      label: item.label,
      icon: item.icon,
      href,
      isActive: selfActive || childActive,
      children
    };
  });
}
