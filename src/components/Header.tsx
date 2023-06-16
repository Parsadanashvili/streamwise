import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <header className="w-full py-6">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-16">
            <Logo />

            <div className="flex items-center gap-8">
              <NavLink href={"/"}>ფილმები</NavLink>
              <NavLink href={"/"}>სერიალები</NavLink>
              <NavLink href={"/"}>კოლექციები</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <NavLink href={"/"}>ავტორიზაცია</NavLink>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
