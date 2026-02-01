import { PolicyNode } from "./policy-node";
import { resolveRoute } from "./route-utils";

export type BreadcrumbItem = {
  title: string;
  href?: string;
};

export function buildBreadcrumb({
  pathname,
  warehouseId,
  nodes,
}: {
  pathname: string;
  warehouseId: string;
  nodes: Map<string, PolicyNode>;
}): BreadcrumbItem[] {
  const normalize = (p: string) => p.replace(/\/$/, "");

  let active: PolicyNode | undefined;

  for (const node of nodes.values()) {
    if (!node.route) continue;
    const resolved = normalize(resolveRoute(node.route, warehouseId));
    if (
      normalize(pathname) === resolved ||
      normalize(pathname).startsWith(resolved + "/")
    ) {
      active = node;
      break;
    }
  }

  if (!active) return [];

  const trail: BreadcrumbItem[] = [];
  let current: PolicyNode | undefined = active;

  while (current) {
    trail.unshift({
      title: current.label,
      href: current.route
        ? resolveRoute(current.route, warehouseId)
        : undefined,
    });
    current = current.parent ? nodes.get(current.parent) : undefined;
  }

  return trail;
}
