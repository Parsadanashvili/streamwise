"use client";

import { Message, Video, WatchRoom } from "@/types";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useWebSocket } from "@/providers/WebSocketProvider";
import Avatar from "@/components/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";
import RoomPlayer from "./RoomPlayer";
import Chat from "./Chat";

interface WatchProviderProps {
  room: WatchRoom;
  videos: Video[];
  children: ReactNode;
}

export const WatchContext = createContext<{
  room: WatchRoom;
  videos: Video[] | null;
  player: HTMLVideoElement | null;
  messages: Message[];
  setRoom: (room: WatchRoom) => void;
  setVideos: (videos: Video[]) => void;
  setPlayer: (player: HTMLVideoElement) => void;
  setMessages: (messages: Message[]) => void;
  nowWatching: number;
}>({
  //@ts-ignore
  room: null,
  //@ts-ignore
  videos: null,
  player: null,
  messages: [],
  setRoom: (u: WatchRoom) => {},
  setVideos: (u: Video[]) => {},
  setPlayer: (u: HTMLVideoElement) => {},
  setMessages: (u: Message[]) => {},
  nowWatching: 0,
});

dayjs.locale("ka");
dayjs.extend(relativeTime);

const WatchProvider: FC<WatchProviderProps> = ({
  children,
  room: initialRoom,
  videos: initialVideos,
}) => {
  const [room, setRoom] = useState<WatchRoom>(initialRoom);
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [player, setPlayer] = useState<HTMLVideoElement | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [nowWatching, setNowWatching] = useState(0);
  const { connection } = useWebSocket();

  useEffect(() => {
    if (!connection) return;

    connection.send("watchRoom.join", { room_id: room.id });

    return () => {
      connection.send("watchRoom.leave", { room_id: room.id });
    };
  }, [connection, room.id]);

  useEffect(() => {
    if (!connection) return;

    return connection.addListener<{
      id: number;
      messages: Message[];
      nowWatching: number;
      timePassed: number;
    }>("watch-room-initData", async (data) => {
      if (data.id == room.id) {
        setMessages(data.messages);
        setNowWatching(data.nowWatching);

        if (player) {
          if (player.duration > data.timePassed) return;

          player.currentTime = data.timePassed;

          try {
            await player.play();
          } catch {
            player.volume = 0;
            await player.play();

            const onClick = (e: Event) => {
              e.preventDefault();

              player.volume = 1;
              player.play();
              document.removeEventListener("click", onClick);
            };

            document.addEventListener("click", onClick);
          }
        }
      }
    });
  }, [room.id, connection, player]);

  useEffect(() => {
    if (!connection) return;

    return connection.addListener<{
      id: number;
      messages: Message[];
      nowWatching: number;
      timePassed: number;
    }>("watch-room-updated", async (data) => {
      if (data.id == room.id) {
        setNowWatching(data.nowWatching);
      }
    });
  }, [room.id, connection, player]);

  useEffect(() => {
    if (!connection) return;

    return connection.addListener<{
      id: number;
      started_at: string;
    }>("watch-room-started", async (data) => {
      if (data.id == room.id) {
        setRoom((r) => ({ ...r, started_at: data.started_at }));
      }
    });
  }, [room.id, connection, player]);

  useEffect(() => {
    return connection?.addListener<{
      id: number;
      message: Message;
    }>("watch-room-message", (data) => {
      if (data.id == room.id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });
  }, [connection, room.id]);

  useEffect(() => {
    if (room.started_at && player) {
      async () => {
        try {
          await player.play();
        } catch (e) {
          player.volume = 0;
          await player.play();
        }
      };
    }
  }, [room.started_at, player]);

  return (
    <WatchContext.Provider
      value={useMemo(
        () => ({
          room,
          videos,
          player,
          messages,
          setRoom,
          setVideos,
          setPlayer,
          setMessages,
          nowWatching,
        }),
        [room, videos, player, messages, nowWatching]
      )}
    >
      <div className="relative w-full min-h-[calc(100vh-90px)] mt-[90px] flex overflow-hidden">
        <div className="w-[calc(100%-518px)] min-h-full p-7 flex flex-col gap-8">
          <RoomPlayer />

          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <Avatar>{room.host.username.charAt(0)}</Avatar>
              <div className=" space-y-1">
                <div className="text-white text-base leading-[19px] font-normal">
                  @{room.host.username}
                </div>
                {room.ended_at ? (
                  <div className="text-white-200 text-sm leading-[18px] font-normal">
                    დამთავრებულია
                  </div>
                ) : room.started_at ? (
                  <div className="text-white-200 text-sm leading-[18px] font-normal">
                    დაიწყო: {dayjs(room.started_at).from(dayjs())}
                  </div>
                ) : room.starts_at ? (
                  <div className="text-white-200 text-sm leading-[18px] font-normal">
                    დაიწყება: {dayjs().from(room.starts_at)}
                  </div>
                ) : (
                  <div className="text-white-200 text-sm leading-[18px] font-normal">
                    ჯერ არ დაწყებულა
                  </div>
                )}
              </div>
            </div>

            <div className="text-white-400 justify-start items-center gap-2 flex">
              <EyeIcon className="w-6 h-6" />
              <div className="text-sm font-normal">
                ახლა უყურებს {nowWatching}
              </div>
            </div>
          </div>

          {children}
        </div>

        <Chat />
      </div>
    </WatchContext.Provider>
  );
};

export default WatchProvider;
