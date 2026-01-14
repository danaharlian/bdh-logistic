import { requireRoomStaff } from "@/lib/auth/guards";

const Page = async () => {
  const user = await requireRoomStaff();

  return (
    <div>
      Staff Request Page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Page;
