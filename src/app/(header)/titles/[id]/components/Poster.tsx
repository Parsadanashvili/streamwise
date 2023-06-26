"use client";

import Image from "next/image";
import { FC } from "react";

interface PosterProps {
  alt?: string;
  image?: string;
  skeleton?: boolean;
}

const Poster: FC<PosterProps> = ({ alt, image, skeleton }) => {
  return (
    <div className="relative min-w-[380px] rounded-3xl overflow-hidden">
      {alt && image && !skeleton ? (
        <>
          <div className="absolute top-0 left-0 right-0 bottom-0" />
          <Image
            className="opacity-0"
            alt={alt}
            src={image}
            quality={100}
            width={400}
            height={672}
            onLoadingComplete={(e) => {
              e.classList.remove("opacity-0");
              e.classList.add("animate-fadeIn");
            }}
          />
        </>
      ) : (
        <div className="w-full h-[572px] bg-white-100 animate-pulse" />
      )}
    </div>
  );
};

export default Poster;
