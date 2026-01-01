import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { permissionService } from "@/lib/rbac/permission-service";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
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
      const roles = await prisma.userWarehouseRole.findMany({
        where: { userId: user.id },
        include: {
          warehouse: true,
          role: {
            include: {
              rolePermissions: {
                include: { permission: true },
              },
            },
          },
        },
      });

      const permissions = permissionService.getUserWarehousePermissions(roles);

      return {
        session,
        user: {
          ...user,
          permissions,
        },
      };
    }),
  ],
  trustedOrigins: ["http://localhost:3000"],
});
