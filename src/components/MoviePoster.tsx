"use client";

import Image from "next/image";
import { FC } from "react";
import { BlurhashCanvas } from "react-blurhash";

interface MoviePosterProps {
  blurhash?: string;
  image: string;
}

const MoviePoster: FC<MoviePosterProps> = ({ blurhash, image }) => {
  return (
    <div className="relative w-full select-none h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-5 h-full z-20" />
      <Image
        width={300}
        height={430}
        quality={80}
        src={image}
        loading="lazy"
        alt="movie-poster"
        className="opacity-0 !absolute top-0 right-0 bottom-0 left-0 z-10 h-full object-cover"
        onLoadingComplete={(e) => {
          e.classList.remove("opacity-0");
          e.classList.add("animate-fadeIn");
        }}
      />
      {blurhash && <BlurhashCanvas hash={blurhash} width={300} height={430} />}
    </div>
  );
};

export default MoviePoster;
