import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import type { CollectionsSchema } from "prisma/zod/collection";

export async function GET(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not authenticated", { status: 403 });

  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) return new Response("Bad Request", { status: 400 });

  try {
    const responseData: CollectionsSchema[] = await db.collection.findMany({
      where: { user_id },
    });

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(err.message, { status: 400 });
    }
  }
}
