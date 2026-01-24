import { BuiltNavItem } from "./navigation-types";

type AdapterArgs = {
  items: BuiltNavItem[];
  pathname: string;
};

/**
 * Adapter for UI state:
 * - mark active item
 * - auto expand parents
 */
export function adapterSidebarNav({
  items,
  pathname,
}: AdapterArgs): BuiltNavItem[] {
  return items.map((item) => adaptItem(item, pathname));
}

function adaptItem(item: BuiltNavItem, pathname: string): BuiltNavItem {
  const normalizedPath = normalize(pathname);

  const isSelfActive =
    item.url !== undefined &&
    (normalizedPath === normalize(item.url) ||
      normalizedPath.startsWith(normalize(item.url) + "/"));

  let children: BuiltNavItem[] | undefined;

  if (item.children && item.children.length) {
    children = item.children.map((child) => adaptItem(child, pathname));
  }

  const isActive = isSelfActive || children?.some((c) => c.isActive) || false;

  return {
    ...item,
    isActive,
    children,
  };
}

function normalize(path: string): string {
  return path.replace(/\/+$/, "");
}
