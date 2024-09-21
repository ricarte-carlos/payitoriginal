import { getUserAuth } from "@/lib/auth/utils";
import { utapi } from "../uploadthing/core";

export const GET = async (req: Request) => {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit"));

  try {
    const filesList = await utapi.listFiles({ limit: limit });

    const medias = await Promise.all(
      filesList.map(async (file) => {
        const { key } = file;
        const media = await utapi.getFileUrls(key);
        return { key, url: media[0].url };
      }),
    );

    return new Response(JSON.stringify(medias), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
};
