import { Video } from "@/types";
import wiseApi from "../wiseApi";

export const getEpisodeVideos = async (id: number) =>
  wiseApi.get<{
    data: Video[];
  }>(`/episodes/${id}/videos`, {
    headers: {
      //@ts-ignore
      next: {
        revalidate: 60 * 60,
      },
    },
  });
