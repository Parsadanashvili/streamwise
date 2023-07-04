"use client";

import CircleButton from "@/components/CircleButton";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Chat = () => {
  return (
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
  );
};

export default Chat;
