import Image from "next/image";
import CircleButton from "./CircleButton";
import { PlayIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface MovieCardProps {
  title: string;
  short_description: string;
  image: string;
}

const MovieCard: FC<MovieCardProps> = ({ title, short_description, image }) => {
  return (
    <div className="group relative bg-black overflow-hidden rounded-3xl cursor-pointer">
      <div className="relative w-full select-none">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-5" />
        <Image width={300} height={431} src={image} alt="movie-poster" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-white duration-300 transition-[width]">
        <div className="flex flex-col gap-5 p-5 bg-[rgba(12, 12, 12, 0.1)] backdrop-blur-[30px] rounded-t-3xl">
          <div className="flex items-center gap-3 font-medium text-base leading-[18px]">
            <CircleButton variant="outline">
              <PlayIcon className="text-white w-[18px] h-[18px]" />
            </CircleButton>

            <div className="flex flex-col gap-1 overflow-hidden">
              <div className="font-medium text-sm leading-[18px] overflow-hidden whitespace-nowrap text-ellipsis">
                {title}
              </div>

              <div className="font-medium text-xs leading-[14px] text-white-300">
                დრამა / ვესტერნი
              </div>
            </div>
          </div>

          <div className="space-x-2 hidden group-hover:block">
            <div className="text-[13px] leading-4 font-medium">
              {short_description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
