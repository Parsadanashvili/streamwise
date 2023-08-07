import { Paginated, Title } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getTitles = async (type = "movie", page = 1) =>
  wiseApi.get<Paginated<Title>>("/titles", {
    params: {
      type,
      page: String(page),
    },
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60 * 5,
      },
    },
  });

export const getTitle = async (id: string) =>
  wiseApi.get<{
    data: Title;
  }>(`/titles/${id}`, {
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60 * 60,
      },
    },
  });
