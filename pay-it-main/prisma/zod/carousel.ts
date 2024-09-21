import * as z from "zod";

export const carouselSchema = z.object({
  id: z.string().cuid(),
  image: z.string().url(),
  position: z.number().int(),
  key: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  link: z.string().nullable(),
  publishedAt: z.coerce.date().nullable(),
});

export type CarouselSchema = z.infer<typeof carouselSchema>;
