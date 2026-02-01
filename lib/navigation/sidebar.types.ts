import type { policies } from "@/lib/policies";
import type { IconName } from "@/lib/navigation/icon-map";

type BaseItem = {
  id: string;
  title: string;
  icon: IconName;
  policy?: keyof typeof policies;
};

export type SidebarLinkItem = BaseItem & {
  url: string;
  children?: never;
};

export type SidebarGroupItem = BaseItem & {
  url?: never;
  children: SidebarItem[];
};

export type SidebarItem = SidebarLinkItem | SidebarGroupItem;

export type SidebarItem2 = {
  id: string;
  title: string;
  icon?: string;
  url?: string;
  isActive: boolean;
  children?: SidebarItem[];
};
