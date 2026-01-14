import { requireProcurementStaff } from "@/lib/auth/guards";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ warehouseId: string }>;
}>;

export default async function ProcurementLayout({ children, params }: Props) {
  const { warehouseId } = await params;

  await requireProcurementStaff(warehouseId);

  return <>{children}</>;
}
