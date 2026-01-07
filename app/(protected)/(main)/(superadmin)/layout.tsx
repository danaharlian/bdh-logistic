import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isSuperAdmin) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
};

export default Layout;
