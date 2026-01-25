import { BuiltNavItem } from "@/lib/navigation/navigation-types";

type MarkActiveItemsArgs = {
  items: BuiltNavItem[];
  pathname: string;
};

/**
 * Normalizes a path by removing trailing slashes
 */
function normalizePath(path: string): string {
  return path.replace(/\/+$/, "");
}

/**
 * Checks if a pathname matches or is a child of the given href
 */
function isActivePath(pathname: string, url: string): boolean {
  const normalizedPathname = normalizePath(pathname);
  const normalizedUrl = normalizePath(url);
  return (
    normalizedPathname === normalizedUrl ||
    normalizedPathname.startsWith(normalizedUrl + "/")
  );
}

/**
 * Adapts sidebar navigation items by marking active items and auto-expanding parents
 */
export function markActiveSidebarItems({
  items,
  pathname,
}: MarkActiveItemsArgs): BuiltNavItem[] {
  return items.map((item) => adaptNavigationItem(item, pathname));
}

function adaptNavigationItem(
  item: BuiltNavItem,
  pathname: string,
): BuiltNavItem {
  const isSelfActive =
    item.url !== undefined && isActivePath(pathname, item.url);

  let children: BuiltNavItem[] | undefined;

  if (item.children && item.children.length) {
    children = item.children.map((child) =>
      adaptNavigationItem(child, pathname),
    );
  }

  const isActive = isSelfActive || children?.some((c) => c.isActive) || false;

  return {
    ...item,
    isActive,
    children,
  };
}
