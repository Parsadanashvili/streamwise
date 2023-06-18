import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Container from "@/components/Container";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Slider = () => {
  return (
    <div className="relative w-full h-screen bg-primary">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
        <Image
          width={1920}
          height={1000}
          src={
            "https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/ef8384454e73bd1bf1cafc766c902d4af67bef21?fuid=1086042922435748998"
          }
          className="absolute top-0 left-0 h-full object-cover z-10"
          alt="slider"
        />

        <div className="absolute z-50 w-full h-full">
          <div className="absolute bottom-0 left-0 w-full pb-[263px]">
            <Container>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-4 text-white">
                  <div className="flex items-center gap-3 font-medium text-base leading-[18px]">
                    <div className="flex items-center bg-white-100 backdrop-blur-[6px] py-1 px-2 rounded-lg">
                      GEO
                    </div>
                    <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                    <div>2023</div>
                    <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                    <div className="flex items-center bg-white-100 backdrop-blur-[6px] py-1 px-2 rounded-lg">
                      18+
                    </div>
                    <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                    <div className="case-on">კომედია</div>
                  </div>
                  <div className="font-bold text-5xl case-on">
                    ცვალებადი ნიშნები
                  </div>
                  <div className="text-[18px] font-normal max-w-[614px]">
                    ლორემ იპსუმ დოკუმენტური მუხები ლადო, მოგიყვანესო ვოლტერი
                    სააბატომდე ეშონოდათ მექილიკა დაეზარა. ლიბერიის კოცნაში
                    მყრალა თხრობა
                  </div>
                  <div className="flex items-center">
                    <Button startIcon={PlayIcon}>უყურე ახლავე</Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <CircleButton variant="outline" icon={ChevronRightIcon} />
                  <CircleButton variant="outline" icon={ChevronLeftIcon} />
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-slider-gradient z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Slider;
