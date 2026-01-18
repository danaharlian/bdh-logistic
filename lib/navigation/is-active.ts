/**
 * Determine active state for sidebar item
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (pathname.startsWith(href + "/")) return true;
  return false;
}
