import { requireSuperAdmin } from "@/lib/auth/guards";

const Page = async () => {
  const user = await requireSuperAdmin();

  return (
    <div>
      admin dashboard
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Page;
