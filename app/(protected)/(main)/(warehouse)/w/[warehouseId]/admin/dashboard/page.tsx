type Props = {
  params: Promise<{ warehouseId: string }>;
};

const Page = async ({ params }: Props) => {
  const { warehouseId } = await params;
  return (
    <div>
      Warehouses Id {warehouseId}
      <h1>Dashboard untuk Admin Gudang</h1>
    </div>
  );
};

export default Page;
