import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { carouselSchema } from "@/schemas";
import { z } from "zod";

export async function POST(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });
  const body = await request.json();

  try {
    const {
      image,
      position: positionToInsert,
      description,
      title,
      key,
      publishedAt,
      link,
    } = carouselSchema.omit({ id: true }).parse(body);

    await db.carousel.upsert({
      where: { position: positionToInsert },
      update: {
        image,
        description,
        title,
        key,
        position: positionToInsert,
        link,
        publishedAt,
      },
      create: {
        image,
        position: positionToInsert,
        description,
        title,
        key,
        link,
        publishedAt,
      },
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      error instanceof Error ? error.message : "Server Error",
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const slides = await db.carousel.findMany({
      orderBy: { position: "asc" },
    });

    return new Response(JSON.stringify(slides), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}

export const DELETE = async (req: Request) => {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });

  const body = await req.json();

  const { key } = body;

  try {
    const deleteResult =
      await db.$executeRaw`DELETE FROM "Carousel" WHERE key = ${key}`;

    if (deleteResult > 0) {
      return new Response("Row deleted", { status: 200 });
    }
    return new Response("Row not found", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
};
