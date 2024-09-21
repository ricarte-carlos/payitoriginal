import ky from "ky";
import type { VideoSchema } from "prisma/zod/video";

export const getVideos = async (section: string) => {
  const responseData: VideoSchema = await ky
    .get("video", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      searchParams: { section },
    })
    .json();

  return responseData;
};
