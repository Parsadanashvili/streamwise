"use client";

import Image from "next/image";
import { FC } from "react";
import { BlurhashCanvas } from "react-blurhash";

interface CoverProps {
  covers?: any;
  skeleton?: boolean;
}

const Cover: FC<CoverProps> = ({ covers, skeleton }) => {
  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
        {covers && !skeleton ? (
          <>
            <Image
              width={1920}
              height={800}
              src={covers[0]}
              quality={100}
              priority
              className={`opacity-0 absolute top-0 left-0 h-full object-top object-cover z-10`}
              alt="slider"
              onLoadingComplete={(e) => {
                e.classList.remove("opacity-0");
                e.classList.add("animate-fadeIn");
              }}
            />
            {covers.blurhash && (
              <BlurhashCanvas
                hash={covers.blurhash}
                width={1920}
                height={700}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-white-100 animate-pulse" />
        )}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-title-gradient z-20"></div>
      </div>
    </div>
  );
};

export default Cover;
