import { policies } from "@/lib/policies";

export type PolicyNode = {
  id: string;
  label: string;
  route?: string;
  parent?: string;
  icon?: string;
};

export function buildPolicyNodeMap(): Map<string, PolicyNode> {
  const map = new Map<string, PolicyNode>();

  for (const [id, policy] of Object.entries(policies)) {
    const meta = policy.meta;
    if (!meta?.label) continue;

    map.set(id, {
      id,
      label: meta.label,
      route: meta.route,
      parent: meta.parent,
      icon: meta.icon,
    });
  }

  return map;
}
