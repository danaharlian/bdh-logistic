import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const WarehouseWrapper = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
  );
};
