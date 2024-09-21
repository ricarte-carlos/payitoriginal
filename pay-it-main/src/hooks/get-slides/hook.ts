import { REACT_QUERY_KEYS } from "@/app/admin/enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getSlides } from "./fetcher";

export const useGetSlides = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_SLIDES],
    queryFn: () => getSlides(),
  });
};
