import { requireWarehouseAdmin } from "@/lib/auth/guards";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

const Layout = async ({ children, params }: Props) => {
  const { warehouseId } = await params;

  await requireWarehouseAdmin(warehouseId);

  return <>{children}</>;
};

export default Layout;
