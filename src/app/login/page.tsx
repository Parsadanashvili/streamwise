import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import Logo from "@/components/Logo";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-screen bg-page-gradient">
      <div className="flex flex-col gap-7 w-[328px]">
        <div className="flex flex-col items-center gap-6">
          <Link href={"/"}>
            <Logo />
          </Link>

          <div className="text-white-300 text-base font-normal leading-[19px]">
            შედით თქვენს Streamwise-ის ანგარიშზე
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <InputStack>
            <Input placeholder="ელ-ფოსტა" />
            <Input type="password" placeholder="პაროლი" />
          </InputStack>

          <div className="text-end">
            <Link
              href={"/forgot-password"}
              className=" text-white text-sm leading-[18px] font-light"
            >
              პაროლის აღდგენა
            </Link>
          </div>
        </div>

        <Button className="w-full">გაგრძელება</Button>

        {/* <Divider>ან</Divider>

        <div className="flex items-center justify-center gap-5">
          <CircleButton variant="outline">
            <PlusCircleIcon className="w-[18px] h-[18px]" />
          </CircleButton>
          <CircleButton variant="outline">
            <PlusCircleIcon className="w-[18px] h-[18px]" />
          </CircleButton>
          <CircleButton variant="outline">
            <PlusCircleIcon className="w-[18px] h-[18px]" />
          </CircleButton>
        </div> */}

        <div className="flex items-center justify-center text-sm leading-[18px] text-white-300 font-light gap-1">
          არ გაქვს ანგარიში? —{" "}
          <Link href={"/signup"} className="text-white">
            შექმენი
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
