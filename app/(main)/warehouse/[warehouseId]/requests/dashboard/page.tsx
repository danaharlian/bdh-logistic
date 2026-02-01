import { getCurrentUser } from "@/lib/server";

async function RoomStaffage() {
  const user = await getCurrentUser();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

export default RoomStaffage;
