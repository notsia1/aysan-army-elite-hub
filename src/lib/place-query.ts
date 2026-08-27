import { queryOptions } from "@tanstack/react-query";

import { PLACE_DATA } from "./place-data";

/** Statik veri — API çağrısı yok. */
export const placeQueryOptions = queryOptions({
  queryKey: ["place", "aysan-army"],
  queryFn: async () => PLACE_DATA,
  staleTime: Infinity,
});
