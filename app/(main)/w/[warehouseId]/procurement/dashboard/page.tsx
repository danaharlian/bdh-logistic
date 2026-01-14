import { requireProcurementStaff } from "@/lib/auth/guards";
import { can } from "@/lib/rbac";

type Props = {
  params: Promise<{ warehouseId: string }>;
};

const Page = async ({ params }: Props) => {
  const { warehouseId } = await params;
  const user = await requireProcurementStaff(warehouseId);

  const canCreateProcurement = can(
    user.permissions,
    warehouseId,
    "PROCUREMENT",
    "CREATE"
  );
  const canApproveProcurement = can(
    user.permissions,
    warehouseId,
    "PROCUREMENT",
    "APPROVE"
  );

  return (
    <div>
      Warehouses Id {warehouseId}
      <h1>Dashboard untuk Staf Pengadaan</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {canCreateProcurement && (
        <div> You can create new procurement requests</div>
      )}
      {canApproveProcurement && <div>You can approve procurement requests</div>}
    </div>
  );
};

export default Page;
