import { requireWarehouseAdmin } from "@/lib/auth/guards";
import { can } from "@/lib/rbac";

type Props = {
  params: Promise<{ warehouseId: string }>;
};

const Page = async ({ params }: Props) => {
  const { warehouseId } = await params;
  const user = await requireWarehouseAdmin(warehouseId);

  const canCreateItem = can(user.permissions, warehouseId, "ITEM", "CREATE");
  const canApproveRequest = can(
    user.permissions,
    warehouseId,
    "REQUEST",
    "APPROVE"
  );

  return (
    <div>
      Warehouses Id {warehouseId}
      <h1>Dashboard untuk Admin Gudang</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {canCreateItem && <div>You can create and manage items</div>}
      {canApproveRequest && <div>You can approve/reject requests</div>}
    </div>
  );
};

export default Page;
