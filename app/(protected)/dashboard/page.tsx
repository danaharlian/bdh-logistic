import { getSession } from "@/lib/server";

const Page = async () => {
  const session = await getSession();

  return (
    <div>
      Haaaiii from dashboard
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Page;
