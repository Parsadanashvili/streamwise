import Button from "@/components/Button";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import Logo from "@/components/Logo";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col gap-7 w-full max-w-[328px]">
      <div className="flex flex-col items-center gap-6">
        <Link href={"/"}>
          <Logo />
        </Link>

        <div className="text-white-300 text-base font-normal leading-[19px]">
          დაგავიწყდათ პაროლი?
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <InputStack>
          <Input placeholder="ელ-ფოსტა" />
          <Input placeholder="კოდი" />
        </InputStack>

        <div className="text-end">
          <div className=" text-white text-sm leading-[18px] font-light cursor-pointer">
            კოდის თავიდან გამოგზავნა (60)
          </div>
        </div>
      </div>

      <Button className="w-full">გაგრძელება</Button>

      <div className="flex items-center justify-center text-sm leading-[18px] text-white-300 font-light gap-1">
        არ გაქვს ანგარიში? —{" "}
        <Link href={"/signup"} className="text-white">
          შექმენი
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
