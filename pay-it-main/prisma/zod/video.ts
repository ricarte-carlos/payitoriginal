import * as z from "zod";

export const videoSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  section: z.enum(["WhatsNew"]),
  callToAction: z.string(),
  publishedAt: z.coerce.date().nullable(),
});

export type VideoSchema = z.infer<typeof videoSchema>;
