import ky from "ky";
import type { CollectionsSchema } from "prisma/zod/collection";

export const getUserCollections = async (user_id: string) => {
  const responseData: CollectionsSchema[] = await ky
    .get("collections", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      searchParams: { user_id },
    })
    .json();

  return responseData;
};
