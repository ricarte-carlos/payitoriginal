import { REACT_QUERY_KEYS } from "@/app/admin/enums/query-keys";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { getContentMedia } from "./fetcher";

export const useGetContentLibraryMedias = (
  limit?: number,
): UseQueryResult<{ key: string; url: string }[], Error> => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_CONTENT_LIBRARY_MEDIA],
    queryFn: () => getContentMedia(limit ?? 0),
  });
};
