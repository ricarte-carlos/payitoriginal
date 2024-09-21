import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter, utapi } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });

  const body = await req.json();

  const { key } = body;

  try {
    if (Array.isArray(key)) {
      await db.$executeRaw`DELETE FROM "Carousel" WHERE key = ANY(${key})`;
    } else {
      await db.$executeRaw`DELETE FROM "Carousel" WHERE key = ${key}`;
    }

    await utapi.deleteFiles(key);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
