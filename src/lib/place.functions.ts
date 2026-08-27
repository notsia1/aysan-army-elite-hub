import { createServerFn } from "@tanstack/react-start";

import type { PlaceData } from "./place";

export const getPlaceData = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlaceData> => {
    const { loadPlaceData } = await import("./place.server");
    return loadPlaceData();
  },
);
