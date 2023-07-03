import { WatchRoom } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const createWatchRoom = async (
  accessToken: string,
  name: string,
  language_id: number,
  title_id: number
): Promise<
  ApiResponse<{
    data: any;
  }>
> => {
  try {
    return await wiseApi.post(
      "/watch-rooms",
      {
        name,
        language_id,
        title_id,
        is_public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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

export const getWatchRoom = async (
  accessToken: string,
  watchRoomId: number
): Promise<
  ApiResponse<{
    data: WatchRoom;
  }>
> => {
  try {
    return await wiseApi.get(`/watch-rooms/${watchRoomId}`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
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
