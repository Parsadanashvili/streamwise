import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import NavLink from "./NavLink";
import Button from "./Button";

const headerBlurStyles = [
  "after:absolute",
  "before:absolute",
  "after:inset-[-1px_0px_-50%]",
  "before:inset-[-1px_0px_-50%]",
  "after:pointer-events-none",
  "before:pointer-events-none",
  "after:user-select-none",
  "before:user-select-none",
  "before:backdrop-blur-[12px]",
  "header-mask-image",
].join(" ");

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full flex flex-col z-[100] py-6 after:absolute after:left-0 after:bottom-0 after:right-0 after:h-px after:bg-[rgba(255,255,255,0.08)]">
      <div className={headerBlurStyles}></div>

      <Container>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Link href={"/"}>
              <Logo />
            </Link>

            <div className="flex items-center gap-8">
              <NavLink href={"/movies"}>ფილმები</NavLink>
              <NavLink href={"/series"}>სერიალები</NavLink>
              <NavLink href={"/collections"}>კოლექციები</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <NavLink href={"/"}>ავტორიზაცია</NavLink>
            <Button>რეგისტრაცია</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
