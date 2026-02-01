import { UserSessionServer } from "@/lib/auth";

export type PolicyContext = {
  user: UserSessionServer;
  warehouseId: string;
};

export type Policy = (ctx: PolicyContext) => void;

export type PolicyMeta = {
  label: string;
  route?: string;
  parent?: string;
  sidebar?: boolean;
  breadcrumb?: boolean;
  icon?: string;
};

export type PolicyWithMeta = Policy & {
  meta?: PolicyMeta;
};
