"use client";

import Button from "@/components/Button";
import Player from "@/components/Player";
import Image from "next/image";
import { FC, useContext } from "react";
import { WatchContext } from "./WatchProvider";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/providers/WebSocketProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";

interface RoomPlayerProps {}

dayjs.locale("ka");
dayjs.extend(relativeTime);

const RoomPlayer: FC<RoomPlayerProps> = () => {
  const { user } = useAuth();
  const { room, videos, setPlayer } = useContext(WatchContext);
  const { connection } = useWebSocket();

  const start = () => {
    if (!connection) return;

    connection.send("watchRoom.start", { room_id: room.id });
  };

  if (room.ended_at) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[725px] bg-[#000] rounded-3xl select-none">
        <h1 className="text-2xl font-bold text-white case-on">
          სტრიმი დამთავრებულია
        </h1>
      </div>
    );
  }

  if (!room.starts_at && !room.started_at) {
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-[725px] bg-[#000] rounded-3xl select-none overflow-hidden">
        {room.title?.covers?.[0] && (
          <>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black-300 z-10">
              <div className="flex flex-col items-center justify-center w-full h-full">
                {user && user.id == room.host.id ? (
                  <Button variant="outline" onClick={start}>
                    დაწყება
                  </Button>
                ) : (
                  <h1 className="text-2xl font-bold text-white case-on">
                    ფილმი ჯერ არ დაწყებულა
                  </h1>
                )}
              </div>
            </div>

            <div className="w-full h-full blur-3xl">
              <Image
                width={1000}
                height={725}
                src={room.title?.covers?.[0]}
                alt="cover"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  scale: 1.2,
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  if (dayjs(room.starts_at).isAfter(dayjs()) && !room.started_at) {
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-[725px] bg-[#000] rounded-3xl select-none overflow-hidden">
        {room.title?.covers?.[0] && (
          <>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black-300 z-10">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold text-white case-on">
                  ფილმი დაიწყება {room.starts_at}
                </h1>
              </div>
            </div>

            <div className="w-full h-full blur-3xl">
              <Image
                width={1000}
                height={725}
                src={room.title?.covers?.[0]}
                alt="cover"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  scale: 1.2,
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Player
      canChangeTimeline={false}
      height={725}
      poster={room.title?.covers?.[0]}
      onInit={(p) => {
        if (p) {
          setPlayer(p);
        }
      }}
      src={videos?.find((v) => v.language === room.language?.code)?.src ?? ""}
    />
  );
};

export default RoomPlayer;
