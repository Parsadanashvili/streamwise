import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import Logo from "@/components/Logo";
import DiscordIcon from "@/icons/DiscordIcon";
import FacebookIcon from "@/icons/FacebookIcon";
import GoogleIcon from "@/icons/GoogleIcon";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col gap-7 w-full max-w-[328px]">
      <div className="flex flex-col items-center gap-6">
        <Link href={"/"}>
          <Logo />
        </Link>

        <div className="text-white-300 text-base font-normal leading-[19px]">
          შედით თქვენს Streamwise-ის ანგარიშზე
        </div>
      </div>

      <LoginForm />

      <Divider>ან</Divider>

      <div className="flex items-center justify-center gap-5">
        <CircleButton variant="outline" icon={GoogleIcon} />
        <CircleButton variant="outline" icon={FacebookIcon} />
        <CircleButton variant="outline" icon={DiscordIcon} />
      </div>

      <div className="flex items-center justify-center text-sm leading-[18px] text-white-300 font-light gap-1">
        არ გაქვს ანგარიში? —{" "}
        <Link href={"/signup"} className="text-white">
          შექმენი
        </Link>
      </div>
    </div>
  );
};

export default Login;
