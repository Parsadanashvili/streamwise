import { getTitleVideos } from "@/api/videos/videos";
import { getWatchRoom } from "@/api/watchRoom/watchRoom";
import Avatar from "@/components/Avatar";
import CircleButton from "@/components/CircleButton";
import Player from "@/components/Player";
import { EyeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import RoomPlayer from "./components/RoomPlayer";
import { getEpisodeVideos } from "@/api/episodes/episodes";

interface WatchPageProps {
  params: {
    id: number;
  };
}

const WatchPage = async ({ params }: WatchPageProps) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("accessToken");

  if (!cookie) {
    redirect("/login");
  }

  const accessToken = cookie.value;
  const { id } = params;

  const { res, ok } = await getWatchRoom(accessToken, id);

  if (!ok) {
    notFound();
  }

  const room = res.data;
  const { title, language } = room;

  if (!title) {
    notFound();
  }

  let src = "";

  if (title.type === "movie") {
    const { res, ok } = await getTitleVideos(title.id);

    if (!ok || res.data.length === 0) {
      notFound();
    }

    src = res.data.filter((video) => video.language === language?.code)[0].src;
  }

  if (title.type === "series") {
    if (!room.episode) {
      notFound();
    }

    const { res, ok } = await getEpisodeVideos(room.episode.id);

    if (!ok || res.data.length === 0) {
      notFound();
    }

    src = res.data.filter((video) => video.language === language?.code)[0].src;
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-90px)] mt-[90px] flex overflow-hidden">
      <div className="w-[calc(100%-518px)] min-h-full p-7 flex flex-col gap-8">
        <RoomPlayer room={room} src={src} />

        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <Avatar>{room.host.username.charAt(0)}</Avatar>
            <div className=" space-y-1">
              <div className="text-white text-base leading-[19px] font-normal">
                @{room.host.username}
              </div>
              {room.started_at ? (
                <div className="text-white-200 text-sm leading-[18px] font-normal">
                  დაიწყო:{" "}
                  {new Date(room.started_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </div>
              ) : room.starts_at ? (
                <div className="text-white-200 text-sm leading-[18px] font-normal">
                  დაიწყება:{" "}
                  {new Date(room.starts_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
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
              ახლა უყურებს {room.participants.length}
            </div>
          </div>
        </div>

        {title && (
          <div className="flex gap-7">
            <div className="relative min-w-[220px] h-[340px] rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 bottom-0 left-0"></div>
              <Image
                width={220}
                height={340}
                src={title.posters?.[0] ?? ""}
                alt="poster"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="py-7">
              <div className="text-white text-[40px] font-bold leading-10 case-on">
                {title.name.ka}
              </div>
              <div className="flex items-center gap-3 mt-2">
                {title.release_date && (
                  <>
                    <div className="text-white-400 text-base font-normal leading-tight">
                      {new Date(title.release_date).getFullYear()}
                    </div>

                    <div className="w-[5px] h-[5px] bg-white-200 rounded-full" />
                  </>
                )}

                {title.duration && (
                  <>
                    <div className="text-white-400 text-base font-normal leading-tight">
                      1ს
                    </div>

                    <div className="w-[5px] h-[5px] bg-white-200 rounded-full" />
                  </>
                )}

                <div className="text-white-400 text-base font-normal leading-tight">
                  PG13
                </div>
              </div>
              <div className="text-white text-lg leading-[24px] mt-6">
                {title.plots.ka}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed right-0 max-w-[518px] w-full h-full max-h-[calc(100vh-90px)] border-l border-[rgba(255,255,255,0.05)] bg-black-300 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-6 max-w-full overflow-hidden">
          <div className="relative overflow-hidden flex flex-row items-start text-sm font-light leading-[18px]">
            <div className="self-center min-w-[0]">
              <span className="text-white-300 box-border mr-2">System:</span>
              <span className="text-white-400 overflow-hidden break-words tracking-wide">
                YoChillSky შემოუერთდა ჩატს
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden flex flex-row items-start text-sm font-light leading-[18px]">
            <div className="self-center min-w-[0]">
              <span className="text-white-300 box-border mr-2">System:</span>
              <span className="text-white-400 overflow-hidden break-words tracking-wide">
                Stephanie შემოუერთდა ჩატს
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden flex flex-row items-start text-sm font-light leading-[18px]">
            <div className="block mr-2 overflow-hidden rounded-full flex-none">
              <Image
                width={26}
                height={26}
                alt="avatar"
                className="w-[26px] h-[26px] rounded-full"
                src="https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/1e13c95d9b1767039699ca4560529603489c3f91?fuid=1086042922435748998"
              />
            </div>
            <div className=" self-center min-w-[0]">
              <span className="text-white-300 box-border mr-2">YoChillSky</span>
              <span className="text-white-400 overflow-hidden break-words tracking-wide">
                კიმიკო სმეშ
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden flex flex-row items-start text-sm font-light leading-[18px]">
            <div className="block mr-2 overflow-hidden rounded-full flex-none">
              <Image
                width={26}
                height={26}
                alt="avatar"
                className="w-[26px] h-[26px] rounded-full"
                src="https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/1e13c95d9b1767039699ca4560529603489c3f91?fuid=1086042922435748998"
              />
            </div>
            <div className=" self-center min-w-[0]">
              <span className="text-white-300 box-border mr-2">YoChillSky</span>
              <span className="text-white-400 overflow-hidden break-words tracking-wide">
                დაბლიუ სერიალიი
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-[150px] border-t border-[rgba(255,255,255,0.05)] p-6 text-white">
          <textarea
            className="outline-none border-none bg-transparent resize-none w-full m-0 placeholder:text-white-200"
            rows={2}
            placeholder="დაიწყე წერა ჩატში..."
          ></textarea>
          <div className="absolute bottom-6 right-6 flex gap-5 items-center">
            <div className="text-sm leading-[18px] font-light text-white-200">
              0/200
            </div>

            <CircleButton icon={PaperAirplaneIcon} variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
