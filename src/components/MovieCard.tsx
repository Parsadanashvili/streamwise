import CircleButton from "./CircleButton";
import { PlayIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import MoviePoster from "./MoviePoster";
import { Genre } from "@/types";

interface MovieCardProps {
  title: string;
  short_description: string;
  image: string;
  genres?: Genre[];
  blurhash?: string;
}

const MovieCard: FC<MovieCardProps> = ({
  title,
  short_description,
  image,
  genres,
  blurhash,
}) => {
  return (
    <div className="group relative bg-black overflow-hidden rounded-3xl cursor-pointer h-[430px]">
      <MoviePoster image={image} blurhash={blurhash} />

      <div className="absolute bottom-0 left-0 right-0 text-white duration-300 transition-[width] z-30">
        <div className="flex flex-col gap-5 p-5 bg-[rgba(12, 12, 12, 0.1)] backdrop-blur-[30px] rounded-t-3xl">
          <div className="flex items-center gap-3 font-medium text-base leading-[18px]">
            <CircleButton variant="outline" icon={PlayIcon} />

            <div className="flex flex-col gap-1 overflow-hidden">
              <div className="font-medium text-sm leading-[18px] overflow-hidden whitespace-nowrap text-ellipsis">
                {title}
              </div>

              <div className="font-medium text-xs leading-[14px] text-white-300">
                {genres?.map((genre) => genre.name.ka).join(" / ")}
              </div>
            </div>
          </div>

          <div className="space-x-2 hidden group-hover:block">
            <div className="text-[13px] leading-4 font-medium">
              {short_description?.trim()?.slice(0, 130) + "..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
