import { Video } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const getTitleVideos = async (
  id: number
): Promise<
  ApiResponse<{
    data: Video[];
  }>
> => {
  try {
    return await wiseApi.get(`/titles/${id}/videos`, undefined, {
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