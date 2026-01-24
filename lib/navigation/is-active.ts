/**
 * Determine active state for sidebar item
 */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}
