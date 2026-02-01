import type { PolicyWithMeta } from "@/lib/policies/types";
import { adminPolicies } from "@/lib/policies/admin.policy";
import { procurementPolicies } from "@/lib/policies/procurement.policy";
import { roomStaffPolicies } from "@/lib/policies/room-staff.policy";

const policiesObj = {
  /**
   * policy for Superadmin
   */
  "admin.super": adminPolicies.super,
  /**
   * Policy for Admin gudang
   * Admin Gudang : Manajemen, Gizi, Sanitasi
   */
  "admin.admin": adminPolicies.admin,
  /**
   * Policy for Staff Pengadaan
   */
  "procurement.dashboard": procurementPolicies.dashboard,
  /**
   * Policy for Staff Ruangan
   */
  "room.dashboard": roomStaffPolicies.dashboard,
} as const;

export type PolicyKey = keyof typeof policiesObj;
export const policies: Record<PolicyKey, PolicyWithMeta> = policiesObj;
