import { Paginated, Title } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getTitles = async (
  type = "movie",
  page = 1
): Promise<ApiResponse<Paginated<Title>>> => {
  try {
    return await wiseApi.get(
      "/titles",
      {
        type,
        page: String(page),
      },
      {
        next: {
          revalidate: 60 * 5,
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

export const getTitle = async (id: string) => {
  try {
    return await wiseApi.get(`/titles/${id}`, undefined, {
      next: {
        revalidate: 60 * 60,
      },
    });
  } catch (err) {
    return {
      ok: false,
      status: null,
      res: null,
    };
  }
};
