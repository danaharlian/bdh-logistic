import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { permissionQueries, permissionService } from "@/lib/rbac";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: "bdh_logistic",
  },
  user: {
    additionalFields: {
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    customSession(async ({ session, user }) => {
      const roles = await permissionQueries.getUserWarehouseRoles(user.id);

      // Get permissions and warehouse roles in a single pass
      const { permissions, warehouseRoles } =
        permissionService.getUserWarehouseData(roles);

      // Check for super admin
      const isSuperAdmin = roles.some(
        ({ role }) => role.roleType === "SUPER_ADMIN"
      );

      return {
        session,
        user: {
          ...user,
          isSuperAdmin,
          permissions,
          warehouseRoles,
        },
      };
    }),
  ],
  trustedOrigins: ["http://localhost:3000"],
});

export type SessionServer = typeof auth.$Infer.Session.session;
export type UserSessionServer = typeof auth.$Infer.Session.user;
