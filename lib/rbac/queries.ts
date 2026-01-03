import { prisma } from "@/lib/prisma";
import { UserWarehouseRoleWithPermissions } from "./types";

export const permissionQueries = {
  /**
   * Fetches all user warehouse roles with their permissions
   * @param userId - User ID to fetch roles for
   * @returns Array of user warehouse roles with nested permissions
   */
  getUserWarehouseRoles: async (
    userId: string
  ): Promise<UserWarehouseRoleWithPermissions[]> => {
    return prisma.userWarehouseRole.findMany({
      where: { userId },
      include: {
        warehouse: { select: { id: true } },
        role: {
          select: {
            roleType: true,
            rolePermissions: {
              select: {
                permission: { select: { module: true, action: true } },
              },
            },
          },
        },
      },
    });
  },
};
