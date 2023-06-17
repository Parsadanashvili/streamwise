import { FC, ReactNode } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={`w-full mx-auto px-7`} {...props}>
      {children}
    </div>
  );
};

export default Container;
