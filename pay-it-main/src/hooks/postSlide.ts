import ky from "ky";
import type { CarouselSchema } from "prisma/zod/carousel";

export const postNewSlide = async (data: Omit<CarouselSchema, "id">) => {
  await ky
    .post("carousel", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      json: data,
    })
    .json();
};
