import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { permissionService, permissionQueries } from "@/lib/rbac";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: "bdh-logistic",
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
      const permissions = permissionService.getUserWarehousePermissions(roles);
      const isSuperAdmin = roles.some(
        ({ role }) => role.roleType === "SUPER_ADMIN"
      );

      return {
        session,
        user: {
          ...user,
          isSuperAdmin,
          permissions,
        },
      };
    }),
  ],
  trustedOrigins: ["http://localhost:3000"],
});
