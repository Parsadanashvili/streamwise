import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import Logo from "@/components/Logo";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const SignUp = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-screen bg-page-gradient">
      <div className="flex flex-col gap-7 w-[328px]">
        <div className="flex flex-col items-center gap-6">
          <Link href={"/"}>
            <Logo />
          </Link>

          <div className="text-white-300 text-base font-normal leading-[19px]">
            შექმენით თქვენი Streamwise-ის ანგარიში
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <InputStack>
            <Input placeholder="მომხმარებლის სახელი" />
            <Input placeholder="ელ-ფოსტა" />
            <Input type="password" placeholder="პაროლი" />
          </InputStack>
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
          არსებული ანგარიშით
          <Link href={"/login"} className="text-white">
            შესვლა
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
