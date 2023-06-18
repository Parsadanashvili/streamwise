"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputStack from "@/components/InputStack";
import { login } from "@/hooks/useAuth";
import Link from "next/link";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    login({
      credentials: {
        email,
        password,
      },
    });
  };

  return (
    <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-3">
        <InputStack>
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
