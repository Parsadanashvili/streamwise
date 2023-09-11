"use client";

import { checkUsername } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import { signup } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useEffect, useState } from "react";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>();

  const {
    formState: { errors },
    handleSubmit,
    setError,
    register,
    watch,
  } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const username = watch("username");

  const handleSignup = async (data: FormValues) => {
    if (usernameAvailable === false) {
      setError("username", {
        message: "მომხმარებელის სახელი დაკავებულია",
      });
      return;
    }

    const { ok, error } = await signup(data);

    if (!ok) {
      setUsernameAvailable(undefined);

      const keys = Object.keys(error);

      keys.forEach((key) => {
        setError(key as any, {
          message: error[key],
        });
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (username.length > 3) {
        const { data } = await checkUsername(username);

        if (!data.data.available) {
          setError("username", {
            type: "onChange",
            message: "მომხმარებელის სახელი დაკავებულია",
          });

          setUsernameAvailable(false);
        } else {
          setUsernameAvailable(true);
        }
      } else {
        setUsernameAvailable(undefined);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [username, setError]);

  const usernameHasError =
    usernameAvailable === undefined && !errors.username?.message
      ? undefined
      : !usernameAvailable || !!errors.username?.message;

  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="w-full flex flex-col gap-3">
        <InputStack>
          <Input
            color={
              usernameHasError == undefined
                ? undefined
                : usernameHasError === false
                ? "success"
                : "error"
            }
            placeholder="მომხმარებლის სახელი"
            {...register("username", {
              required: true,
              minLength: 4,
              maxLength: 20,
            })}
            autoComplete="off"
          />
          <Input
            type="email"
            placeholder="ელ-ფოსტა"
            {...register("email", {
              required: true,
            })}
            color={!!errors.email?.message ? "error" : undefined}
            autoComplete="email"
            autoCorrect="email"
          />
          <Input
            type="password"
            placeholder="პაროლი"
            {...register("password", {
              required: true,
            })}
            color={!!errors.password?.message ? "error" : undefined}
            error={
              errors?.username?.message ||
              errors?.email?.message ||
              errors.password?.message
            }
          />
        </InputStack>
      </div>

      <Button className="w-full">გაგრძელება</Button>
    </form>
  );
};

export default SignupForm;
