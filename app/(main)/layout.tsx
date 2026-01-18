import { WarehouseWrapper } from "@/modules/warehouse/ui/components/warehouse-wrapper";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props) => {
  return <WarehouseWrapper>{children}</WarehouseWrapper>;
};

export default Layout;
