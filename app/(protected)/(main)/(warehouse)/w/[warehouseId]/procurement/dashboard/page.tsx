type Props = {
  params: Promise<{ warehouseId: string }>;
};

const Page = async ({ params }: Props) => {
  const { warehouseId } = await params;
  return (
    <div>
      Warehouses Id {warehouseId}
      <h1>Dashboard untuk Staf Pengadaan</h1>
    </div>
  );
};

export default Page;
