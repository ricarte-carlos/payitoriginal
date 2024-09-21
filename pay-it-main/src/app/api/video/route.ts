import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { videoSchema } from "prisma/zod/video";
import { z } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sectionParam = searchParams.get("section");
  try {
    const { section } = videoSchema
      .pick({ section: true })
      .parse({ section: sectionParam });

    const video = await db.video.findUnique({
      where: { section },
    });

    return Response.json(video);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });

  const body = await request.json();

  try {
    const { title, description, link, section, callToAction } = videoSchema
      .omit({ id: true, publishedAt: true })
      .parse(body);

    await db.video.upsert({
      where: { section },
      update: {
        title,
        description,
        link,
        callToAction,
        section,
      },
      create: {
        title,
        description,
        link,
        callToAction,
        section,
      },
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Error", { status: 500 });
  }
}
