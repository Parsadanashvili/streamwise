import { Video } from "@/types";
import wiseApi from "../wiseApi";

export const getTitleVideos = async (id: number) =>
  wiseApi.get<{
    data: Video[];
  }>(`/titles/${id}/videos`, {
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60 * 60,
      },
    },
  });
