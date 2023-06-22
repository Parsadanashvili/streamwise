"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import { login } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: FormValues) => {
    const response = await login({
      credentials: {
        email: data.email,
        password: data.password,
      },
    });

    if (response.error) {
      setError("email", {
        message: response.error,
      });
      setError("password", {
        message: response.error,
      });
    }
  };

  const emailHasError = !!errors.email?.message;
  const passwordHasError = !!errors.password?.message;

  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="w-full flex flex-col gap-3">
        <InputStack>
          <Input
            type="text"
            placeholder="ელ-ფოსტა"
            {...register("email", {
              required: true,
            })}
            color={emailHasError ? "error" : undefined}
            autoComplete="off"
          />
          <Input
            type="password"
            placeholder="პაროლი"
            {...register("password", {
              required: true,
            })}
            color={emailHasError || passwordHasError ? "error" : undefined}
            error={errors.email?.message}
            autoComplete="off"
          />
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

      <Button className="w-full" type="submit">
        გაგრძელება
      </Button>
    </form>
  );
};

export default LoginForm;
