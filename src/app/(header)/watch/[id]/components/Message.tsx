"use client";

import { Message } from "@/types";

const Message = ({ content, user }: Message) => {
  return (
    <div className="relative overflow-hidden flex flex-row items-start text-sm font-light leading-[18px]">
      {user !== "system" && (
        <div className="block mr-2 overflow-hidden rounded-full flex-none">
          <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full overflow-hidden bg-primary backdrop-blur-[6px] text-white select-none text-sm">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      <div className=" self-center min-w-[0]">
        <span className="text-white-300 box-border mr-2">
          {user === "system" ? "System:" : user.username}
        </span>
        <span className="text-white-400 overflow-hidden break-words tracking-wide">
          {content}
        </span>
      </div>
    </div>
  );
};

export default Message;
