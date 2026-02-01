import { getCurrentUser } from "@/lib/server";
import { policies } from "@/lib/policies";

type AuthorizeOptions = {
  warehouseId?: string;
  silent?: boolean;
};

export async function authorize(
  policyKey: keyof typeof policies,
  options: AuthorizeOptions = {}
): Promise<boolean | void> {
  const user = await getCurrentUser();
  const policy = policies[policyKey];

  if (!user || !policy) {
    if (options.silent) return false;
    throw new Error("Unauthorized");
  }
  // if (!user) throw new Error("User not authenticated");
  // if (!policy) throw new Error(`Policy ${policyKey} not found`);

  try {
    policy({
      user,
      warehouseId: options.warehouseId ?? "",
    });
    return options.silent ? true : undefined;
  } catch {
    if (options.silent) return false;
    throw new Error("Unauthorized");
  }
}
