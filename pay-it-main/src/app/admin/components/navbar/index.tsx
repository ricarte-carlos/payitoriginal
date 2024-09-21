import { getUserAuth } from "@/lib/auth/utils";
import { ContentManager } from "./content-manager";
import { NavbarAdmin } from "./navbar-admin";

export async function AdminNavigation() {
  const { session } = await getUserAuth();

  if (!session) return null;

  return (
    <div className="sticky flex">
      <NavbarAdmin session={session} />
      <ContentManager />
    </div>
  );
}
