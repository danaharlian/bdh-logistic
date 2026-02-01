import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server";
import { redirectToHome } from "@/lib/auth/routing";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  /**
   * Redirect to url access
   */
  return redirectToHome(currentUser);
};

export default Page;
