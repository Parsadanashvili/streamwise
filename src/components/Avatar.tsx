import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src?: string;
  children?: React.ReactNode;
}

const Avatar: FC<AvatarProps> = ({ src, children }) => {
  if (src) {
    return (
      <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full overflow-hidden bg-black select-none">
        <Image
          width={60}
          height={60}
          src={src}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full overflow-hidden bg-primary backdrop-blur-[6px] text-white select-none text-xl">
      {children}
    </div>
  );
};

export default Avatar;
