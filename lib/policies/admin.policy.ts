import { definePolicy } from "@/lib/policies/define.policy";

export const adminPolicies = {
  super: definePolicy({
    roles: ["SUPER_ADMIN"],
  }),
  admin: definePolicy({
    roles: ["ADMIN_GUDANG"],
  }),
};
