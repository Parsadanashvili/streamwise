import useStyles from "@/hooks/useStyles";
import { FC, ReactNode } from "react";

const styles = {
  dividerWithChildren: {
    base: [
      "flex",
      "m-0",
      "shrink-0",
      "whitespace-nowrap",
      "border-none",
      "text-center",
      "after:relative",
      "after:w-full",
      "after:top-1/2",
      "after:translate-y-1/2",
      "after:border-t",
      "after:border-[rgba(255,255,255,0.1)]",
      "before:relative",
      "before:w-full",
      "before:top-1/2",
      "before:translate-y-1/2",
      "before:border-t",
      "before:border-[rgba(255,255,255,0.1)]",
    ],
  },

  divider: {
    base: [],

    orientation: {
      vertical: [
        "border-r",
        "border-[rgba(255,255,255,0.1)]",
        "h-auto",
        "shrink-0",
        "self-stretch",
      ],

      horizontal: [
        "border-b",
        "border-[rgba(255,255,255,0.1)]",
        "self-stretch",
      ],
    },
  },
};

interface DividerProps {
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
}

const Divider: FC<DividerProps> = ({
  orientation = "horizontal",
  children,
}) => {
  const {
    divider: dividerStyles,
    dividerWithChildren: dividerWithChildrenStyles,
  } = useStyles({
    props: {
      orientation,
    },
    styles,
  });

  if (children) {
    return (
      <div className={dividerWithChildrenStyles.join(" ")}>
        <span className="inline-block px-3 text-white-300 text-sm leading-[18px] font-normal uppercase select-none">
          {children}
        </span>
      </div>
    );
  }

  return <div className={dividerStyles.join(" ")} />;
};

export default Divider;
