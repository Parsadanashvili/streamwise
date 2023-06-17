import React, { FC, ReactElement, cloneElement, isValidElement } from "react";

interface InputStackProps {
  children: ReactElement | ReactElement[];
}

const InputStack: FC<InputStackProps> = ({ children }) => {
  const resolvedChildren = isValidElement(children) ? [children] : children;

  return (
    <div className="flex flex-col items-center">
      {React.Children.map(resolvedChildren, (child, index) => {
        const count = React.Children.count(resolvedChildren);
        const isFirst = index === 0;
        const isLast = index === count - 1;
        const className = `
          ${count > 1 && isFirst ? "rounded-b-none" : ""}
          ${
            count > 1 && isLast
              ? "rounded-t-none border-t-0 focus:border-t"
              : ""
          }
          ${
            count > 1 && !isFirst && !isLast
              ? "rounded-none border-t-0 focus:border-y"
              : ""
          }
        `;
        return cloneElement(child, { className } as React.HTMLAttributes<any>);
      })}
    </div>
  );
};

export default InputStack;
