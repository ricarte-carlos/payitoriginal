import { REACT_QUERY_KEYS } from "@/app/admin/enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getUserCollections } from "./fetcher";

export const useGetUserCollections = (user_id: string) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_USER_COLLECTIONS, user_id],
    queryFn: () => getUserCollections(user_id),
  });
};
