import { REACT_QUERY_KEYS } from "@/enums/query-keys";

import { useQuery } from "@tanstack/react-query";
import { getVideos } from "./fetcher";

export const useGetVideos = (section: "WhatsNew") => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_VIDEOS],
    queryFn: () => getVideos(section),
  });
};
