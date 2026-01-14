import { redirect } from "next/navigation";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
import { getCurrentUser } from "@/lib/server";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
