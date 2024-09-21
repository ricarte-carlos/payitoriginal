import { getUserAuth } from "@/lib/auth/utils";

import { redirect } from "next/navigation";
import { Blog } from "./components/blog/blog";
import { SignUp } from "./components/sign-up/sign-up";

export default async function Admin() {
  const { session } = await getUserAuth();
  if (!session) redirect("/admin/sign-in");

  return (
    <main>
      <SignUp
        className="data-[visible=false]:hidden"
        data-visible={session?.user.role === "Ascent_Admin"}
      />
      <Blog
        className="data-[visible=false]:hidden"
        data-visible={session?.user.role !== "Ascent_Admin"}
      />
    </main>
  );
}
