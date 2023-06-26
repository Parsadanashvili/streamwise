import { Collection, Paginated } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getCollections = async (
  page = 1
): Promise<ApiResponse<Paginated<Collection>>> => {
  try {
    return wiseApi.get(
      "/collections",
      { page: String(page) },
      {
        next: {
          revalidate: 60,
        },
      }
    );
  } catch (err) {
    return {
      ok: false,
      status: null,
      res: null,
    };
  }
};
