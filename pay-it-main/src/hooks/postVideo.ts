import ky from "ky";
import type { VideoSections } from "prisma/zod/collection";

import type { VideoSchema } from "prisma/zod/video";

export const postVideo = async ({
  data,
  section,
}: {
  data: Omit<VideoSchema, "id" | "publishedAt" | "section">;
  section: VideoSections;
}) => {
  await ky
    .post("video", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      json: { ...data, section },
    })
    .json();
};
