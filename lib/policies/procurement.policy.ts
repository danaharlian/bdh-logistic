import { definePolicy } from "@/lib/policies/define.policy";

export const procurementPolicies = {
  dashboard: definePolicy({
    roles: ["STAF_PENGADAAN"],
  }),
};
