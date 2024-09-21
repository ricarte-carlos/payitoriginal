import { collectionType } from "@prisma/client";
import * as z from "zod";

export const collectionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  type: z.nativeEnum(collectionType),
  permission: z.boolean(),
  user_id: z.string(),
});

export type CollectionsSchema = z.infer<typeof collectionSchema>;

export type VideoSections = "WhatsNew";
