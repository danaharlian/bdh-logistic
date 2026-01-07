import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server";
import { resolveHomeUrl } from "@/lib/auth/resolve-home-url";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const homeUrl = resolveHomeUrl(currentUser);

  /**
   * Redirect to url access
   */
  redirect(homeUrl);
};

export default Page;
