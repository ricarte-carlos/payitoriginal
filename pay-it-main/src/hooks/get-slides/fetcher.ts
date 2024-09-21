import ky from "ky";
import type { CarouselSchema } from "prisma/zod/carousel";

export const getSlides = async () => {
  const responseData: CarouselSchema[] = await ky
    .get("carousel", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    })
    .json();

  return responseData;
};
