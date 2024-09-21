import ky from "ky";

export const getContentMedia = async (limit: number) => {
  const responseData: { key: string; url: string }[] = await ky
    .get("content-library", {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      searchParams: { limit },
    })
    .json();

  return responseData;
};
