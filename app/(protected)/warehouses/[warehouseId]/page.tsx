type Props = {
  params: Promise<{ warehouseId: string }>;
};

const Page = async ({ params }: Props) => {
  const { warehouseId } = await params;
  return <div>Warehouses Id {warehouseId}</div>;
};

export default Page;
