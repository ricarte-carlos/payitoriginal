import * as z from "zod";
import { collectionType, role } from "@prisma/client";
import {
  CompleteSession,
  relatedSessionSchema,
  CompleteKey,
  relatedKeySchema,
} from "./index";
import { COLLECTIONS } from "@/app/admin/enums/collections";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  role: z.nativeEnum(role),
  password: z.string().nullable(),
  collections: z.array(
    z.object({
      name: z.nativeEnum(COLLECTIONS),
      type: z.string(),
      permission: z.boolean(),
    }),
  ),
});

export interface CompleteUser extends z.infer<typeof userSchema> {
  auth_session: CompleteSession[];
  key: CompleteKey[];
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  userSchema.extend({
    auth_session: relatedSessionSchema.array(),
    key: relatedKeySchema.array(),
  }),
);
