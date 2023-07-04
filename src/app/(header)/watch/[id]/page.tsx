import { getTitleVideos } from "@/api/videos/videos";
import { getWatchRoom } from "@/api/watchRoom/watchRoom";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getEpisodeVideos } from "@/api/episodes/episodes";
import WatchProvider from "./components/WatchProvider";

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
    <WatchProvider room={room} src={src}>
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
    </WatchProvider>
  );
};

export default WatchPage;
