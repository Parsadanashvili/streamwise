"use client";

import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Button from "./Button";
import { logout, useAuth } from "@/hooks/useAuth";
import Avatar from "./Avatar";

const headerBlurStyles = [
  "after:absolute",
  "before:absolute",
  "after:inset-[-1px_0px_-26px]",
  "before:inset-[-1px_0px_-26px]",
  "after:pointer-events-none",
  "before:pointer-events-none",
  "after:user-select-none",
  "before:user-select-none",
  "before:backdrop-blur-[12px]",
  "header-mask-image",
].join(" ");

const Header = () => {
  const { user, status } = useAuth();

  const avatar = user?.avatar;

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex flex-col z-[100] py-6 after:absolute after:left-0 after:bottom-0 after:right-0 after:h-px after:bg-[rgba(255,255,255,0.08)]">
      <div className={headerBlurStyles}></div>

      <Container>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link href={"/"} className="w-[140px] md:w-[183px]">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <NavLink href={"/movies"}>ფილმები</NavLink>
              <NavLink href={"/series"}>სერიალები</NavLink>
              <NavLink href={"/collections"}>კოლექციები</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {status == "unauthenticated" && (
              <>
                <div className="hidden md:block">
                  <NavLink href={"/login"}>ავტორიზაცია</NavLink>
                </div>
                <Link href={"/signup"}>
                  <Button>რეგისტრაცია</Button>
                </Link>
              </>
            )}

            {status == "loading" && <Avatar></Avatar>}

            {status == "authenticated" && (
              <div
                className="flex items-center gap-2 text-white text-base font-normal select-none cursor-pointer"
                onClick={() => {
                  const bool = confirm("გსურთ გამოსვლა?");

                  if (bool) {
                    logout();
                  }
                }}
              >
                {avatar ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
                )}

                {user?.username}
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
