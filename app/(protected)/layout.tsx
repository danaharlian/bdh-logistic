import { WarehouseLayout } from "@/modules/warehouse/ui/layouts/warehouse-layout";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props) => {
  return <WarehouseLayout>{children}</WarehouseLayout>;
};

export default Layout;
