import Container from "@/components/Container";
import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="relative w-full h-auto my-14">
      <Container>
        <div className="flex flex-col gap-9">
          <div className="text-white text-[32px] leading-[38px] font-bold case-on">
            {title}
          </div>
          <div className="w-full">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Section;
