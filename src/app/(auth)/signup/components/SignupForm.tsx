"use client";

import { checkUsername } from "@/api/auth/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import { signup } from "@/hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>();

  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameAvailable) {
      signup({
        username,
        email,
        password,
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (username.length > 3) {
        const res = await checkUsername(username);

        setUsernameAvailable(res.data.available);

        if (!res.data.available) {
          setError("მომხმარებელის სახელი დაკავებულია");
        } else {
          setError(undefined);
        }
      } else {
        setUsernameAvailable(undefined);
        setError(undefined);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-3">
        <InputStack>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            color={
              usernameAvailable === true
                ? "success"
                : usernameAvailable === false
                ? "error"
                : undefined
            }
            value={username}
            placeholder="მომხმარებლის სახელი"
          />
          <Input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="ელ-ფოსტა"
          />
          <Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="პაროლი"
          />
        </InputStack>
        {error && (
          <div className="text-error text-sm leading-[18px] font-light">
            {error}
          </div>
        )}
      </div>

      <Button className="w-full">გაგრძელება</Button>
    </form>
  );
};

export default SignupForm;
