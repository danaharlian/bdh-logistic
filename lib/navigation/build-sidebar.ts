import { policies, type PolicyKey } from "@/lib/policies";
import { authorize } from "@/lib/auth/authorize";
import { resolveRoute, isActivePath } from "./route-utils";

export type SidebarItem = {
  id: string;
  title: string;
  icon?: string;
  url?: string;
  isActive: boolean;
  children?: SidebarItem[];
};

export async function buildSidebar({
  warehouseId,
  pathname,
}: {
  warehouseId: string;
  pathname: string;
}): Promise<SidebarItem[]> {
  const map = new Map<string, SidebarItem>();
  const roots: SidebarItem[] = [];

  // 1️⃣ create nodes
  for (const [key, policy] of Object.entries(policies)) {
    const meta = policy.meta;
    if (!meta?.sidebar) continue;

    const allowed = await authorize(key as PolicyKey, {
      warehouseId,
      silent: true,
    });
    if (!allowed) continue;

    const url = meta.route ? resolveRoute(meta.route, warehouseId) : undefined;

    map.set(key, {
      id: key,
      title: meta.label,
      icon: meta.icon,
      url,
      isActive: url ? isActivePath(pathname, url) : false,
      children: [],
    });
  }

  // 2️⃣ link parent → child
  for (const [key, policy] of Object.entries(policies)) {
    const parentId = policy.meta?.parent;
    if (!parentId) continue;

    const child = map.get(key);
    const parent = map.get(parentId);

    if (child && parent) {
      parent.children!.push(child);
    }
  }

  // 3️⃣ finalize roots & bubble active
  for (const item of map.values()) {
    if (item.children && item.children.length > 0) {
      item.isActive = item.children.some((c) => c.isActive);
      item.url = undefined; // parent no href
    }

    const hasParent = Object.values(policies).some(
      (p) => p.meta?.parent === item.id
    );

    if (!hasParent) roots.push(item);
  }

  return roots;
}
