import { definePolicy } from "@/lib/policies/define.policy";

export const roomStaffPolicies = {
  dashboard: definePolicy({
    roles: ["STAF_RUANGAN"],
  }),
};
