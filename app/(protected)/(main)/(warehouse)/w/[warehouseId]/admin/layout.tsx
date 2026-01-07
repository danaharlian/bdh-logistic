import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server";
import { hasRoleInWarehouse } from "@/lib/auth/role-guard";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

const Layout = async ({ children, params }: Props) => {
  const user = await getCurrentUser();
  const { warehouseId } = await params;

  if (!user) {
    redirect("/login");
  }

  if (user.isSuperAdmin) {
    return <>{children}</>;
  }

  const isAdminWarehouse = hasRoleInWarehouse(
    user.warehouseRoles,
    warehouseId,
    "ADMIN_GUDANG"
  );

  if (!user.warehouseRoles[warehouseId] || !isAdminWarehouse) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
};

export default Layout;
