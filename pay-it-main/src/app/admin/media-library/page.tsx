import { MediaLibraryList } from "@/app/admin/components/cms-components/content-library/media-library-list";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await getUserAuth();
  if (!session) redirect("/");
  return (
    <div>
      <MediaLibraryList />
    </div>
  );
}
