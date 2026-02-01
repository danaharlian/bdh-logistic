import { authorize } from "@/lib/auth/authorize";
import type { SidebarItem } from "@/lib/navigation/sidebar.types";

export async function filterSidebar(
  items: SidebarItem[],
  warehouseId?: string,
): Promise<SidebarItem[]> {
  const result: SidebarItem[] = [];

  for (const item of items) {
    const allowed = item.policy
      ? await authorize(item.policy, {
          warehouseId,
          silent: true,
        })
      : true;

    if (!allowed) continue;

    if ("children" in item && item.children) {
      const children = await filterSidebar(item.children, warehouseId);

      if (children.length === 0) continue;

      result.push({
        ...item,
        children,
      });
    } else {
      result.push({
        ...item,
        url:
          item.url && warehouseId ? buildUrl(item.url, warehouseId) : item.url,
      });
    }
  }

  return result;
}

function resolveUrl(url: string, warehouseId: string): string {
  if (!url.includes(":warehouseId")) return url;

  if (!warehouseId) {
    throw new Error(`warehouseId required for href: ${url}`);
  }

  return url.replace(":warehouseId", warehouseId);
}

function buildUrl(url: string, warehouseId: string): string {
  return resolveUrl(url, warehouseId);
}
