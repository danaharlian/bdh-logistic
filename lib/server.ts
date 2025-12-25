import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getSession = cache(async () => {
  const headersList = await headers();
  return await auth.api.getSession({
    headers: headersList,
  });
});
