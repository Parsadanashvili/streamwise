import Poster from "./components/Poster";
import Button from "@/components/Button";
import { PlayIcon, SignalIcon } from "@heroicons/react/24/solid";
import Cover from "./components/Cover";

const TitleLoading = () => {
  return (
    <div className="w-full min-h-screen">
      <Cover skeleton />
      <div className="w-full absolute -mt-[278px] z-40 text-white px-20">
        <div className="flex items-start gap-20">
          <Poster skeleton />

          <div className="w-full py-14 flex flex-col gap-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="flex py-2 px-4 items-center justify-center rounded-full bg-[rgba(255,255,255,0.10)] backdrop-blur-[6px]">
                <span className="text-white text-base leading-5 h-5 w-28"></span>
              </div>
              <div className="flex py-2 px-4 items-center justify-center rounded-full bg-[rgba(255,255,255,0.10)] backdrop-blur-[6px]">
                <span className="text-white text-base leading-5 h-5 w-24"></span>
              </div>
            </div>
            <div className="flex flex-col flex-start gap-2 w-full">
              <div className="flex items-center gap-3 text-base leading-5 font-normal">
                <span className="h-5 w-10 rounded-full bg-white-100"></span>

                <span className="text-white-200">•</span>

                <span className="h-5 w-10 rounded-full bg-white-100"></span>

                <span className="text-white-200">•</span>

                <span className="h-5 w-10 rounded-full bg-white-100"></span>
              </div>
              <div className="h-4 w-40 rounded-full bg-white-100"></div>
              <div className="h-12 w-[500px] rounded-full bg-white-100"></div>
            </div>
            <div className="flex items-center gap-4">
              <Button startIcon={SignalIcon} variant="skeleton">
                უყურეთ ერთად
              </Button>
              <Button startIcon={PlayIcon} variant="skeleton">
                უყურე ახლავე
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full max-w-2xl h-4 rounded-full bg-white-100" />
              <div className="w-full max-w-4xl h-4 rounded-full bg-white-100" />
              <div className="w-full max-w-3xl h-4 rounded-full bg-white-100" />
            </div>
          </div>

          <div className="min-w-[380px] py-14 animate-pulse">
            <div className="w-28 h-10 rounded-full bg-white-100" />

            <div className="flex-col justify-start items-start gap-5 inline-flex mt-7 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-64 rounded-full bg-white-100"></div>
                <div className="h-4 w-52 rounded-full bg-white-100"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-64 rounded-full bg-white-100"></div>
                <div className="h-4 w-52 rounded-full bg-white-100"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-64 rounded-full bg-white-100"></div>
                <div className="h-4 w-52 rounded-full bg-white-100"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-64 rounded-full bg-white-100"></div>
                <div className="h-4 w-52 rounded-full bg-white-100"></div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-64 rounded-full bg-white-100"></div>
                <div className="h-4 w-52 rounded-full bg-white-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleLoading;
