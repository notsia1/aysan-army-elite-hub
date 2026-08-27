import { queryOptions } from "@tanstack/react-query";

import { getPlaceData } from "./place.functions";

export const placeQueryOptions = queryOptions({
  queryKey: ["place", "aysan-army"],
  queryFn: () => getPlaceData(),
  staleTime: 1000 * 60 * 30,
});
