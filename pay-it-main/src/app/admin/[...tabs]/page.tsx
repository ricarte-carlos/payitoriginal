import { getUserAuth } from "@/lib/auth/utils";
import { CMS } from "../components/cms-components/carousel/cms";

type PageProps = { params: { tabs: string[] } };

export default async function Page({ params }: PageProps) {
  const { session } = await getUserAuth();

  return (
    <div>
      <CMS userId={session?.user.id || ""} params={params} />
    </div>
  );
}
