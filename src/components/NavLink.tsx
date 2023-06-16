import Link, { LinkProps } from "next/link";
import { FC, ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  return (
    <Link
      className="text-base font-normal text-white hover:text-white-400 transition-colors duration-[120ms] case-on"
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
