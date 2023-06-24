"use client";

import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Container from "@/components/Container";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "ცვალებადი ნიშნები",
    description:
      "ლორემ იპსუმ დოკუმენტური მუხები ლადო, მოგიყვანესო ვოლტერი სააბატომდე ეშონოდათ მექილიკა დაეზარა. ლიბერიის კოცნაში მყრალა თხრობა",
    image:
      "https://www.figma.com/file/33eljP2axeR66ojX7TdAC4/image/ef8384454e73bd1bf1cafc766c902d4af67bef21?fuid=1086042922435748998",
    genre: "კომედია",
    year: "2023",
    age: "18+",
    language: "GEO",
  },
  {
    id: 2,
    title: "დახსნა 2",
    description:
      "After barely surviving his grievous wounds from his mission in Dhaka, Bangladesh, Tyler Rake is back, and his team is ready to take on their next mission.",
    image: "/images/extraction_2.jpg",
    genre: "მძაფრ-სიუჟეტიანი",
    year: "2023",
    age: "16+",
    language: "GEO",
  },
];

const Slider = () => {
  const [firstLoad, setFirstLoad] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);

  const prevSlide =
    currentSlide === 0 && !firstLoad
      ? null
      : slides[currentSlide === 0 ? slides.length - 1 : currentSlide - 1];

  const handleNextSlide = () => {
    if (buttonsDisabled) {
      return;
    }

    setAnimate(true);
    setButtonsDisabled(true);

    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }

    setTimeout(() => {
      setAnimate(false);
      setButtonsDisabled(false);
    }, 800);
  };

  const handlePrevSlide = () => {
    if (buttonsDisabled) {
      return;
    }

    setAnimate(true);
    setButtonsDisabled(true);

    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }

    setTimeout(() => {
      setAnimate(false);
      setButtonsDisabled(false);
    }, 800);
  };

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(true);
      setButtonsDisabled(false);
      setAnimate(false);
    }, 800);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-20">
        <Image
          width={1920}
          height={1000}
          src={slides[currentSlide].image}
          className={`${
            !firstLoad && currentSlide == 0 ? "animate-fadeIn" : ""
          } absolute top-0 left-0 h-full object-cover z-10`}
          alt="slider"
        />
        {prevSlide && (
          <Image
            width={1920}
            height={1000}
            src={prevSlide.image}
            className={`${
              animate ? "animate-fadeOut z-20" : ""
            } invisible opacity-0 absolute top-0 left-0 h-full object-cover`}
            alt="slider"
          />
        )}

        <div className="absolute z-50 w-full h-full">
          <div className="absolute bottom-0 left-0 w-full pb-[263px]">
            <Container>
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`${
                    index == currentSlide ? "flex" : "hidden"
                  } items-end justify-between`}
                >
                  <div
                    className={`flex flex-col gap-4 text-white ${
                      animate ? "animate-mainSliderInfoFadeUp" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 font-medium text-base leading-[18px]">
                      <div className="flex items-center bg-white-100 backdrop-blur-[6px] py-1 px-2 rounded-lg">
                        {slide.language}
                      </div>
                      <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                      <div>{slide.year}</div>
                      <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                      <div className="flex items-center bg-white-100 backdrop-blur-[6px] py-1 px-2 rounded-lg">
                        {slide.age}
                      </div>
                      <div className="w-[6px] h-[6px] bg-white-300 rounded-full" />
                      <div className="case-on">{slide.genre}</div>
                    </div>
                    <div className="font-bold text-5xl case-on">
                      {slide.title}
                    </div>
                    <div className="text-[18px] font-normal max-w-[614px]">
                      {slide.description}
                    </div>
                    <div className="flex items-center">
                      <Button startIcon={PlayIcon}>უყურე ახლავე</Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <CircleButton
                      variant="outline"
                      icon={ChevronRightIcon}
                      onClick={handleNextSlide}
                      disabled={buttonsDisabled}
                    />
                    <CircleButton
                      variant="outline"
                      icon={ChevronLeftIcon}
                      onClick={handlePrevSlide}
                      disabled={buttonsDisabled}
                    />
                  </div>
                </div>
              ))}
            </Container>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-slider-gradient z-20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Slider;
