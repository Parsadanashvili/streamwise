import Container from "@/components/Container";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  href?: string;
}

const Section: FC<SectionProps> = ({ title, children, href }) => {
  return (
    <div className="relative w-full h-auto my-14">
      <Container>
        <div className="flex flex-col gap-9">
          <div className="flex items-end justify-between">
            <div className="text-white text-[32px] leading-[38px] font-bold case-on">
              {title}
            </div>

            {href && (
              <Link
                href={href}
                className="text-white-400 text-xl font-medium leading-normal case-on"
              >
                ყველა
              </Link>
            )}
          </div>
          <div className="w-full">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Section;
