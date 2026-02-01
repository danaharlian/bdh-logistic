export function resolveRoute(route: string, warehouseId: string) {
  return route.replace("[id]", warehouseId);
}

export function isActivePath(pathname: string, target: string) {
  return pathname === target || pathname.startsWith(target + "/");
}
