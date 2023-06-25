"use client";

import Image from "next/image";
import { FC } from "react";

interface PosterProps {
  alt: string;
  image: string;
}

const Poster: FC<PosterProps> = ({ alt, image }) => {
  return (
    <div className="relative min-w-[380px] rounded-3xl overflow-hidden">
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
    </div>
  );
};

export default Poster;
