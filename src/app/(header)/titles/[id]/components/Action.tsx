"use client";

import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Language, Title } from "@/types";
import { SignalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon, PlayIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { createWatchRoom } from "@/api/watchRoom/watchRoom";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ActionProps {
  title: Title;
}

type FormValues = {
  name: string;
  language_id: number;
};

const Action: FC<ActionProps> = ({ title }) => {
  const [open, setOpen] = useState(false);

  const { push } = useRouter();

  const { status } = useAuth();

  const {
    formState: { errors },
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      language_id: title.languages?.[0].id ?? undefined,
    },
  });

  const language_id = watch("language_id");

  const handleCreateRoom = async (data: FormValues) => {
    if (status == "unauthenticated") return;

    const at = Cookies.get("accessToken");
    if (!at) return;

    const { res, ok } = await createWatchRoom(
      at,
      data.name,
      data.language_id,
      title.id
    );

    if (ok) {
      push(`/watch/${res.data.id}`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        startIcon={SignalIcon}
        onClick={() => {
          if (status == "unauthenticated") {
            push("/login");
            return;
          }
          setOpen(() => true);
        }}
      >
        უყურეთ ერთად
      </Button>
      <Button startIcon={PlayIcon} variant="outline">
        უყურე ახლავე
      </Button>

      <Modal
        open={open}
        onClose={() => {
          setOpen(() => false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-[rgba(255,255,255,0.05)] rounded-3xl backdrop-blur-[60px] flex-col justify-start items-center gap-8 p-8 inline-flex overflow-hidden">
            <div className="justify-start items-start gap-8 inline-flex">
              <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
                <div className="w-[120px] relative">
                  <Image
                    width={120}
                    height={181.15}
                    className="w-[120px] left-0 top-0 rounded-2xl blur-[60px]"
                    src={title.posters?.[0] ?? ""}
                    alt={title.name.ka}
                  />
                  <Image
                    width={120}
                    height={181.15}
                    className="w-[120px] left-0 top-0 absolute rounded-2xl"
                    src={title.posters?.[0] ?? ""}
                    alt={title.name.ka}
                  />
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                  <div className="text-white text-[24px] font-bold case-on">
                    {title.name.ka}
                  </div>
                  <div className="flex items-center gap-3 text-base text-white-400 leading-5 font-normal">
                    {title.release_date && (
                      <>
                        <span>
                          {new Date(title.release_date).getFullYear()}
                        </span>

                        <span className="text-white-200">•</span>
                      </>
                    )}

                    {title.duration && (
                      <>
                        <span>{(title.duration / 60).toFixed(0)}ს</span>

                        <span className="text-white-200">•</span>
                      </>
                    )}

                    <span>PG13</span>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(handleCreateRoom)}
                className="self-stretch flex-col justify-start items-start gap-8 inline-flex min-w-[450px]"
              >
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <div className="justify-center items-center gap-1 inline-flex">
                    <InformationCircleIcon className="w-6 h-6 relative text-white-200" />
                    <div className="text-white text-[16px] font-medium case-on">
                      ROOM-ის სახელი
                    </div>
                  </div>
                  <Input
                    placeholder="სახელი"
                    className="w-full"
                    {...register("name", {
                      required: true,
                    })}
                    error={errors.name?.message}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <div className="justify-center items-center gap-1 inline-flex">
                    <GlobeAltIcon className="w-6 h-6 relative text-white-200" />
                    <div className="text-white text-[16px] font-medium case-on">
                      აირჩიეთ ენა
                    </div>
                  </div>
                  <div className="justify-start items-start gap-3 inline-flex">
                    {title.languages &&
                      title.languages.map((language) => (
                        <div
                          onClick={() => {
                            setValue("language_id", language.id);
                          }}
                          key={language.code}
                          className={`${
                            language.id == language_id
                              ? "bg-white-200"
                              : "bg-[rgba(255,255,255,0.10)]"
                          } flex py-2 px-4 items-center justify-center rounded-full backdrop-blur-[6px] cursor-pointer select-none transition-colors`}
                        >
                          <span className="text-white text-base leading-5 case-on">
                            {language.name.ka}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="self-stretch grow shrink basis-0 justify-center items-end gap-2 inline-flex">
                  <Button className="w-full">შექმნა</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Action;
