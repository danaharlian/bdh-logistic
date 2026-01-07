import { getCurrentUser } from "@/lib/server";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      Haaaiii from dashboard
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Page;
