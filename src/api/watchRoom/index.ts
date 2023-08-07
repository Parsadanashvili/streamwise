import { WatchRoom } from "@/types";
import wiseApi, { ApiResponse } from "../wiseApi";

export const createWatchRoom = async (
  accessToken: string,
  name: string,
  language_id: number,
  title_id: number
) =>
  wiseApi.post<{
    data: any;
  }>("/watch-rooms", {
    body: {
      name,
      language_id,
      title_id,
      is_public: true,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

export const getWatchRoom = async (accessToken: string, watchRoomId: number) =>
  wiseApi.get<{
    data: WatchRoom;
  }>(`/watch-rooms/${watchRoomId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
